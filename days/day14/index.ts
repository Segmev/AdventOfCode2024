const WIDTH = 101;
const HEIGHT = 103;

type Robot = { position: [number, number]; velocity: [number, number] };

function allParts(input: string) {
	const robots: Robot[] = [];

	for (const line of input.split("\n")) {
		const [position, velocity]: [number, number][] = line
			.split(" ")
			.map((part) => {
				const nbs = part.split("=")[1].split(",");
				return [Number.parseInt(nbs[0]), Number.parseInt(nbs[1])];
			});

		robots.push({ position, velocity });
	}

	let t = 0;
	for (t = 0; t < 100; t++) {
		moveRobots(robots);
	}

	console.log(surfaceArea(robots)[0]);
	while (!surfaceArea(robots)[1]) {
		moveRobots(robots);
		t++;
	}
	console.log(t);
}

function moveRobots(robots: Robot[]) {
	for (const i in robots) {
		robots[i].position[0] =
			(robots[i].position[0] + WIDTH + robots[i].velocity[0]) % WIDTH;
		robots[i].position[1] =
			(robots[i].position[1] + HEIGHT + robots[i].velocity[1]) % HEIGHT;
	}
}

function surfaceArea(robots: Robot[]): [number, boolean] {
	const robotPosition: Set<string> = new Set();

	let duplicates = false;
	for (const robot of robots) {
		if (robotPosition.has(`${robot.position[0]},${robot.position[1]}`)) {
			duplicates = true;
		}
		robotPosition.add(`${robot.position[0]},${robot.position[1]}`);
	}

	const quarts = [
		{
			count: 0,
			xBounds: [0, -1 + (WIDTH - 1) / 2],
			yBounds: [0, -1 + (HEIGHT - 1) / 2],
		},
		{
			count: 0,
			xBounds: [(WIDTH + 1) / 2, WIDTH - 1],
			yBounds: [0, -1 + (HEIGHT - 1) / 2],
		},
		{
			count: 0,
			xBounds: [0, -1 + (WIDTH - 1) / 2],
			yBounds: [(HEIGHT + 1) / 2, HEIGHT - 1],
		},
		{
			count: 0,
			xBounds: [(WIDTH + 1) / 2, WIDTH - 1],
			yBounds: [(HEIGHT + 1) / 2, HEIGHT - 1],
		},
	];

	for (const robot of robots) {
		const [x, y] = robot.position;
		for (const i in quarts) {
			if (
				x >= quarts[i].xBounds[0] &&
				x <= quarts[i].xBounds[1] &&
				y >= quarts[i].yBounds[0] &&
				y <= quarts[i].yBounds[1]
			) {
				quarts[i].count += 1;
			}
		}
	}

	return [quarts.reduce((acc, quart) => acc * quart.count, 1), !duplicates];
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	allParts(input);
}

export default day;
