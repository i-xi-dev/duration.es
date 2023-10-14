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

