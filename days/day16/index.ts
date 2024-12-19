function reinderTurnDirections(
	direction: [number, number],
): [[number, number], [number, number]] {
	return [
		[direction[1], direction[0]],
		[direction[1] * -1, direction[0] * -1],
	];
}

type Move = {
	pos: [number, number];
	score: number;
	direction: [number, number];
	path?: Set<string>;
};

function part1(input: string): number {
	const start: [number, number] = [-1, -1];
	const end: [number, number] = [-1, -1];
	const walls = new Set<string>();

	const lines = input.split("\n");
	for (let y = 0; y < lines.length; y++) {
		for (let x = 0; x < lines[0].length; x++) {
			switch (lines[y].charAt(x)) {
				case "S":
					start[0] = x;
					start[1] = y;
					break;
				case "E":
					end[0] = x;
					end[1] = y;
					break;
				case "#":
					walls.add(`${x},${y}`);
			}
		}
	}

	const positionScores: { [key: string]: number } = {};
	const moves: Move[] = [{ pos: start, score: 0, direction: [1, 0] }];
	let bestScore = Number.POSITIVE_INFINITY;
	let m = moves.pop();
	while (m) {
		if (m.pos[0] === end[0] && m.pos[1] === end[1]) {
			if (m.score < bestScore) {
				bestScore = m.score;
			}
		} else if (m.score < bestScore) {
			if (
				!walls.has(`${m.pos[0] + m.direction[0]},${m.pos[1] + m.direction[1]}`)
			) {
				if (
					!positionScores[
						`${m.pos[0] + m.direction[0]},${m.pos[1] + m.direction[1]}`
					] ||
					positionScores[
						`${m.pos[0] + m.direction[0]},${m.pos[1] + m.direction[1]}`
					] >=
						m.score + 1
				) {
					positionScores[
						`${m.pos[0] + m.direction[0]},${m.pos[1] + m.direction[1]}`
					] = m.score + 1;
					moves.push({
						pos: [m.pos[0] + m.direction[0], m.pos[1] + m.direction[1]],
						score: m.score + 1,
						direction: m.direction,
					});
				}
			}
			for (const newDirection of reinderTurnDirections(m.direction)) {
				if (
					!walls.has(
						`${m.pos[0] + newDirection[0]},${m.pos[1] + newDirection[1]}`,
					)
				) {
					if (
						!positionScores[
							`${m.pos[0] + newDirection[0]},${m.pos[1] + newDirection[1]}`
						] ||
						positionScores[
							`${m.pos[0] + newDirection[0]},${m.pos[1] + newDirection[1]}`
						] >=
							m.score + 1 + 1000
					) {
						positionScores[
							`${m.pos[0] + newDirection[0]},${m.pos[1] + newDirection[1]}`
						] = m.score + 1 + 1000;

						moves.unshift({
							pos: [m.pos[0] + newDirection[0], m.pos[1] + newDirection[1]],
							score: m.score + 1 + 1000,
							direction: newDirection,
						});
					}
				}
			}
		}
		m = moves.pop();
	}

	return bestScore;
}

type Node = {
	x: number;
	y: number;
	scores: { [key: string]: number };
	score: number;
	edges: { [key: string]: boolean };
};

const emptyPathChars = [".", "S", "E"];

function part2(input: string): number {
	const start: [number, number] = [-1, -1];
	const end: [number, number] = [-1, -1];
	const graph: { [key: string]: Node } = {};

	const lines = input.split("\n");
	for (let y = 1; y < lines.length - 1; y++) {
		let previousNode: string | undefined;
		for (let x = 1; x < lines[0].length - 1; x++) {
			switch (true) {
				case "#" === lines[y].charAt(x):
					previousNode = undefined;
					break;
				case "S" === lines[y].charAt(x):
					start[0] = x;
					start[1] = y;
					break;
				case "E" === lines[y].charAt(x):
					end[0] = x;
					end[1] = y;
					break;
			}
			const c = lines[y].charAt(x);
			if ([".", "S", "E"].includes(c) === true) {
				const pos = `${x},${y}`;
				let isNode = false;
				for (const [dirX, dirY] of [
					[1, 0],
					[-1, 0],
					[0, 1],
					[0, -1],
				]) {
					if (
						c === "E" ||
						c === "S" ||
						(emptyPathChars.includes(lines[y + dirY].charAt(x + dirX)) &&
							(emptyPathChars.includes(lines[y - dirX].charAt(x - dirY)) ||
								emptyPathChars.includes(lines[y + dirX].charAt(x + dirY))))
					) {
						isNode = true;

						const score = c === "S" ? 0 : Number.POSITIVE_INFINITY;
						graph[pos] = {
							x,
							y,
							scores: {
								"-1,0": score,
								"1,0": score,
								"0,-1": score,
								"0,1": score,
							},
							score,
							edges: previousNode ? { [previousNode]: true } : {},
						};
						if (previousNode) {
							graph[previousNode].edges[pos] = true;
						}
					}
				}
				if (isNode) previousNode = pos;
			}
		}
	}

	for (let x = 1; x < lines[0].length; x++) {
		let previousNode: string | undefined;
		for (let y = 1; y < lines.length; y++) {
			const c = lines[y].charAt(x);
			const pos = `${x},${y}`;
			if (c === "#") {
				previousNode = undefined;
			} else if (pos in graph) {
				if (previousNode) {
					graph[pos].edges[previousNode] = true;
					graph[previousNode].edges[pos] = true;
				}
				previousNode = pos;
			}
		}
	}

	const nodes: [
		{
			nodeId: string;
			dir: [number, number];
			prevPath: string[];
			score: number;
		},
	] = [
		{ nodeId: `${start[0]},${start[1]}`, dir: [1, 0], prevPath: [], score: 0 },
	];

	let bestScore = Number.POSITIVE_INFINITY;
	let endMoves: string[][] = [];
	const edgeScoreCache: { [key: string]: number } = {};

	while (nodes.length > 0) {
		const { nodeId, dir, prevPath, score } = nodes.pop();
		const node = graph[nodeId];
		if (node.x === end[0] && node.y === end[1]) {
			if (bestScore > score) {
				bestScore = score;
				endMoves = [[...prevPath, nodeId]];
			}
			if (bestScore === score) {
				endMoves.push([...prevPath, nodeId]);
			}
		}
		if (score > bestScore) {
			continue;
		}
		if (edgeScoreCache[`${nodeId},${dir[0]},${dir[1]}`] < score) {
			continue;
		}

		for (const edgeId in node.edges) {
			if (prevPath.includes(edgeId)) {
				continue;
			}
			let edgeScore =
				score +
				(Math.abs(node.x - graph[edgeId].x) +
					Math.abs(node.y - graph[edgeId].y));

			const actualDir: [number, number] = [dir[0], dir[1]];
			if (dir[0] !== 0 && graph[edgeId].x - node.x === 0) {
				edgeScore += 1000;
				actualDir[0] = 0;
				actualDir[1] = graph[edgeId].y - node.y > 0 ? 1 : -1;
			} else if (dir[1] !== 0 && graph[edgeId].y - node.y === 0) {
				edgeScore += 1000;
				actualDir[1] = 0;
				actualDir[0] = graph[edgeId].x - node.x > 0 ? 1 : -1;
			}

			if (
				!(`${nodeId},${actualDir[0]},${actualDir[1]}` in edgeScoreCache) ||
				edgeScoreCache[`${nodeId},${actualDir[0]},${actualDir[1]}`] > edgeScore
			) {
				edgeScoreCache[`${nodeId},${actualDir[0]},${actualDir[1]}`] = edgeScore;
			}

			nodes.push({
				nodeId: edgeId,
				dir: actualDir,
				prevPath: [...prevPath, nodeId],
				score: edgeScore,
			});
		}
	}

	const pathTiles = new Set<string>();

	for (const path of endMoves) {
		for (let i = 1; i < path.length; i++) {
			pathTiles.add(path[i - 1]);
			pathTiles.add(path[i]);

			const t1 = path[i - 1].split(",").map((nb) => Number.parseInt(nb));
			const t2 = path[i].split(",").map((nb) => Number.parseInt(nb));

			let x = t1[0];
			while (x !== t2[0]) {
				pathTiles.add(`${x},${t1[1]}`);
				x = x + (t1[0] < t2[0] ? 1 : -1);
			}
			let y = t1[1];
			while (y !== t2[1]) {
				pathTiles.add(`${t1[0]},${y}`);
				y = y + (t1[1] < t2[1] ? 1 : -1);
			}
		}
	}

	return pathTiles.size;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
