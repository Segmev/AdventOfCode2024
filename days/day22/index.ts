const PRUNE_MOD: bigint = 16777216n;

function mix(secret: bigint, val: bigint): bigint {
	return secret ^ val;
}

function prune(val: bigint): bigint {
	return val % PRUNE_MOD;
}

function getNext(secret: bigint): bigint {
	let res: bigint = secret;
	res = prune(mix(res, res * 64n));
	res = prune(mix(res, res / 32n));
	res = prune(mix(res, res * 2048n));
	return res;
}

function part1(input: string): number {
	let sum = 0n;
	for (const nb of input.split("\n").map((l) => Number.parseInt(l))) {
		let secret: bigint = BigInt(nb);
		for (let c = 0; c < 2000; c++) {
			secret = getNext(secret);
		}
		sum += secret;
	}
	return Number(sum);
}

function part2(input: string): number {
	const allMonkeysSequences: { [key: string]: number } = {};
	for (const nb of input.split("\n").map((l) => Number.parseInt(l))) {
		const secretDiffs: number[] = [];
		let secret: bigint = BigInt(nb);
		let prevSecret: bigint;
		const sequences: { [key: string]: number } = {};
		for (let c = 0; c < 2000; c++) {
			prevSecret = secret;
			secret = getNext(secret);
			secretDiffs.push(Number((secret % 10n) - (prevSecret % 10n)));
			if (secretDiffs.length >= 5) {
				secretDiffs.shift();
			}
			if (secretDiffs.length === 4) {
				const sequenceStr = `${secretDiffs[0]},${secretDiffs[1]},${secretDiffs[2]},${secretDiffs[3]}`;
				if (!sequences[sequenceStr])
					sequences[sequenceStr] = Number(secret % 10n);
			}
		}
		for (const key of Object.keys(sequences)) {
			allMonkeysSequences[key] =
				(allMonkeysSequences[key] ?? 0) + sequences[key];
		}
	}
	let fkey = "";
	let res = 0;
	for (const [key, value] of Object.entries(allMonkeysSequences)) {
		if (res < value) {
			res = value;
			fkey = key;
		}
	}
	console.log(fkey, res);
	return res;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
