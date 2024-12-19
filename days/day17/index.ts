let A = 0;
let B = 0;
let C = 0;
let pointer = 0;
let output = "";

function combo(op: number): number {
	if ([0, 1, 2, 3].includes(op)) {
		return op;
	}
	switch (op) {
		case 4:
			return A;
		case 5:
			return B;
		case 6:
			return C;
	}
	return 0;
}

function adv(op: number): boolean {
	A = Math.trunc(A / 2 ** combo(op));
	return false;
}

function bxl(op: number): boolean {
	B = B ^ op;
	return false;
}

function bst(op: number): boolean {
	B = combo(op) % 8;
	return false;
}

function jnz(op: number): boolean {
	if (A !== 0) {
		pointer = op;
		return true;
	}
	return false;
}

function bxc(op: number): boolean {
	B = B ^ C;
	return false;
}

function out(op: number): boolean {
	if (output.length > 0) {
		output += ",";
	}
	output += `${combo(op) % 8}`;
	return false;
}

function bdv(op: number): boolean {
	B = Math.floor(A / 2 ** combo(op));
	return false;
}

function cdv(op: number): boolean {
	C = Math.floor(A / 2 ** combo(op));
	return false;
}

const instrTable: { [key: number]: (op: number) => boolean } = {
	0: adv,
	1: bxl,
	2: bst,
	3: jnz,
	4: bxc,
	5: out,
	6: bdv,
	7: cdv,
};

function part1(input: string): string {
	const lines = input.split("\n");

	A = Number.parseInt(lines[0].split(": ")[1]);
	B = Number.parseInt(lines[1].split(": ")[1]);
	C = Number.parseInt(lines[2].split(": ")[1]);
	pointer = 0;
	output = "";
	const program = lines[4]
		.split(": ")[1]
		.split(",")
		.map((e) => Number.parseInt(e));

	while (pointer < program.length) {
		if (!instrTable[program[pointer]](program[pointer + 1])) {
			pointer += 2;
		}
	}

	return output;
}

function reset(a: number, b = 0, c = 0) {
	A = a;
	B = b;
	C = c;
	pointer = 0;
	output = "";
}

function part2(input: string): number {
	const lines = input.split("\n");

	const a = Number.parseInt(lines[0].split(": ")[1]);

	const program = lines[4]
		.split(": ")[1]
		.split(",")
		.map((e) => Number.parseInt(e));

	console.log(findRightA(program, program.length - 1, 0));

	return 0;
}

function findRightA(
	program: number[],
	programCursor: number,
	currentA: number,
): number | null {
	for (let i = 0; i < 8; i++) {
		reset((currentA << 3) + i);
		while (pointer < program.length) {
			if (!instrTable[program[pointer]](program[pointer + 1])) {
				pointer += 2;
			}
		}
		if (output === program.slice(programCursor).join(",")) {
			if (programCursor === 0) {
				return (currentA << 3) + i;
			}
			const res = findRightA(program, programCursor - 1, (currentA << 3) + i);
			if (res !== null) {
				return res;
			}
		}
	}
	return null;
}

function day(inputPath: string) {
	const input = Deno.readTextFileSync(inputPath);
	console.log(part1(input));
	console.log(part2(input));
}

export default day;
