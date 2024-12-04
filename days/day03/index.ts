function part1(input: string): number {
	let sum = 0;
	const instructions = input.split("mul(");
	for (const instr of instructions) {
		try {
			const nbs = instr.split(")")[0].split(",");
			if (
				!nbs[0].split("").every((c) => c >= "0" && c <= "9") ||
				!nbs[1].split("").every((c) => c >= "0" && c <= "9")
			) {
				continue;
			}

			sum += nbs.map((nb) => Number.parseInt(nb)).reduce((a, b) => a * b);
		} catch (e) {}
	}
	return sum;
}

function part2(input: string): number {
	let sum = 0;
	const appliedInstructions = input.split("don't()").map((instr, index) => {
		if (index === 0) {
			return instr;
		}
		const [_disabled, ...enabled] = instr.split("do()");
		return enabled.join();
	});
	for (const appliedInstruction of appliedInstructions) {
		const instructions = appliedInstruction.split("mul(");
		for (const instr of instructions) {
			try {
				const nbs = instr.split(")")[0].split(",");
				if (
					!nbs[0].split("").every((c) => c >= "0" && c <= "9") ||
					!nbs[1].split("").every((c) => c >= "0" && c <= "9")
				) {
					continue;
				}

				sum += nbs.map((nb) => Number.parseInt(nb)).reduce((a, b) => a * b);
			} catch (e) {}
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
