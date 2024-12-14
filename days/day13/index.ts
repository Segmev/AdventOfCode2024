function part1(input: string): number {
	const blocks = input.split("\n\n");
	const price_token_A = 3;
	const price_token_B = 1;

	let sum = 0;
	for (const block of blocks) {
		const lines = block.split("\n").map((line) => line.split(": ")[1]);
		const [destX, destY] = lines[2]
			.split(", ")
			.map((part) => Number.parseInt(part.split("=")[1]));

		const [ax, ay] = lines[0]
			.split(", ")
			.map((part) => Number.parseInt(part.split("+")[1]));

		const [bx, by] = lines[1]
			.split(", ")
			.map((part) => Number.parseInt(part.split("+")[1]));

		if ([ax, bx, ay, by].some((value) => value === 0)) {
			continue;
		}
		const countB = Math.floor((ay * destX - ax * destY) / (ay * bx - ax * by));
		const countA = Math.floor((destX - bx * countB) / ax);
		if (
			destX === ax * countA + bx * countB &&
			destY === ay * countA + by * countB
		) {
			sum += price_token_A * countA + price_token_B * countB;
		}
	}

	return sum;
}

function part2(input: string): number {
	const added = 10000000000000;
	const blocks = input.split("\n\n");
	const price_token_A = 3;
	const price_token_B = 1;

	let sum = 0;
	for (const block of blocks) {
		const lines = block.split("\n").map((line) => line.split(": ")[1]);
		const [destX, destY] = lines[2]
			.split(", ")
			.map((part) => added + Number.parseInt(part.split("=")[1]));

		const [ax, ay] = lines[0]
			.split(", ")
			.map((part) => Number.parseInt(part.split("+")[1]));

		const [bx, by] = lines[1]
			.split(", ")
			.map((part) => Number.parseInt(part.split("+")[1]));

		if ([ax, bx, ay, by].some((value) => value === 0)) {
			continue;
		}
		const countB = Math.floor((ay * destX - ax * destY) / (ay * bx - ax * by));
		const countA = Math.floor((destX - bx * countB) / ax);
		if (
			destX === ax * countA + bx * countB &&
			destY === ay * countA + by * countB
		) {
			sum += price_token_A * countA + price_token_B * countB;
		}
	}

	return sum;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
