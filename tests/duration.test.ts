import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.ofSeconds(number)", () => {
  assertStrictEquals(Duration.ofSeconds(-1), -1000);
  assertStrictEquals(Duration.ofSeconds(-0), 0);
  assertStrictEquals(Duration.ofSeconds(0), 0);
  assertStrictEquals(Duration.ofSeconds(1), 1000);
  assertStrictEquals(Duration.ofSeconds(1.5), 1500);

  assertThrows(
    () => {
      Duration.ofSeconds(Number.NaN);
    },
    TypeError,
    "seconds",
  );
  assertThrows(
    () => {
      Duration.ofSeconds("1" as unknown as number);
    },
    TypeError,
    "seconds",
  );
});

Deno.test("Duration.toSeconds(number)", () => {
  assertStrictEquals(Duration.toSeconds(-1000), -1);
  assertStrictEquals(Duration.toSeconds(-0), 0);
  assertStrictEquals(Duration.toSeconds(0), 0);
  assertStrictEquals(Duration.toSeconds(1000), 1);
  assertStrictEquals(Duration.toSeconds(1500), 1.5);

  assertThrows(
    () => {
      Duration.toSeconds(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.toSeconds("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.ofMinutes(number)", () => {
  assertStrictEquals(Duration.ofMinutes(-1), -60000);
  assertStrictEquals(Duration.ofMinutes(-0), 0);
  assertStrictEquals(Duration.ofMinutes(0), 0);
  assertStrictEquals(Duration.ofMinutes(1), 60000);
  assertStrictEquals(Duration.ofMinutes(1.5), 90000);

  assertThrows(
    () => {
      Duration.ofMinutes(Number.NaN);
    },
    TypeError,
    "minutes",
  );
  assertThrows(
    () => {
      Duration.ofMinutes("1" as unknown as number);
    },
    TypeError,
    "minutes",
  );
});

Deno.test("Duration.toMinutes(number)", () => {
  assertStrictEquals(Duration.toMinutes(-60000), -1);
  assertStrictEquals(Duration.toMinutes(-0), 0);
  assertStrictEquals(Duration.toMinutes(0), 0);
  assertStrictEquals(Duration.toMinutes(60000), 1);
  assertStrictEquals(Duration.toMinutes(90000), 1.5);

  assertThrows(
    () => {
      Duration.toMinutes(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.toMinutes("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.ofHours(number)", () => {
  assertStrictEquals(Duration.ofHours(-1), -3600000);
  assertStrictEquals(Duration.ofHours(-0), 0);
  assertStrictEquals(Duration.ofHours(0), 0);
  assertStrictEquals(Duration.ofHours(1), 3600000);
  assertStrictEquals(Duration.ofHours(1.5), 5400000);

  assertThrows(
    () => {
      Duration.ofHours(Number.NaN);
    },
    TypeError,
    "hours",
  );
  assertThrows(
    () => {
      Duration.ofHours("1" as unknown as number);
    },
    TypeError,
    "hours",
  );
});

Deno.test("Duration.toHours(number)", () => {
  assertStrictEquals(Duration.toHours(-3600000), -1);
  assertStrictEquals(Duration.toHours(-0), 0);
  assertStrictEquals(Duration.toHours(0), 0);
  assertStrictEquals(Duration.toHours(3600000), 1);
  assertStrictEquals(Duration.toHours(5400000), 1.5);

  assertThrows(
    () => {
      Duration.toHours(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.toHours("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.ofDays(number)", () => {
  assertStrictEquals(Duration.ofDays(-1), -86400000);
  assertStrictEquals(Duration.ofDays(-0), 0);
  assertStrictEquals(Duration.ofDays(0), 0);
  assertStrictEquals(Duration.ofDays(1), 86400000);
  assertStrictEquals(Duration.ofDays(1.5), 129600000);

  assertThrows(
    () => {
      Duration.ofDays(Number.NaN);
    },
    TypeError,
    "days",
  );
  assertThrows(
    () => {
      Duration.ofDays("1" as unknown as number);
    },
    TypeError,
    "days",
  );
});

Deno.test("Duration.toDays(number)", () => {
  assertStrictEquals(Duration.toDays(-86400000), -1);
  assertStrictEquals(Duration.toDays(-0), 0);
  assertStrictEquals(Duration.toDays(0), 0);
  assertStrictEquals(Duration.toDays(86400000), 1);
  assertStrictEquals(Duration.toDays(129600000), 1.5);

  assertThrows(
    () => {
      Duration.toDays(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.toDays("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});
