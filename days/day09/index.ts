type Chunk = {
	ids: number[];
	size: number;
	nextChunk: Chunk | undefined;
	previousChunk: Chunk | undefined;
};

function part1(input: string): number {
	let emptyChunk = false;
	let id = 0;

	const firstChunk: Chunk = {
		ids: [],
		size: 0,
		nextChunk: undefined,
		previousChunk: undefined,
	};

	let chunk = firstChunk;
	let lastChunk: Chunk | undefined = firstChunk;
	for (const idx in input.split("")) {
		const size = Number.parseInt(input[idx]);
		const nextChunk: Chunk = {
			ids: [],
			size: 0,
			nextChunk: undefined,
			previousChunk: chunk,
		};

		chunk.size = size;
		if (!emptyChunk) {
			for (let i = 0; i < size; i++) {
				chunk.ids.push(id);
			}
			id++;
		}

		if (Number.parseInt(idx) < input.length - 1) {
			chunk.nextChunk = nextChunk;
			lastChunk = nextChunk;
		}
		chunk = nextChunk;
		emptyChunk = !emptyChunk;
	}

	let firstEmptyChunk: Chunk | undefined = firstChunk;

	let end = false;
	while (lastChunk && firstEmptyChunk && !end) {
		while (firstEmptyChunk.ids.length < firstEmptyChunk.size) {
			while (lastChunk && lastChunk.ids.length === 0) {
				lastChunk = lastChunk.previousChunk;
			}
			if (firstEmptyChunk === lastChunk) {
				end = !end;
				break;
			}
			firstEmptyChunk.ids.push(lastChunk?.ids.pop() ?? -1);
		}

		firstEmptyChunk = firstEmptyChunk.nextChunk;
	}

	let sum = 0;
	let i = 0;
	chunk = firstChunk;
	while (true) {
		for (const nb of chunk.ids) {
			sum += nb * i;
			i += 1;
		}

		if (!chunk.nextChunk) {
			break;
		}
		chunk = chunk.nextChunk;
	}

	return sum;
}

function part2(input: string): number {
	let emptyChunk = false;
	let id = 0;

	const firstChunk: Chunk = {
		ids: [],
		size: 0,
		nextChunk: undefined,
		previousChunk: undefined,
	};

	let chunk = firstChunk;
	let lastChunk: Chunk | undefined = firstChunk;
	for (const idx in input.split("")) {
		const size = Number.parseInt(input[idx]);
		const nextChunk: Chunk = {
			ids: [],
			size: 0,
			nextChunk: undefined,
			previousChunk: chunk,
		};

		chunk.size = size;
		if (!emptyChunk) {
			for (let i = 0; i < size; i++) {
				chunk.ids.push(id);
			}
			id++;
		}

		if (Number.parseInt(idx) < input.length - 1) {
			chunk.nextChunk = nextChunk;
			lastChunk = nextChunk;
		}
		chunk = nextChunk;
		emptyChunk = !emptyChunk;
	}

	while (lastChunk) {
		let firstEmptyChunk: Chunk | undefined = firstChunk;

		while (
			firstEmptyChunk &&
			firstEmptyChunk.size - firstEmptyChunk.ids.length < lastChunk.ids.length
		) {
			firstEmptyChunk = firstEmptyChunk?.nextChunk;
			if (firstEmptyChunk === lastChunk) {
				break;
			}
		}
		if (firstEmptyChunk && firstEmptyChunk !== lastChunk) {
			while (lastChunk.ids.length > 0) {
				firstEmptyChunk.ids.push(lastChunk.ids.pop() ?? -1);
			}
		} else {
			lastChunk = lastChunk.previousChunk;
		}

		while (lastChunk && lastChunk.ids.length === 0) {
			lastChunk = lastChunk?.previousChunk;
		}
	}

	let sum = 0;
	let i = 0;
	chunk = firstChunk;
	while (true) {
		for (let iSize = 0; iSize < chunk.size; iSize++) {
			sum += (chunk.ids[iSize] ?? 0) * i;
			i += 1;
		}

		if (!chunk.nextChunk) {
			break;
		}
		chunk = chunk.nextChunk;
	}

	return sum;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
