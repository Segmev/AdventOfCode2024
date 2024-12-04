function part1(input: string): number {
	const list_one: number[] = [];
	const list_two: number[] = [];

	for (const line of input.split("\n")) {
		const nbs: string[] = line.split("   ");
		list_one.push(Number.parseInt(nbs[0]));
		list_two.push(Number.parseInt(nbs[1]));
	}
	const sorted_list_one = list_one.sort((a, b) => a - b);
	const sorted_list_two = list_two.sort((a, b) => a - b);

	let count = 0;
	for (let i = 0; i < sorted_list_one.length; i++) {
		count += Math.abs(
			Math.abs(sorted_list_one[i]) - Math.abs(sorted_list_two[i]),
		);
	}
	return count;
}

function part2(input: string): number {
	const list_one: number[] = [];
	const list_two: number[] = [];

	for (const line of input.split("\n")) {
		const nbs: string[] = line.split("   ");
		list_one.push(Number.parseInt(nbs[0]));
		list_two.push(Number.parseInt(nbs[1]));
	}

	let count = 0;
	for (const nb of list_one) {
		let occurrence = 0;
		for (const other_nb of list_two) {
			if (nb === other_nb) {
				occurrence++;
			}
		}
		count += nb * occurrence;
	}
	return count;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
