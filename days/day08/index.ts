function part1(input: string): number {
	const ants: { [key: string]: [number, number][] } = {};
	const lines = input.split("\n");
	const width = lines[0].length;
	const height = lines.length;

	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			const c = lines[y].charAt(x);
			if (c !== ".") {
				ants[c] = [...(ants[c] ?? []), [x, Number.parseInt(y)]];
			}
		}
	}

	const antiAnts: { [key: string]: boolean } = {};
	for (const antennas of Object.values(ants)) {
		for (const antIdx in antennas) {
			for (let i = 0; i < antennas.length; i++) {
				if (Number.parseInt(antIdx) === i) continue;
				const antiAntX =
					antennas[i][0] +
					Math.abs(antennas[antIdx][0] - antennas[i][0]) *
						(antennas[i][0] > antennas[antIdx][0] ? 1 : -1);
				const antiAntY =
					antennas[i][1] +
					Math.abs(antennas[antIdx][1] - antennas[i][1]) *
						(antennas[i][1] > antennas[antIdx][1] ? 1 : -1);

				if (
					antiAntX >= 0 &&
					antiAntX < width &&
					antiAntY >= 0 &&
					antiAntY < height
				) {
					antiAnts[`${antiAntX},${antiAntY}`] = true;
				}
			}
		}
	}
	return Object.keys(antiAnts).length;
}

function part2(input: string): number {
	const ants: { [key: string]: [number, number][] } = {};
	const lines = input.split("\n");
	const width = lines[0].length;
	const height = lines.length;

	for (const y in lines) {
		for (let x = 0; x < lines[y].length; x++) {
			const c = lines[y].charAt(x);
			if (c !== ".") {
				ants[c] = [...(ants[c] ?? []), [x, Number.parseInt(y)]];
			}
		}
	}

	const antiAnts: { [key: string]: boolean } = {};
	for (const antennas of Object.values(ants)) {
		for (const antIdx in antennas) {
			for (let i = 0; i < antennas.length; i++) {
				if (Number.parseInt(antIdx) === i) continue;
				const distX = Math.abs(antennas[antIdx][0] - antennas[i][0]);
				const distY = Math.abs(antennas[antIdx][1] - antennas[i][1]);

				let antiAntX = antennas[antIdx][0];
				let antiAntY = antennas[antIdx][1];

				while (
					antiAntX >= 0 &&
					antiAntX < width &&
					antiAntY >= 0 &&
					antiAntY < height
				) {
					antiAnts[`${antiAntX},${antiAntY}`] = true;
					antiAntX += distX * (antennas[i][0] >= antennas[antIdx][0] ? 1 : -1);
					antiAntY += distY * (antennas[i][1] >= antennas[antIdx][1] ? 1 : -1);
				}
			}
		}
	}
	return Object.keys(antiAnts).length;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
