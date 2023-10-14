import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.ofSeconds(number)", () => {
  assertStrictEquals(Duration.ofSeconds(-1), -1000);
  assertStrictEquals(Duration.ofSeconds(-0), 0);
  assertStrictEquals(Duration.ofSeconds(0), 0);
  assertStrictEquals(Duration.ofSeconds(1), 1000);
  assertStrictEquals(Duration.ofSeconds(1.5), 1500);
});

Deno.test("Duration.toSeconds(number)", () => {
  assertStrictEquals(Duration.toSeconds(-1000), -1);
  assertStrictEquals(Duration.toSeconds(-0), 0);
  assertStrictEquals(Duration.toSeconds(0), 0);
  assertStrictEquals(Duration.toSeconds(1000), 1);
  assertStrictEquals(Duration.toSeconds(1500), 1.5);
});
