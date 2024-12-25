function part1(input: string): number {
	const keylocks = input.split("\n\n");
	console.log(keylocks);
	const lockLevels: [number, number, number, number, number][] = [];
	const keysLevels: [number, number, number, number, number][] = [];
	for (const keylock of keylocks) {
		let pins = keylock.split("\n");
		let key = true;
		if (pins[0] === ".....") {
			pins = pins.reverse();
			key = false;
		}
		const keylockLevel: [number, number, number, number, number] = [
			0, 0, 0, 0, 0,
		];
		for (let x = 0; x < pins[0].length; x++) {
			for (let y = 0; y < pins.length; y++) {
				if (pins[y].charAt(x) === ".") {
					keylockLevel[x] = y - 1;
					break;
				}
			}
		}
		if (key) keysLevels.push(keylockLevel);
		else lockLevels.push(keylockLevel);
	}

	let count = 0;
	for (let levelA = 0; levelA < keysLevels.length; levelA++) {
		for (let levelB = 0; levelB < lockLevels.length; levelB++) {
			count += 1;
			for (let x = 0; x < keysLevels[levelA].length; x++) {
				if (keysLevels[levelA][x] + lockLevels[levelB][x] > 5) {
					count -= 1;
					break;
				}
			}
		}
	}

	return count;
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
