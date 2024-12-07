import day01 from "./days/day01/index.ts";
import day02 from "./days/day02/index.ts";
import day03 from "./days/day03/index.ts";
import day04 from "./days/day04/index.ts";
import day05 from "./days/day05/index.ts";
import day06 from "./days/day06/index.ts";
import day07 from "./days/day07/index.ts";

if (import.meta.main) {
	const days_numbers: Record<string, (inputPath: string) => void> = {
		"01": day01,
		"02": day02,
		"03": day03,
		"04": day04,
		"05": day05,
		"06": day06,
		"07": day07,
	};

	if (Deno.args.length === 0) {
		console.info("Running all days");
		for (const day in days_numbers) {
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
