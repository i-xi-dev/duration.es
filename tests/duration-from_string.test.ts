import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.fromString(string)", () => {
  assertStrictEquals(Duration.fromString("PT1S"), 1000);
  assertStrictEquals(Duration.fromString("PT1.0S"), 1000);
  assertStrictEquals(Duration.fromString("PT01.0S"), 1000);
  assertStrictEquals(Duration.fromString("PT0100.0000S"), 100000);
  assertStrictEquals(Duration.fromString("PT-0100.0000S"), -100000);
  assertStrictEquals(Duration.fromString("-PT0100.0000S"), -100000);
  assertStrictEquals(Duration.fromString("-PT-0100.0000S"), 100000);

});
