import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.MILLISECOND", () => {
  assertStrictEquals(Duration.MILLISECOND, 1);
});

Deno.test("Duration.SECOND", () => {
  assertStrictEquals(Duration.SECOND, 1000);
});

Deno.test("Duration.MINUTE", () => {
  assertStrictEquals(Duration.MINUTE, 60000);
});

Deno.test("Duration.HOUR", () => {
  assertStrictEquals(Duration.HOUR, 3600000);
});

Deno.test("Duration.DAY", () => {
  assertStrictEquals(Duration.DAY, 86400000);
});

Deno.test("Duration.millisecondsToSeconds(number)", () => {
  assertStrictEquals(Duration.millisecondsToSeconds(-1000), -1);
  assertStrictEquals(Duration.millisecondsToSeconds(-0), 0);
  assertStrictEquals(Duration.millisecondsToSeconds(0), 0);
  assertStrictEquals(Duration.millisecondsToSeconds(1000), 1);
  assertStrictEquals(Duration.millisecondsToSeconds(1500), 1.5);

  assertThrows(
    () => {
      Duration.millisecondsToSeconds(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.millisecondsToSeconds("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.secondsToMilliseconds(number)", () => {
  assertStrictEquals(Duration.secondsToMilliseconds(-1), -1000);
  assertStrictEquals(Duration.secondsToMilliseconds(-0), 0);
  assertStrictEquals(Duration.secondsToMilliseconds(0), 0);
  assertStrictEquals(Duration.secondsToMilliseconds(1), 1000);
  assertStrictEquals(Duration.secondsToMilliseconds(1.5), 1500);

  assertThrows(
    () => {
      Duration.secondsToMilliseconds(Number.NaN);
    },
    TypeError,
    "seconds",
  );
  assertThrows(
    () => {
      Duration.secondsToMilliseconds("1" as unknown as number);
    },
    TypeError,
    "seconds",
  );
});

Deno.test("Duration.millisecondsToMinutes(number)", () => {
  assertStrictEquals(Duration.millisecondsToMinutes(-60000), -1);
  assertStrictEquals(Duration.millisecondsToMinutes(-0), 0);
  assertStrictEquals(Duration.millisecondsToMinutes(0), 0);
  assertStrictEquals(Duration.millisecondsToMinutes(60000), 1);
  assertStrictEquals(Duration.millisecondsToMinutes(90000), 1.5);

  assertThrows(
    () => {
      Duration.millisecondsToMinutes(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.millisecondsToMinutes("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.minutesToMilliseconds(number)", () => {
  assertStrictEquals(Duration.minutesToMilliseconds(-1), -60000);
  assertStrictEquals(Duration.minutesToMilliseconds(-0), 0);
  assertStrictEquals(Duration.minutesToMilliseconds(0), 0);
  assertStrictEquals(Duration.minutesToMilliseconds(1), 60000);
  assertStrictEquals(Duration.minutesToMilliseconds(1.5), 90000);

  assertThrows(
    () => {
      Duration.minutesToMilliseconds(Number.NaN);
    },
    TypeError,
    "minutes",
  );
  assertThrows(
    () => {
      Duration.minutesToMilliseconds("1" as unknown as number);
    },
    TypeError,
    "minutes",
  );
});

Deno.test("Duration.millisecondsToHours(number)", () => {
  assertStrictEquals(Duration.millisecondsToHours(-3600000), -1);
  assertStrictEquals(Duration.millisecondsToHours(-0), 0);
  assertStrictEquals(Duration.millisecondsToHours(0), 0);
  assertStrictEquals(Duration.millisecondsToHours(3600000), 1);
  assertStrictEquals(Duration.millisecondsToHours(5400000), 1.5);

  assertThrows(
    () => {
      Duration.millisecondsToHours(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.millisecondsToHours("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.hoursToMilliseconds(number)", () => {
  assertStrictEquals(Duration.hoursToMilliseconds(-1), -3600000);
  assertStrictEquals(Duration.hoursToMilliseconds(-0), 0);
  assertStrictEquals(Duration.hoursToMilliseconds(0), 0);
  assertStrictEquals(Duration.hoursToMilliseconds(1), 3600000);
  assertStrictEquals(Duration.hoursToMilliseconds(1.5), 5400000);

  assertThrows(
    () => {
      Duration.hoursToMilliseconds(Number.NaN);
    },
    TypeError,
    "hours",
  );
  assertThrows(
    () => {
      Duration.hoursToMilliseconds("1" as unknown as number);
    },
    TypeError,
    "hours",
  );
});

Deno.test("Duration.millisecondsToDays(number)", () => {
  assertStrictEquals(Duration.millisecondsToDays(-86400000), -1);
  assertStrictEquals(Duration.millisecondsToDays(-0), 0);
  assertStrictEquals(Duration.millisecondsToDays(0), 0);
  assertStrictEquals(Duration.millisecondsToDays(86400000), 1);
  assertStrictEquals(Duration.millisecondsToDays(129600000), 1.5);

  assertThrows(
    () => {
      Duration.millisecondsToDays(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.millisecondsToDays("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.daysToMilliseconds(number)", () => {
  assertStrictEquals(Duration.daysToMilliseconds(-1), -86400000);
  assertStrictEquals(Duration.daysToMilliseconds(-0), 0);
  assertStrictEquals(Duration.daysToMilliseconds(0), 0);
  assertStrictEquals(Duration.daysToMilliseconds(1), 86400000);
  assertStrictEquals(Duration.daysToMilliseconds(1.5), 129600000);

  assertThrows(
    () => {
      Duration.daysToMilliseconds(Number.NaN);
    },
    TypeError,
    "days",
  );
  assertThrows(
    () => {
      Duration.daysToMilliseconds("1" as unknown as number);
    },
    TypeError,
    "days",
  );
});
