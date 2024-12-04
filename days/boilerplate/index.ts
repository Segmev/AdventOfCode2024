function part1(input: string): number {
	return 0;
}

function part2(input: string): number {
	return 0;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
