const WIDTH = 70;
const HEIGHT = 70;
const BYTES = 1024;

function part2(input: string): string {
	const walls = new Set<string>();
	const start: [number, number] = [0, 0];
	const end: [number, number] = [WIDTH, HEIGHT];
	const lines = input.split("\n");

	let b = 0;
	for (const line of lines) {
		if (b >= BYTES) {
			break;
		}
		walls.add(line);
		b++;
	}
	b--;

	let bestEndTile: [number, number, number, string[]] | undefined;
	while (b < lines.length) {
		const tilesScores: { [key: string]: number } = { "0,0": 0 };
		const tiles: [number, number, number, string[]][] = [[...start, 0, []]];
		let tile: [number, number, number, string[]] | undefined;
		while (tiles.length > 0) {
			tile = tiles.shift();
			if (!tile) {
				break;
			}
			if (tile[0] === end[0] && tile[1] === end[1]) {
				if (!bestEndTile) {
					bestEndTile = tile;
				} else if (bestEndTile[2] > tile[2]) {
					bestEndTile = tile;
				}
			}
			for (const dir of [-1, 1]) {
				if (
					tile[0] + dir >= 0 &&
					tile[0] + dir <= WIDTH &&
					!walls.has(`${tile[0] + dir},${tile[1]}`) &&
					!tile[3].includes(`${tile[0] + dir},${tile[1]}`) &&
					(!tilesScores[`${tile[0] + dir},${tile[1]}`] ||
						tilesScores[`${tile[0] + dir},${tile[1]}`] > tile[2] + 1)
				) {
					tilesScores[`${tile[0] + dir},${tile[1]}`] = tile[2] + 1;
					tiles.push([
						tile[0] + dir,
						tile[1],
						tile[2] + 1,
						[...tile[3], `${tile[0]},${tile[1]}`],
					]);
				}
				if (
					tile[1] + dir >= 0 &&
					tile[1] + dir <= HEIGHT &&
					!walls.has(`${tile[0]},${tile[1] + dir}`) &&
					!tile[3].includes(`${tile[0]},${tile[1] + dir}`) &&
					(!tilesScores[`${tile[0]},${tile[1] + dir}`] ||
						tilesScores[`${tile[0]},${tile[1] + dir}`] > tile[2] + 1)
				) {
					tilesScores[`${tile[0]},${tile[1] + dir}`] = tile[2] + 1;
					tiles.push([
						tile[0],
						tile[1] + dir,
						tile[2] + 1,
						[...tile[3], `${tile[0]},${tile[1]}`],
					]);
				}
			}
		}
		if (!tilesScores[`${end[0]},${end[1]}`]) {
			break;
		}

		if (!bestEndTile?.[3].includes(lines[b])) {
			while (!bestEndTile?.[3].includes(lines[b])) {
				b++;
				walls.add(lines[b]);
			}
		} else {
			b++;
			walls.add(lines[b]);
		}
	}
	return lines[b];
}

function part1(input: string): number {
	const walls = new Set<string>();
	const start: [number, number] = [0, 0];
	const end: [number, number] = [WIDTH, HEIGHT];

	let b = 0;
	for (const line of input.split("\n")) {
		if (b >= BYTES) {
			break;
		}
		walls.add(line);
		b++;
	}

	const tilesScores: { [key: string]: number } = { "0,0": 0 };
	const tiles: [number, number, number, string[]][] = [[...start, 0, []]];
	let tile: [number, number, number, string[]] | undefined;
	while (tiles.length > 0) {
		tile = tiles.shift();
		if (!tile) {
			break;
		}
		for (const dir of [-1, 1]) {
			if (
				tile[0] + dir >= 0 &&
				tile[0] + dir <= WIDTH &&
				!walls.has(`${tile[0] + dir},${tile[1]}`) &&
				!tile[3].includes(`${tile[0] + dir},${tile[1]}`) &&
				(!tilesScores[`${tile[0] + dir},${tile[1]}`] ||
					tilesScores[`${tile[0] + dir},${tile[1]}`] > tile[2] + 1)
			) {
				tilesScores[`${tile[0] + dir},${tile[1]}`] = tile[2] + 1;
				tiles.push([
					tile[0] + dir,
					tile[1],
					tile[2] + 1,
					[...tile[3], `${tile[0]},${tile[1]}`],
				]);
			}
			if (
				tile[1] + dir >= 0 &&
				tile[1] + dir <= HEIGHT &&
				!walls.has(`${tile[0]},${tile[1] + dir}`) &&
				!tile[3].includes(`${tile[0]},${tile[1] + dir}`) &&
				(!tilesScores[`${tile[0]},${tile[1] + dir}`] ||
					tilesScores[`${tile[0]},${tile[1] + dir}`] > tile[2] + 1)
			) {
				tilesScores[`${tile[0]},${tile[1] + dir}`] = tile[2] + 1;
				tiles.push([
					tile[0],
					tile[1] + dir,
					tile[2] + 1,
					[...tile[3], `${tile[0]},${tile[1]}`],
				]);
			}
		}
	}
	// for (let y = 0; y <= HEIGHT; y++) {
	// 	let l = "";
	// 	for (let x = 0; x <= WIDTH; x++) {
	// 		if (walls.has(`${x},${y}`)) {
	// 			l += "#";
	// 		} else {
	// 			l += (tilesScores[`${x},${y}`] ?? 0) % 10;
	// 		}
	// 	}
	// 	console.log(l);
	// }

	return tilesScores[`${end[0]},${end[1]}`];
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
