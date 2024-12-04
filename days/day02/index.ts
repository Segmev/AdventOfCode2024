function sequence_safe(nbs: number[]): {
	safe: number;
	unsafe_at: [number, number, number];
} {
	let safe = 1;
	let unsafe_at: [number, number, number] = [-1, -1, -1];
	if (nbs[0] < nbs[1]) {
		for (let i = 0; i < nbs.length - 1; i++) {
			if (nbs[i + 1] - nbs[i] > 3 || nbs[i + 1] - nbs[i] <= 0) {
				safe = 0;
				unsafe_at = [i - 1, i, i + 1];
				break;
			}
		}
	} else {
		for (let i = 0; i < nbs.length - 1; i++) {
			if (nbs[i] - nbs[i + 1] > 3 || nbs[i] - nbs[i + 1] <= 0) {
				safe = 0;
				unsafe_at = [i - 1, i, i + 1];
				break;
			}
		}
	}
	return { safe, unsafe_at };
}

function part1(input: string): number {
	let count = 0;

	for (const line of input.split("\n")) {
		const nbs: number[] = line.split(" ").map((nb) => Number.parseInt(nb));
		count += sequence_safe(nbs).safe;
	}

	return count;
}

function part2(input: string): number {
	let count = 0;

	for (const line of input.split("\n")) {
		const nbs: number[] = line.split(" ").map((nb) => Number.parseInt(nb));

		const res = sequence_safe(nbs);
		if (res.safe === 0) {
			if (
				sequence_safe(nbs.filter((_, i) => i !== res.unsafe_at[0])).safe ||
				sequence_safe(nbs.filter((_, i) => i !== res.unsafe_at[1])).safe ||
				sequence_safe(nbs.filter((_, i) => i !== res.unsafe_at[2])).safe
			) {
				count += 1;
			}
		} else {
			count += 1;
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
