const moveVec: { [key: string]: [number, number] } = {
	">": [1, 0],
	"<": [-1, 0],
	v: [0, 1],
	"^": [0, -1],
};

function nextState2(
	walls: Set<string>,
	boxes: Set<string>,
	robot: [number, number],
	action: string,
	linkedBoxes: { [key: string]: [number, number] } = {},
): [Set<string>, [number, number], { [key: string]: [number, number] }] {
	const nextBoxes: Set<string> = new Set();
	const nextRobot: [number, number] = [
		robot[0] + moveVec[action][0],
		robot[1] + moveVec[action][1],
	];
	// console.log({ robot, nextRobot });

	const nextLinkedBoxes: { [key: string]: [number, number] } = {};

	const movingBoxes: [number, number][] = [[nextRobot[0], nextRobot[1]]];
	const movedBoxes = new Set<string>();

	let movingBox = movingBoxes.pop();
	while (movingBox) {
		const pos = `${movingBox[0]},${movingBox[1]}`;
		if (walls.has(pos)) {
			return [boxes, robot, linkedBoxes];
		}
		if (boxes.has(pos)) {
			if (movedBoxes.has(pos)) {
				movingBox = movingBoxes.pop();
				if (!movingBox) break;
				continue;
			}

			movedBoxes.add(pos);
			movedBoxes.add(`${linkedBoxes[pos][0]},${linkedBoxes[pos][1]}`);

			nextBoxes.add(
				`${movingBox[0] + moveVec[action][0]},${movingBox[1] + moveVec[action][1]}`,
			);
			nextBoxes.add(
				`${linkedBoxes[pos][0] + moveVec[action][0]},${linkedBoxes[pos][1] + moveVec[action][1]}`,
			);

			movingBoxes.push([
				movingBox[0] + moveVec[action][0],
				movingBox[1] + moveVec[action][1],
			]);
			movingBoxes.push([
				linkedBoxes[pos][0] + moveVec[action][0],
				linkedBoxes[pos][1] + moveVec[action][1],
			]);

			nextLinkedBoxes[
				`${movingBox[0] + moveVec[action][0]},${movingBox[1] + moveVec[action][1]}`
			] = [
				linkedBoxes[pos][0] + moveVec[action][0],
				linkedBoxes[pos][1] + moveVec[action][1],
			];
			nextLinkedBoxes[
				`${linkedBoxes[pos][0] + moveVec[action][0]},${linkedBoxes[pos][1] + moveVec[action][1]}`
			] = [
				movingBox[0] + moveVec[action][0],
				movingBox[1] + moveVec[action][1],
			];
		}
		movingBox = movingBoxes.pop();
		// console.log({ movingBoxes, nextBoxes, nextLinkedBoxes, movingBox });
	}

	for (const pos of boxes) {
		if (!movedBoxes.has(pos)) {
			nextBoxes.add(pos);
			nextLinkedBoxes[pos] = linkedBoxes[pos];
		}
	}
	// console.log({ nextBoxes, nextLinkedBoxes });

	return [nextBoxes, nextRobot, nextLinkedBoxes];
}

function nextState(
	walls: Set<string>,
	boxes: Set<string>,
	robot: [number, number],
	action: string,
): [Set<string>, [number, number]] {
	const nextBoxes: Set<string> = new Set();
	const nextRobot: [number, number] = [
		robot[0] + moveVec[action][0],
		robot[1] + moveVec[action][1],
	];

	let x = nextRobot[0];
	let y = nextRobot[1];
	while (boxes.has(`${x},${y}`)) {
		x += moveVec[action][0];
		y += moveVec[action][1];
		nextBoxes.add(`${x},${y}`);
	}
	if (walls.has(`${x},${y}`)) {
		return [boxes, robot];
	}
	for (const pos of boxes) {
		if (`${nextRobot[0]},${nextRobot[1]}` !== pos) {
			nextBoxes.add(pos);
		}
	}

	return [nextBoxes, nextRobot];
}

function part1(input: string): number {
	const [map, movesLines] = input.split("\n\n");
	const moves = movesLines.replaceAll("\n", "");

	const walls: Set<string> = new Set();
	let boxes: Set<string> = new Set();
	let robot: [number, number] = [-1, -1];

	const lines = map.split("\n");
	const width = lines.length;
	const height = lines[0].length;
	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			const c = lines[y].charAt(x);
			if (c === "#") {
				walls.add(`${x},${y}`);
			} else if (c === "O") {
				boxes.add(`${x},${y}`);
			} else if (c === "@") {
				robot = [x, Number.parseInt(y)];
			}
		}
	}

	// displayMap(walls, boxes, robot, width, height);
	for (const move of moves) {
		// console.log(move);
		[boxes, robot] = nextState(walls, boxes, robot, move);
		// displayMap(walls, boxes, robot, width, height);
	}
	return boxes.entries().reduce((acc, box) => {
		const [x, y] = box[0].split(",").map((p) => Number.parseInt(p));
		return acc + 100 * y + x;
	}, 0);
}

function displayMap(
	walls: Set<string>,
	boxes: Set<string>,
	robot: [number, number],
	width: number,
	height: number,
) {
	let grid = " ";
	for (let x = 0; x < width; x++) {
		grid += `${x % 10}`;
	}
	console.log(grid);
	for (let y = 0; y < height; y++) {
		let line = `${y % 10}`;
		for (let x = 0; x < width; x++) {
			const pos = `${x},${y}`;
			if (walls.has(pos)) {
				line += "#";
			} else if (boxes.has(pos)) {
				line += "O";
			} else if (x === robot[0] && y === robot[1]) {
				line += "@";
			} else {
				line += ".";
			}
		}
		console.log(line);
	}
}

function part2(input: string): number {
	const [map, movesLines] = input.split("\n\n");
	const moves = movesLines.replaceAll("\n", "");

	const walls: Set<string> = new Set();
	let boxes: Set<string> = new Set();
	let linkedBoxes: { [key: string]: [number, number] } = {};
	let robot: [number, number] = [-1, -1];

	const lines = map.split("\n");
	const width = lines.length;
	const height = lines[0].length;
	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			const c = lines[y].charAt(x);
			if (c === "#") {
				walls.add(`${x * 2},${y}`);
				walls.add(`${1 + x * 2},${y}`);
			} else if (c === "O") {
				boxes.add(`${x * 2},${y}`);
				boxes.add(`${1 + x * 2},${y}`);
				linkedBoxes[`${x * 2},${y}`] = [1 + x * 2, Number.parseInt(y)];
				linkedBoxes[`${1 + x * 2},${y}`] = [x * 2, Number.parseInt(y)];
			} else if (c === "@") {
				robot = [x * 2, Number.parseInt(y)];
			}
		}
	}

	// displayMap(walls, boxes, robot, width * 2, height);
	for (const move of moves) {
		// console.log(move);
		[boxes, robot, linkedBoxes] = nextState2(
			walls,
			boxes,
			robot,
			move,
			linkedBoxes,
		);

		// displayMap(walls, boxes, robot, width * 2, height);
	}
	return boxes.entries().reduce((acc, box) => {
		const [x, y] = box[0].split(",").map((p) => Number.parseInt(p));
		if (x > linkedBoxes[box[0]][0]) {
			return acc;
		}

		// console.log({ x, y });
		return acc + 100 * y + x;
	}, 0);
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
