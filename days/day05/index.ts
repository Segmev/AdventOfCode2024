function invalidPosAt(
	rules: { [key: number]: number[] },
	orderNumbers: number[],
	idx: number,
): number {
	for (let i = idx; i >= 0; i--) {
		if ((rules[orderNumbers[idx]] ?? []).includes(orderNumbers[i])) {
			return i;
		}
	}
	return -1;
}

function part1(input: string): number {
	const [rulesInput, ordersInput] = input.split("\n\n");

	const rules: { [key: number]: number[] } = {};

	for (const rule of rulesInput.split("\n")) {
		const [first, second] = rule.split("|").map((nb) => Number.parseInt(nb));
		rules[first] = [...(rules[first] ?? []), second];
	}

	let sum = 0;

	for (const order of ordersInput.split("\n")) {
		let validity = true;
		const orderNumbers = order.split(",").map((nb) => Number.parseInt(nb));
		for (const idx in orderNumbers) {
			if (rules[orderNumbers[idx]]) {
				if (invalidPosAt(rules, orderNumbers, Number(idx)) >= 0) {
					validity = false;
					break;
				}
			}
		}
		if (validity) {
			sum += orderNumbers[Math.floor(orderNumbers.length / 2)];
		}
	}

	return sum;
}

function sortNumbers(
	rules: { [key: number]: number[] },
	numbers: number[],
): number[] {
	const orderedNumbers = [...numbers];

	for (let i = 0; i < orderedNumbers.length; ) {
		const invalidPos = invalidPosAt(rules, orderedNumbers, i);
		if (invalidPos >= 0) {
			orderedNumbers.splice(i, 0, orderedNumbers.splice(invalidPos, 1)[0]);
			i = 0;
		} else {
			i++;
		}
	}

	return orderedNumbers;
}

function part2(input: string): number {
	const [rulesInput, ordersInput] = input.split("\n\n");

	const rules: { [key: number]: number[] } = {};

	for (const rule of rulesInput.split("\n")) {
		const [first, second] = rule.split("|").map((nb) => Number.parseInt(nb));
		rules[first] = [...(rules[first] ?? []), second];
	}

	let sum = 0;

	for (const order of ordersInput.split("\n")) {
		let validity = true;
		const orderNumbers = order.split(",").map((nb) => Number.parseInt(nb));
		for (const idx in orderNumbers) {
			if (rules[orderNumbers[idx]]) {
				if (invalidPosAt(rules, orderNumbers, Number(idx)) >= 0) {
					validity = false;
					break;
				}
			}
		}
		if (!validity) {
			const sortedOrderNumbers = sortNumbers(rules, orderNumbers);
			sum += sortedOrderNumbers[Math.floor(orderNumbers.length / 2)];
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
