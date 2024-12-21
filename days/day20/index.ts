function stringCoords(x: number, y: number): string {
	return `${x},${y}`;
}

function part1(input: string): number {
	const lines = input.split("\n");

	const height = lines.length;
	const width = lines[0].length;

	const walls: { [key: string]: [number, number] } = {};

	const start = [0, 0];
	const end = [0, 0];
	const tiles: {
		[key: string]: { value: number; next: string; coords: [number, number] };
	} = {};

	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			const c = lines[y].charAt(x);
			if (c === "#") {
				walls[stringCoords(x, y)] = [x, y];
			} else if (c === "S") {
				start[0] = x;
				start[1] = y;
				tiles[stringCoords(x, y)] = { value: 0, next: "", coords: [x, y] };
			} else if (c === "E") {
				end[0] = x;
				end[1] = y;
				tiles[stringCoords(x, y)] = {
					value: Number.POSITIVE_INFINITY,
					next: "",
					coords: [x, y],
				};
			} else {
				tiles[stringCoords(x, y)] = {
					value: Number.POSITIVE_INFINITY,
					next: "",
					coords: [x, y],
				};
			}
		}
	}

	let x = start[0];
	let y = start[1];

	while (!(x === end[0] && y === end[1])) {
		for (const dir of [-1, 1]) {
			if (
				tiles[stringCoords(x + dir, y)] &&
				tiles[stringCoords(x + dir, y)].value === Number.POSITIVE_INFINITY
			) {
				tiles[stringCoords(x + dir, y)].value =
					tiles[stringCoords(x, y)].value + 1;
				tiles[stringCoords(x, y)].next = stringCoords(x + dir, y);
				x = x + dir;
				break;
			}
		}
		for (const dir of [-1, 1]) {
			if (
				tiles[stringCoords(x, y + dir)] &&
				tiles[stringCoords(x, y + dir)].value === Number.POSITIVE_INFINITY
			) {
				tiles[stringCoords(x, y + dir)].value =
					tiles[stringCoords(x, y)].value + 1;
				tiles[stringCoords(x, y)].next = stringCoords(x, y + dir);
				y = y + dir;
				break;
			}
		}
	}

	const shorcuts: { [key: number]: number } = {};

	let tileId = stringCoords(start[0], start[1]);
	while (tileId !== stringCoords(end[0], end[1])) {
		const tile = tiles[tileId];
		const [x, y] = tile.coords;

		for (const dir of [-2, 2]) {
			const neighboor = tiles[stringCoords(x + dir, y)];
			if (neighboor && neighboor.value > tile.value) {
				shorcuts[neighboor.value - tile.value - 2] =
					(shorcuts[neighboor.value - tile.value - 2] ?? 0) + 1;
			}
		}
		for (const dir of [-2, 2]) {
			const neighboor = tiles[stringCoords(x, y + dir)];
			if (neighboor && neighboor.value > tile.value) {
				shorcuts[neighboor.value - tile.value - 2] =
					(shorcuts[neighboor.value - tile.value - 2] ?? 0) + 1;
			}
		}

		tileId = tile.next;
	}

	return Object.entries(shorcuts).reduce(
		(acc, [key, value]) => (Number.parseInt(key) >= 100 ? acc + value : acc),
		0,
	);
}

function part2(input: string): number {
	const lines = input.split("\n");

	const height = lines.length;
	const width = lines[0].length;

	const walls: { [key: string]: [number, number] } = {};

	const start = [0, 0];
	const end = [0, 0];
	const tiles: {
		[key: string]: { value: number; next: string; coords: [number, number] };
	} = {};

	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			const c = lines[y].charAt(x);
			if (c === "#") {
				walls[stringCoords(x, y)] = [x, y];
			} else if (c === "S") {
				start[0] = x;
				start[1] = y;
				tiles[stringCoords(x, y)] = { value: 0, next: "", coords: [x, y] };
			} else if (c === "E") {
				end[0] = x;
				end[1] = y;
				tiles[stringCoords(x, y)] = {
					value: Number.POSITIVE_INFINITY,
					next: "",
					coords: [x, y],
				};
			} else {
				tiles[stringCoords(x, y)] = {
					value: Number.POSITIVE_INFINITY,
					next: "",
					coords: [x, y],
				};
			}
		}
	}

	let x = start[0];
	let y = start[1];

	while (!(x === end[0] && y === end[1])) {
		for (const dir of [-1, 1]) {
			if (
				tiles[stringCoords(x + dir, y)] &&
				tiles[stringCoords(x + dir, y)].value === Number.POSITIVE_INFINITY
			) {
				tiles[stringCoords(x + dir, y)].value =
					tiles[stringCoords(x, y)].value + 1;
				tiles[stringCoords(x, y)].next = stringCoords(x + dir, y);
				x = x + dir;
				break;
			}
		}
		for (const dir of [-1, 1]) {
			if (
				tiles[stringCoords(x, y + dir)] &&
				tiles[stringCoords(x, y + dir)].value === Number.POSITIVE_INFINITY
			) {
				tiles[stringCoords(x, y + dir)].value =
					tiles[stringCoords(x, y)].value + 1;
				tiles[stringCoords(x, y)].next = stringCoords(x, y + dir);
				y = y + dir;
				break;
			}
		}
	}

	const shorcuts: { [key: number]: number } = {};

	let tileId = stringCoords(start[0], start[1]);
	while (tileId !== stringCoords(end[0], end[1])) {
		const tile = tiles[tileId];
		const [x, y] = tile.coords;

		const MAX_STEP = 20;
		for (let dirX = -MAX_STEP; dirX <= MAX_STEP; dirX++) {
			for (let dirY = -MAX_STEP; dirY <= MAX_STEP; dirY++) {
				const neighboor = tiles[stringCoords(x + dirX, y + dirY)];
				if (
					Math.abs(dirX) + Math.abs(dirY) <= MAX_STEP &&
					neighboor &&
					neighboor.value > tile.value
				) {
					shorcuts[
						neighboor.value - tile.value - (Math.abs(dirX) + Math.abs(dirY))
					] =
						(shorcuts[
							neighboor.value - tile.value - (Math.abs(dirX) + Math.abs(dirY))
						] ?? 0) + 1;
				}
			}
		}

		tileId = tile.next;
	}

	return Object.entries(shorcuts).reduce(
		(acc, [key, value]) => (Number.parseInt(key) >= 100 ? acc + value : acc),
		0,
	);
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
