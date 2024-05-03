import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.ofMilliseconds(number) / Duration.prototype.toMilliseconds()", () => {
  assertStrictEquals(Duration.ofMilliseconds(-1000).toMilliseconds(), -1000);
  assertStrictEquals(Duration.ofMilliseconds(-0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofMilliseconds(0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofMilliseconds(1000).toMilliseconds(), 1000);
  assertStrictEquals(Duration.ofMilliseconds(1500).toMilliseconds(), 1500);

  assertThrows(
    () => {
      Duration.ofMilliseconds(Number.NaN);
    },
    TypeError,
    "milliseconds",
  );
  assertThrows(
    () => {
      Duration.ofMilliseconds("1" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );
});

Deno.test("Duration.ofSeconds(number)", () => {
  assertStrictEquals(Duration.ofSeconds(-1).toMilliseconds(), -1000);
  assertStrictEquals(Duration.ofSeconds(-0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofSeconds(0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofSeconds(1).toMilliseconds(), 1000);
  assertStrictEquals(Duration.ofSeconds(1.5).toMilliseconds(), 1500);

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

Deno.test("Duration.prototype.toSeconds()", () => {
  assertStrictEquals(Duration.ofMilliseconds(-1000).toSeconds(), -1);
  assertStrictEquals(Duration.ofMilliseconds(-0).toSeconds(), 0);
  assertStrictEquals(Duration.ofMilliseconds(0).toSeconds(), 0);
  assertStrictEquals(Duration.ofMilliseconds(1000).toSeconds(), 1);
  assertStrictEquals(Duration.ofMilliseconds(1500).toSeconds(), 1.5);
});

Deno.test("Duration.ofMinutes(number)", () => {
  assertStrictEquals(Duration.ofMinutes(-1).toMilliseconds(), -60000);
  assertStrictEquals(Duration.ofMinutes(-0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofMinutes(0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofMinutes(1).toMilliseconds(), 60000);
  assertStrictEquals(Duration.ofMinutes(1.5).toMilliseconds(), 90000);

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

Deno.test("Duration.prototype.toMinutes()", () => {
  assertStrictEquals(Duration.ofMilliseconds(-60000).toMinutes(), -1);
  assertStrictEquals(Duration.ofMilliseconds(-0).toMinutes(), 0);
  assertStrictEquals(Duration.ofMilliseconds(0).toMinutes(), 0);
  assertStrictEquals(Duration.ofMilliseconds(60000).toMinutes(), 1);
  assertStrictEquals(Duration.ofMilliseconds(90000).toMinutes(), 1.5);
});

Deno.test("Duration.ofHours(number)", () => {
  assertStrictEquals(Duration.ofHours(-1).toMilliseconds(), -3600000);
  assertStrictEquals(Duration.ofHours(-0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofHours(0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofHours(1).toMilliseconds(), 3600000);
  assertStrictEquals(Duration.ofHours(1.5).toMilliseconds(), 5400000);

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

Deno.test("Duration.prototype.toHours()", () => {
  assertStrictEquals(Duration.ofMilliseconds(-3600000).toHours(), -1);
  assertStrictEquals(Duration.ofMilliseconds(-0).toHours(), 0);
  assertStrictEquals(Duration.ofMilliseconds(0).toHours(), 0);
  assertStrictEquals(Duration.ofMilliseconds(3600000).toHours(), 1);
  assertStrictEquals(Duration.ofMilliseconds(5400000).toHours(), 1.5);
});

Deno.test("Duration.ofDays(number)", () => {
  assertStrictEquals(Duration.ofDays(-1).toMilliseconds(), -86400000);
  assertStrictEquals(Duration.ofDays(-0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofDays(0).toMilliseconds(), 0);
  assertStrictEquals(Duration.ofDays(1).toMilliseconds(), 86400000);
  assertStrictEquals(Duration.ofDays(1.5).toMilliseconds(), 129600000);

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

Deno.test("Duration.prototype.toDays()", () => {
  assertStrictEquals(Duration.ofMilliseconds(-86400000).toDays(), -1);
  assertStrictEquals(Duration.ofMilliseconds(-0).toDays(), 0);
  assertStrictEquals(Duration.ofMilliseconds(0).toDays(), 0);
  assertStrictEquals(Duration.ofMilliseconds(86400000).toDays(), 1);
  assertStrictEquals(Duration.ofMilliseconds(129600000).toDays(), 1.5);
});

Deno.test("Duration.prototype.isNegative()", () => {
  assertStrictEquals(Duration.ofMilliseconds(-86400000).isNegative(), true);
  assertStrictEquals(Duration.ofMilliseconds(-0).isNegative(), false);
  assertStrictEquals(Duration.ofMilliseconds(0).isNegative(), false);
  assertStrictEquals(Duration.ofMilliseconds(86400000).isNegative(), false);
  assertStrictEquals(Duration.ofMilliseconds(129600000).isNegative(), false);
});
