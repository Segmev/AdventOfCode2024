function part1(input: string): number {
	const map: { [key: string]: string } = {};
	const explored: Set<string> = new Set();
	const starts: [number, number][] = [];

	const lines = input.split("\n");
	for (let y = 0; y < lines.length; y++) {
		for (let x = 0; x < lines[0].length; x++) {
			map[`${x},${y}`] = lines[y].charAt(x);
			starts.push([x, y]);
		}
	}

	let sum = 0;
	const directions = [-1, 1];
	for (const start of starts) {
		const toExplore: [number, number][] = [];
		let position: [number, number] | undefined = start;
		const zone_letter = map[`${position[0]},${position[1]}`];
		const zone = { fences: 0, count: 0 };
		while (position) {
			const [x, y] = position;
			if (explored.has(`${x},${y}`)) {
				position = toExplore.pop();
				continue;
			}
			zone.count += 1;
			explored.add(`${x},${y}`);

			for (const dirX of directions) {
				if (map[`${x + dirX},${y}`] !== zone_letter) {
					zone.fences += 1;
				} else {
					toExplore.push([x + dirX, y]);
				}
			}
			for (const dirY of directions) {
				if (map[`${x},${y + dirY}`] !== zone_letter) {
					zone.fences += 1;
				} else {
					toExplore.push([x, y + dirY]);
				}
			}

			position = toExplore.pop();
		}
		sum += zone.fences * zone.count;
	}
	return sum;
}

function part2(input: string): number {
	const map: { [key: string]: { letter: string; zone_id: string } } = {};
	const explored: Set<string> = new Set();
	const starts: [number, number][] = [];

	const lines = input.split("\n");
	for (let y = 0; y < lines.length; y++) {
		for (let x = 0; x < lines[0].length; x++) {
			map[`${x},${y}`] = { letter: lines[y].charAt(x), zone_id: "-1" };
			starts.push([x, y]);
		}
	}

	const directions = [-1, 1];
	const zones: {
		[key: string]: { id: string; fences: number; count: number };
	} = {};
	for (const start_id in starts) {
		const toExplore: [number, number][] = [];
		let position: [number, number] | undefined = starts[start_id];
		const zone_tile = map[`${position[0]},${position[1]}`];
		const zone = {
			id: start_id,
			fences: 0,
			count: 0,
			letter: map[`${position[0]},${position[1]}`].letter,
		};
		while (position) {
			const [x, y] = position;
			if (explored.has(`${x},${y}`)) {
				position = toExplore.pop();
				continue;
			}
			zone.count += 1;
			zone_tile.zone_id = start_id;
			zones[start_id] = zone;
			explored.add(`${x},${y}`);

			for (const dirX of directions) {
				if (map[`${x + dirX},${y}`]?.letter === zone_tile.letter) {
					map[`${x + dirX},${y}`].zone_id = start_id;
					toExplore.push([x + dirX, y]);
				}
			}
			for (const dirY of directions) {
				if (map[`${x},${y + dirY}`]?.letter === zone_tile.letter) {
					map[`${x},${y + dirY}`].zone_id = start_id;
					toExplore.push([x, y + dirY]);
				}
			}
			position = toExplore.pop();
		}
	}

	for (let y = 0; y < lines.length; y++) {
		let prev_letter = "";
		let prev_down_letter = "";
		let prev_up_letter = "";
		for (let x = 0; x < lines[0].length; x++) {
			const position = `${x},${y}`;
			const upper_position = `${x},${y - 1}`;
			const lower_position = `${x},${y + 1}`;
			if (map[position].letter !== prev_letter) {
				if (map[upper_position]?.letter !== map[position].letter) {
					zones[map[position].zone_id].fences += 1;
				}
				if (map[lower_position]?.letter !== map[position].letter) {
					zones[map[position].zone_id].fences += 1;
				}
			} else {
				if (
					map[upper_position]?.letter !== map[position]?.letter &&
					prev_up_letter === map[position]?.letter
				) {
					zones[map[position].zone_id].fences += 1;
				}
				if (
					map[lower_position]?.letter !== map[position]?.letter &&
					prev_down_letter === map[position]?.letter
				) {
					zones[map[position].zone_id].fences += 1;
				}
			}

			prev_letter = map[position].letter;
			prev_up_letter = map[upper_position]?.letter;
			prev_down_letter = map[lower_position]?.letter;
		}
	}

	for (let x = 0; x < lines[0].length; x++) {
		let prev_letter = "";
		let prev_left_letter = "";
		let prev_right_letter = "";
		for (let y = 0; y < lines.length; y++) {
			const position = `${x},${y}`;
			const righter_position = `${x - 1},${y}`;
			const lefter_position = `${x + 1},${y}`;
			if (map[position].letter !== prev_letter) {
				if (map[righter_position]?.letter !== map[position].letter) {
					zones[map[position].zone_id].fences += 1;
				}
				if (map[lefter_position]?.letter !== map[position].letter) {
					zones[map[position].zone_id].fences += 1;
				}
			} else {
				if (
					map[righter_position]?.letter !== map[position]?.letter &&
					prev_right_letter === map[position]?.letter
				) {
					zones[map[position].zone_id].fences += 1;
				}
				if (
					map[lefter_position]?.letter !== map[position]?.letter &&
					prev_left_letter === map[position]?.letter
				) {
					zones[map[position].zone_id].fences += 1;
				}
			}

			prev_letter = map[position].letter;
			prev_right_letter = map[righter_position]?.letter;
			prev_left_letter = map[lefter_position]?.letter;
		}
	}

	return Object.values(zones).reduce(
		(acc, zone) => acc + zone.count * zone.fences,
		0,
	);
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
