import day01 from "./days/day01/index.ts";
import day02 from "./days/day02/index.ts";
import day03 from "./days/day03/index.ts";
import day04 from "./days/day04/index.ts";
import day05 from "./days/day05/index.ts";
import day06 from "./days/day06/index.ts";
import day07 from "./days/day07/index.ts";
import day08 from "./days/day08/index.ts";
import day09 from "./days/day09/index.ts";
import day10 from "./days/day10/index.ts";
import day11 from "./days/day11/index.ts";
import day12 from "./days/day12/index.ts";
import day13 from "./days/day13/index.ts";
import day14 from "./days/day14/index.ts";
import day15 from "./days/day15/index.ts";
import day16 from "./days/day16/index.ts";
import day17 from "./days/day17/index.ts";
import day18 from "./days/day18/index.ts";

if (import.meta.main) {
	const days_numbers: Record<string, (inputPath: string) => void> = {
		"01": day01,
		"02": day02,
		"03": day03,
		"04": day04,
		"05": day05,
		"06": day06,
		"07": day07,
		"08": day08,
		"09": day09,
		"10": day10,
		"11": day11,
		"12": day12,
		"13": day13,
		"14": day14,
		"15": day15,
		"16": day16,
		"17": day17,
		"18": day18,
	};

	const bad_solutions = ["16"];

	if (Deno.args.length === 0) {
		console.info("Running all days");
		for (const day of Object.keys(days_numbers)
			.sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
			.filter((e) => !bad_solutions.includes(e))) {
			console.info(`\nRunning day ${day}`);
			const startTime = performance.now();
			days_numbers[day](`inputs/${day}/input.txt`);

			if (Deno.env.get("TIMER") === "true") {
				console.info(`Day ${day} took ${performance.now() - startTime}ms`);
			}
		}
	} else {
		for (const day of Deno.args) {
			if (!days_numbers[day]) {
				console.error(`Day ${day} does not exist (yet?)`);
				continue;
			}
			console.info(`\nRunning day ${day}`);
			const startTime = performance.now();
			days_numbers[day](`inputs/${day}/input.txt`);

			if (Deno.env.get("TIMER") === "true") {
				console.info(`Day ${day} took ${performance.now() - startTime}ms`);
			}
		}
	}
}
