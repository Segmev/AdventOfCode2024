type Node = {
	linked: string[];
};

type Meshes = {
	[key: string]: Node;
};

function part1(input: string): number {
	const meshes: Meshes = {};
	for (const line of input.split("\n")) {
		const [id1, id2] = line.split("-");
		if (!(id1 in meshes)) meshes[id1] = { linked: [] };
		if (!(id2 in meshes)) meshes[id2] = { linked: [] };

		meshes[id1].linked.push(id2);
		meshes[id2].linked.push(id1);
	}

	const triplet = new Set<string>();

	for (const nodeId1 in meshes) {
		for (let i1 = 0; i1 < meshes[nodeId1].linked.length; i1++) {
			const linkedNodeId1 = meshes[nodeId1].linked[i1];
			for (let i2 = i1 + 1; i2 < meshes[nodeId1].linked.length; i2++) {
				const linkedNodeId2 = meshes[nodeId1].linked[i2];
				// console.log(nodeId1, linkedNodeId1, linkedNodeId2);
				if (
					meshes[linkedNodeId2].linked.includes(linkedNodeId1) &&
					meshes[linkedNodeId1].linked.includes(linkedNodeId2)
				) {
					triplet.add([nodeId1, linkedNodeId1, linkedNodeId2].sort().join(","));
				}
			}
		}
	}
	const count = triplet
		.entries()
		.filter((e) => e[0].split(",").some((s) => s.charAt(0) === "t"))
		.reduce((acc, _c) => acc + 1, 0);

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
