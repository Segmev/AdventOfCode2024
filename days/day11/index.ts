type Stone = { value: number; blinks: number };

function blink(value: number): number[] {
	if (value === 0) {
		return [1];
	}
	const nb_str = `${value}`;
	if (nb_str.length % 2 === 0) {
		return [
			Number.parseInt(nb_str.slice(0, nb_str.length / 2)),
			Number.parseInt(nb_str.slice(nb_str.length / 2)),
		];
	}
	return [value * 2024];
}

function part1(input: string): number {
	const BLINKS_STOP = 25;

	const stones: Stone[] = input
		.split(" ")
		.map((nb) => ({ value: Number.parseInt(nb), blinks: 0 }));

	let count = 0;
	let stone = stones.pop();
	while (stone) {
		const blinked_stones = blink(stone.value).map((nb) => ({
			value: nb,
			blinks: (stone?.blinks ?? 0) + 1,
		}));
		for (const blinked_stone of blinked_stones) {
			if (blinked_stone.blinks === BLINKS_STOP) {
				count += 1;
			} else {
				stones.push(blinked_stone);
			}
		}
		stone = stones.pop();
	}

	return count;
}

function part2(input: string): number {
	const BLINKS_STOP = 75;
	let stones: { [key: number]: number } = {};

	for (const nb_str of input.split(" ")) {
		const nb = Number.parseInt(nb_str);
		stones[nb] = 1;
	}

	let blinks = 0;
	while (blinks < BLINKS_STOP) {
		const next_stones: { [key: number]: number } = {};

		for (const key of Object.keys(stones).map((k) => Number.parseInt(k))) {
			for (const blinked_stone of blink(key)) {
				next_stones[blinked_stone] =
					stones[key] + (next_stones[blinked_stone] ?? 0);
			}
		}
		blinks++;
		stones = next_stones;
	}

	return Object.values(stones).reduce((acc, stone_count) => acc + stone_count);
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
