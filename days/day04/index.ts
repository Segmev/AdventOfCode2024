function xmasSequence(
	start: [number, number],
	letters: { [key: string]: string },
	direction: [number, number],
): boolean {
	if (
		"M" === letters[`${start[0] + direction[0]},${start[1] + direction[1]}`] &&
		"A" ===
			letters[
				`${start[0] + direction[0] * 2},${start[1] + direction[1] * 2}`
			] &&
		"S" ===
			letters[`${start[0] + direction[0] * 3},${start[1] + direction[1] * 3}`]
	) {
		return true;
	}

	return false;
}

function part1(input: string): number {
	let count = 0;
	const letters: { [key: string]: string } = {};
	const startPositions: [number, number][] = [];
	const lines = input.split("\n");
	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			letters[`${x},${y}`] = lines[x][y];
			if (lines[x][y] === "X") {
				startPositions.push([x, Number(y)]);
			}
		}
	}

	const directions: [number, number][] = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	];
	for (const startPosition of startPositions) {
		for (const direction of directions) {
			if (xmasSequence(startPosition, letters, direction)) {
				count++;
			}
		}
	}
	return count;
}

function masCrossSequence(
	start: [number, number],
	letters: { [key: string]: string },
	direction: [number, number],
): boolean {
	if (
		("M" === letters[`${start[0] + direction[0]},${start[1] + direction[1]}`] &&
			"S" ===
				letters[
					`${start[0] + direction[0] * -1},${start[1] + direction[1] * -1}`
				]) ||
		("S" === letters[`${start[0] + direction[0]},${start[1] + direction[1]}`] &&
			"M" ===
				letters[
					`${start[0] + direction[0] * -1},${start[1] + direction[1] * -1}`
				])
	) {
		return true;
	}
	return false;
}

function part2(input: string): number {
	let count = 0;

	const letters: { [key: string]: string } = {};
	const startPositions: [number, number][] = [];
	const lines = input.split("\n");

	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			letters[`${x},${y}`] = lines[x][y];
			if (lines[x][y] === "A") {
				startPositions.push([x, Number(y)]);
			}
		}
	}

	const directions: [number, number][] = [
		[1, 1],
		[-1, 1],
	];

	for (const startPosition of startPositions) {
		count++;
		for (const direction of directions) {
			if (!masCrossSequence(startPosition, letters, direction)) {
				count--;
				break;
			}
		}
	}
	return count;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
