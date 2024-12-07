function calculatePossibleOperation(
	res: number,
	acc: number,
	operators: number[],
	concat: boolean,
): boolean {
	if (acc > res) return false;
	if (operators.length === 0) {
		return res === acc;
	}
	const [operator, ...shiftedOperators] = operators;
	if (calculatePossibleOperation(res, acc + operator, shiftedOperators, concat))
		return true;
	if (calculatePossibleOperation(res, acc * operator, shiftedOperators, concat))
		return true;
	if (
		concat &&
		calculatePossibleOperation(
			res,
			Number.parseInt(`${acc}${operator}`),
			shiftedOperators,
			concat,
		)
	)
		return true;

	return false;
}

function part1(input: string): number {
	let sum = 0;

	for (const line of input.split("\n")) {
		const [resStr, operatorsStr] = line.split(": ");
		const res = Number.parseInt(resStr);
		const operators = operatorsStr.split(" ").map((nb) => Number.parseInt(nb));

		const [operator, ...shiftedOperators] = operators;
		if (calculatePossibleOperation(res, operator, shiftedOperators, false)) {
			sum += res;
		}
	}

	return sum;
}

function part2(input: string): number {
	let sum = 0;

	for (const line of input.split("\n")) {
		const [resStr, operatorsStr] = line.split(": ");
		const res = Number.parseInt(resStr);
		const operators = operatorsStr.split(" ").map((nb) => Number.parseInt(nb));

		const [operator, ...shiftedOperators] = operators;
		if (calculatePossibleOperation(res, operator, shiftedOperators, true)) {
			sum += res;
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
