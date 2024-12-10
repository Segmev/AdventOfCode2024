function trailScorePart1(
	map: { [key: string]: number },
	start: [number, number],
): number {
	const nextPositions: [number, number][] = [start];
	const trailDests: { [key: string]: boolean } = {};

	const directions = [-1, 1];
	let nextPosition = nextPositions.pop();
	while (nextPosition) {
		if (map[`${nextPosition[0]},${nextPosition[1]}`] === 0) {
			trailDests[`${nextPosition[0]},${nextPosition[1]}`] = true;
		} else {
			for (const direction of directions) {
				if (
					map[`${nextPosition[0] + direction},${nextPosition[1]}`] ===
					map[`${nextPosition[0]},${nextPosition[1]}`] - 1
				) {
					nextPositions.push([nextPosition[0] + direction, nextPosition[1]]);
				}
			}
			for (const direction of directions) {
				if (
					map[`${nextPosition[0]},${nextPosition[1] + direction}`] ===
					map[`${nextPosition[0]},${nextPosition[1]}`] - 1
				) {
					nextPositions.push([nextPosition[0], nextPosition[1] + direction]);
				}
			}
		}
		nextPosition = nextPositions.pop();
	}

	return Object.keys(trailDests).length;
}

function part1(input: string): number {
	const map: { [key: string]: number } = {};

	const lines = input.split("\n");

	const starts: [number, number][] = [];
	for (const y in lines) {
		for (const x in lines[y].split("")) {
			const level = Number.parseInt(lines[y].charAt(Number.parseInt(x)));
			map[`${x},${y}`] = level;
			if (level === 9) {
				starts.push([Number.parseInt(x), Number.parseInt(y)]);
			}
		}
	}
	let sum = 0;
	for (const start of starts) {
		sum += trailScorePart1(map, start);
	}

	return sum;
}

function trailScorePart2(
	map: { [key: string]: number },
	start: [number, number],
): number {
	const nextPositions: [number, number][] = [start];
	const trailDests: { [key: string]: number } = {};

	const directions = [-1, 1];
	let nextPosition = nextPositions.pop();
	while (nextPosition) {
		if (map[`${nextPosition[0]},${nextPosition[1]}`] === 0) {
			trailDests[`${nextPosition[0]},${nextPosition[1]}`] =
				(trailDests[`${nextPosition[0]},${nextPosition[1]}`] ?? 0) + 1;
		} else {
			for (const direction of directions) {
				if (
					map[`${nextPosition[0] + direction},${nextPosition[1]}`] ===
					map[`${nextPosition[0]},${nextPosition[1]}`] - 1
				) {
					nextPositions.push([nextPosition[0] + direction, nextPosition[1]]);
				}
			}
			for (const direction of directions) {
				if (
					map[`${nextPosition[0]},${nextPosition[1] + direction}`] ===
					map[`${nextPosition[0]},${nextPosition[1]}`] - 1
				) {
					nextPositions.push([nextPosition[0], nextPosition[1] + direction]);
				}
			}
		}
		nextPosition = nextPositions.pop();
	}

	return Object.values(trailDests).reduce((acc, nb) => acc + nb);
}

function part2(input: string): number {
	const map: { [key: string]: number } = {};

	const lines = input.split("\n");

	const starts: [number, number][] = [];
	for (const y in lines) {
		for (const x in lines[y].split("")) {
			const level = Number.parseInt(lines[y].charAt(Number.parseInt(x)));
			map[`${x},${y}`] = level;
			if (level === 9) {
				starts.push([Number.parseInt(x), Number.parseInt(y)]);
			}
		}
	}
	let sum = 0;
	for (const start of starts) {
		sum += trailScorePart2(map, start);
	}

	return sum;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
