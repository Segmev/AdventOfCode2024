const cache = new Map<string, number>();

function validPattern(
	pattern: string,
	towels: Set<string>,
	minTowelLength: number,
	maxTowelLength: number,
): number {
	if (cache.has(pattern)) {
		return cache.get(pattern);
	}
	if (pattern === "") {
		return 1;
	}

	let res = 0;
	for (
		let i = minTowelLength;
		i <= (maxTowelLength < pattern.length ? maxTowelLength : pattern.length);
		i++
	) {
		if (towels.has(pattern.slice(0, i))) {
			res += validPattern(
				pattern.slice(i),
				towels,
				minTowelLength,
				maxTowelLength,
			);
		}
	}

	cache.set(pattern, res);
	return res;
}

function part1(input: string): number {
	const lines = input.split("\n");
	const towels = lines[0].split(", ");
	lines.shift();
	lines.shift();

	let minLen = Number.POSITIVE_INFINITY;
	let maxLen = 0;
	for (const towel of towels) {
		if (towel.length > maxLen) maxLen = towel.length;
		if (towel.length < minLen) minLen = towel.length;
	}

	let count = 0;
	for (const line of lines) {
		if (validPattern(line, new Set<string>(towels), minLen, maxLen)) {
			count++;
		}
	}

	return count;
}

function part2(input: string): number {
	const lines = input.split("\n");
	const towels = lines[0].split(", ");
	lines.shift();
	lines.shift();

	let minLen = Number.POSITIVE_INFINITY;
	let maxLen = 0;
	for (const towel of towels) {
		if (towel.length > maxLen) maxLen = towel.length;
		if (towel.length < minLen) minLen = towel.length;
	}

	let count = 0;
	for (const line of lines) {
		count += validPattern(line, new Set<string>(towels), minLen, maxLen);
	}

	return count;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
