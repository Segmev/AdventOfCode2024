const OUTBOUND = 999999999;

function nextDirection(guardDir: [number, number]): [number, number] {
	// Up
	if (guardDir[0] === 0 && guardDir[1] === -1) return [1, 0];
	// Right
	if (guardDir[0] === 1 && guardDir[1] === 0) return [0, 1];
	// Down
	if (guardDir[0] === 0 && guardDir[1] === 1) return [-1, 0];
	// Left
	if (guardDir[0] === -1 && guardDir[1] === 0) return [0, -1];
	return [0, -1];
}

function closestWall(
	guard: [number, number],
	guardDir: [number, number],
	wallsXY: { [key: number]: number[] },
	wallsYX: { [key: number]: number[] },
): [number, number] {
	if (guardDir[0] !== 0) {
		let closestWallX = OUTBOUND;
		for (const wall of wallsYX[guard[1]] ?? []) {
			if (
				guard[0] < wall === guardDir[0] > 0 &&
				Math.abs(guard[0] - wall) < Math.abs(guard[0] - closestWallX)
			) {
				closestWallX = wall;
			}
		}
		return [closestWallX, guard[1]];
	}
	let closestWallY = OUTBOUND;
	for (const wall of wallsXY[guard[0]] ?? []) {
		if (
			guard[1] < wall === guardDir[1] > 0 &&
			Math.abs(guard[1] - wall) < Math.abs(guard[1] - closestWallY)
		) {
			closestWallY = wall;
		}
	}
	return [guard[0], closestWallY];
}

function setWalkedPath(
	walked: { [key: string]: boolean },
	guard: [number, number],
	guardDir: [number, number],
	width: number,
	height: number,
	wall: [number, number],
): { nextGuard: [number, number]; offbound: boolean } {
	if (guardDir[0] !== 0) {
		let x = guard[0];
		while (x >= 0 && x < width && x !== wall[0]) {
			walked[`${x},${guard[1]}`] = true;
			x += guardDir[0];
		}
		return {
			offbound: OUTBOUND === wall[0] || OUTBOUND === wall[1],
			nextGuard: [x + guardDir[0] * -1, guard[1]],
		};
	}
	let y = guard[1];
	while (y >= 0 && y < height && y !== wall[1]) {
		walked[`${guard[0]},${y}`] = true;
		y += guardDir[1];
	}
	return {
		offbound: OUTBOUND === wall[0] || OUTBOUND === wall[1],
		nextGuard: [guard[0], y + guardDir[1] * -1],
	};
}

function part1(input: string): number {
	let guard: [number, number] = [0, 0];
	const wallsXY: { [key: number]: number[] } = {};
	const wallsYX: { [key: number]: number[] } = {};
	const walked: { [key: string]: boolean } = {};

	let guardDir: [number, number] = [0, -1];
	const lines = input.split("\n");
	const height = lines.length;
	const width = lines[0].length;

	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			if (lines[y].charAt(x) === "^") {
				guard = [x, Number.parseInt(y)];
			} else if (lines[y].charAt(x) === "#") {
				if (x in wallsXY) {
					wallsXY[x].push(Number.parseInt(y));
				} else {
					wallsXY[x] = [Number.parseInt(y)];
				}
				if (y in wallsYX) {
					wallsYX[y].push(x);
				} else {
					wallsYX[y] = [x];
				}
			}
		}
	}
	while (true) {
		const wall = closestWall(guard, guardDir, wallsXY, wallsYX);
		const { offbound, nextGuard } = setWalkedPath(
			walked,
			guard,
			guardDir,
			width,
			height,
			wall,
		);
		if (offbound) {
			break;
		}
		guardDir = nextDirection(guardDir);
		guard = nextGuard;
	}
	return Object.keys(walked).length;
}

function deepCopyWalls(walls: { [key: number]: number[] }): {
	[key: number]: number[];
} {
	const copiedWalls: { [key: number]: number[] } = {};
	for (const key in walls) {
		copiedWalls[Number.parseInt(key)] = [...walls[Number.parseInt(key)]];
	}

	return copiedWalls;
}

function jumpToWall(
	guard: [number, number],
	guardDir: [number, number],
	wall: [number, number],
): { nextGuard: [number, number]; offbound: boolean } {
	if (guardDir[0] !== 0) {
		const x = wall[0] + guardDir[0] * -1;
		return {
			offbound: OUTBOUND === wall[0] || OUTBOUND === wall[1],
			nextGuard: [x, guard[1]],
		};
	}
	const y = wall[1] + guardDir[1] * -1;
	return {
		offbound: OUTBOUND === wall[0] || OUTBOUND === wall[1],
		nextGuard: [guard[0], y],
	};
}

function part2(input: string): number {
	let initialGuard: [number, number] = [0, 0];
	const wallsXY: { [key: number]: number[] } = {};
	const wallsYX: { [key: number]: number[] } = {};

	const lines = input.split("\n");
	const height = lines.length;
	const width = lines[0].length;

	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			if (lines[y].charAt(x) === "^") {
				initialGuard = [x, Number.parseInt(y)];
			} else if (lines[y].charAt(x) === "#") {
				if (x in wallsXY) {
					wallsXY[x].push(Number.parseInt(y));
				} else {
					wallsXY[x] = [Number.parseInt(y)];
				}
				if (y in wallsYX) {
					wallsYX[y].push(x);
				} else {
					wallsYX[y] = [x];
				}
			}
		}
	}
	let guardDir: [number, number] = [0, -1];
	let guard: [number, number] = [...initialGuard];
	const spawningPath: { [key: string]: boolean } = {};
	while (true) {
		const wall = closestWall(guard, guardDir, wallsXY, wallsYX);
		const { offbound, nextGuard } = setWalkedPath(
			spawningPath,
			guard,
			guardDir,
			width,
			height,
			wall,
		);
		if (offbound) {
			break;
		}
		guardDir = nextDirection(guardDir);
		guard = nextGuard;
	}

	let count = 0;
	for (let spawnedWallY = 0; spawnedWallY < height; spawnedWallY++) {
		for (let spawnedWallX = 0; spawnedWallX < width; spawnedWallX++) {
			if (!(`${spawnedWallX},${spawnedWallY}` in spawningPath)) {
				continue;
			}

			let guardDir: [number, number] = [0, -1];
			const turnPoints: { [key: string]: boolean } = {};
			let guard: [number, number] = [...initialGuard];

			const alteredWallXY = deepCopyWalls(wallsXY);
			alteredWallXY[spawnedWallX] = [
				...(alteredWallXY[spawnedWallX] ?? []),
				spawnedWallY,
			];

			const alteredWallYX = deepCopyWalls(wallsYX);
			alteredWallYX[spawnedWallY] = [
				...(alteredWallYX[spawnedWallY] ?? []),
				spawnedWallX,
			];

			while (true) {
				const wall = closestWall(guard, guardDir, alteredWallXY, alteredWallYX);
				const { offbound, nextGuard } = jumpToWall(guard, guardDir, wall);
				if (offbound) {
					break;
				}
				guardDir = nextDirection(guardDir);
				guard = nextGuard;
				if (
					`${guard[0]},${guard[1]},${guardDir[0]},${guardDir[1]}` in turnPoints
				) {
					count++;
					break;
				}
				turnPoints[`${guard[0]},${guard[1]},${guardDir[0]},${guardDir[1]}`] =
					true;
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
