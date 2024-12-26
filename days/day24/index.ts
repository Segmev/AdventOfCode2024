function execWire(
	nodes: { [key: string]: number },
	label1: string,
	label2: string,
	labelDest: string,
	ope: string,
) {
	switch (ope) {
		case "AND":
			nodes[labelDest] = nodes[label1] & nodes[label2];
			break;
		case "OR":
			nodes[labelDest] = nodes[label1] | nodes[label2];
			break;
		case "XOR":
			nodes[labelDest] = nodes[label1] ^ nodes[label2];
			break;
	}
}

function part1(input: string): bigint {
	const nodes: { [key: string]: number } = {};
	const parts = input.split("\n\n");
	for (const line of parts[0].split("\n")) {
		const [label, value] = line.split(": ");
		nodes[label] = Number.parseInt(value);
	}

	const wires: {
		[key: string]: {
			label1: string;
			label2: string;
			ope: string;
		};
	} = {};
	const fillWires: string[] = [];

	for (const line of parts[1].split("\n")) {
		const [label1, ope, label2, _l, labelDest] = line.split(" ");

		wires[labelDest] = { label1, label2, ope };
		if (labelDest.charAt(0) === "z") fillWires.push(labelDest);
	}

	let destLabel = fillWires.pop();
	while (destLabel) {
		if (
			nodes[wires[destLabel].label1] === undefined ||
			nodes[wires[destLabel].label2] === undefined
		) {
			fillWires.push(destLabel);
			if (nodes[wires[destLabel].label1] === undefined) {
				fillWires.push(wires[destLabel].label1);
			}
			if (nodes[wires[destLabel].label2] === undefined) {
				fillWires.push(wires[destLabel].label2);
			}
		} else {
			execWire(
				nodes,
				wires[destLabel].label1,
				wires[destLabel].label2,
				destLabel,
				wires[destLabel].ope,
			);
		}

		destLabel = fillWires.pop();
	}

	let res: bigint = BigInt(0);
	let i = 0;
	while (nodes[`z${i.toString().padStart(2, "0")}`] !== undefined) {
		const key = `z${i.toString().padStart(2, "0")}`;
		const shift = key.split("z")[1];
		res = res | (BigInt(nodes[key]) << BigInt(Number.parseInt(shift)));
		i++;
	}

	return res;
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
