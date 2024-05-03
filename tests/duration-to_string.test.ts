import { assertStrictEquals } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.prototype.toString()", () => {
  assertStrictEquals(Duration.ofMilliseconds(0).toString(), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(1000).toString(), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(60000).toString(), "PT1M00S");
  assertStrictEquals(Duration.ofMilliseconds(61000).toString(), "PT1M01S");

  assertStrictEquals(Duration.ofMilliseconds(100000).toString(), "PT1M40S");
  assertStrictEquals(Duration.ofMilliseconds(-100000).toString(), "-PT1M40S");

  assertStrictEquals(Duration.ofMilliseconds(3600000).toString(), "PT1H00M00S");
  assertStrictEquals(Duration.ofMilliseconds(3601000).toString(), "PT1H00M01S");
  assertStrictEquals(Duration.ofMilliseconds(3660000).toString(), "PT1H01M00S");
  assertStrictEquals(Duration.ofMilliseconds(3661000).toString(), "PT1H01M01S");
  assertStrictEquals(Duration.ofMilliseconds(5900000).toString(), "PT1H38M20S");

  assertStrictEquals(Duration.ofMilliseconds(6000000).toString(), "PT1H40M00S");
  assertStrictEquals(
    Duration.ofMilliseconds(-6000000).toString(),
    "-PT1H40M00S",
  );

  assertStrictEquals(Duration.ofMilliseconds(6100000).toString(), "PT1H41M40S");

  assertStrictEquals(
    Duration.ofMilliseconds(86400000).toString(),
    "P1DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86401000).toString(),
    "P1DT00H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86460000).toString(),
    "P1DT00H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86461000).toString(),
    "P1DT00H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90000000).toString(),
    "P1DT01H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90001000).toString(),
    "P1DT01H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90060000).toString(),
    "P1DT01H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90061000).toString(),
    "P1DT01H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(354000000).toString(),
    "P4DT02H20M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(359900000).toString(),
    "P4DT03H58M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360000000).toString(),
    "P4DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-360000000).toString(),
    "-P4DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360100000).toString(),
    "P4DT04H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(365900000).toString(),
    "P4DT05H38M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366000000).toString(),
    "P4DT05H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366100000).toString(),
    "P4DT05H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640000000).toString(),
    "P100DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8640000000).toString(),
    "-P100DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646000000).toString(),
    "P100DT01H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640100000).toString(),
    "P100DT00H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000000000).toString(),
    "P104DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000100000).toString(),
    "P104DT04H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9006000000).toString(),
    "P104DT05H40M00S",
  );
  assertStrictEquals(Duration.ofMilliseconds(1).toString(), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(), "PT0S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.ofMilliseconds(i).toString()), i);
  // }
});

Deno.test("Duration.prototype.toString({}) - pattern:auto", () => {
  const op = { pattern: "auto" } as const;

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(1000).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(60000).toString(op), "PT1M00S");
  assertStrictEquals(Duration.ofMilliseconds(61000).toString(op), "PT1M01S");

  assertStrictEquals(Duration.ofMilliseconds(100000).toString(op), "PT1M40S");
  assertStrictEquals(Duration.ofMilliseconds(-100000).toString(op), "-PT1M40S");

  assertStrictEquals(
    Duration.ofMilliseconds(3600000).toString(op),
    "PT1H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3601000).toString(op),
    "PT1H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3660000).toString(op),
    "PT1H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3661000).toString(op),
    "PT1H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(5900000).toString(op),
    "PT1H38M20S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6000000).toString(op),
    "PT1H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-6000000).toString(op),
    "-PT1H40M00S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6100000).toString(op),
    "PT1H41M40S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(86400000).toString(op),
    "P1DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86401000).toString(op),
    "P1DT00H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86460000).toString(op),
    "P1DT00H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86461000).toString(op),
    "P1DT00H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90000000).toString(op),
    "P1DT01H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90001000).toString(op),
    "P1DT01H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90060000).toString(op),
    "P1DT01H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90061000).toString(op),
    "P1DT01H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(354000000).toString(op),
    "P4DT02H20M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(359900000).toString(op),
    "P4DT03H58M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360000000).toString(op),
    "P4DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-360000000).toString(op),
    "-P4DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360100000).toString(op),
    "P4DT04H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(365900000).toString(op),
    "P4DT05H38M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366000000).toString(op),
    "P4DT05H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366100000).toString(op),
    "P4DT05H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640000000).toString(op),
    "P100DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8640000000).toString(op),
    "-P100DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646000000).toString(op),
    "P100DT01H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640100000).toString(op),
    "P100DT00H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(op),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000000000).toString(op),
    "P104DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000100000).toString(op),
    "P104DT04H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9006000000).toString(op),
    "P104DT05H40M00S",
  );
  assertStrictEquals(Duration.ofMilliseconds(1).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.ofMilliseconds(i).toString(op)), i);
  // }
});

Deno.test("Duration.prototype.toString({}) - pattern:dhms", () => {
  const op = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
  } as const;

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "P0DT00H00M00S");
  assertStrictEquals(
    Duration.ofMilliseconds(1000).toString(op),
    "P0DT00H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(60000).toString(op),
    "P0DT00H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(61000).toString(op),
    "P0DT00H01M01S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(100000).toString(op),
    "P0DT00H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-100000).toString(op),
    "-P0DT00H01M40S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(3600000).toString(op),
    "P0DT01H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3601000).toString(op),
    "P0DT01H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3660000).toString(op),
    "P0DT01H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3661000).toString(op),
    "P0DT01H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(5900000).toString(op),
    "P0DT01H38M20S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6000000).toString(op),
    "P0DT01H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-6000000).toString(op),
    "-P0DT01H40M00S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6100000).toString(op),
    "P0DT01H41M40S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(86400000).toString(op),
    "P1DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86401000).toString(op),
    "P1DT00H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86460000).toString(op),
    "P1DT00H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86461000).toString(op),
    "P1DT00H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90000000).toString(op),
    "P1DT01H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90001000).toString(op),
    "P1DT01H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90060000).toString(op),
    "P1DT01H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90061000).toString(op),
    "P1DT01H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(354000000).toString(op),
    "P4DT02H20M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(359900000).toString(op),
    "P4DT03H58M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360000000).toString(op),
    "P4DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-360000000).toString(op),
    "-P4DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360100000).toString(op),
    "P4DT04H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(365900000).toString(op),
    "P4DT05H38M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366000000).toString(op),
    "P4DT05H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366100000).toString(op),
    "P4DT05H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640000000).toString(op),
    "P100DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8640000000).toString(op),
    "-P100DT00H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646000000).toString(op),
    "P100DT01H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640100000).toString(op),
    "P100DT00H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(op),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000000000).toString(op),
    "P104DT04H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000100000).toString(op),
    "P104DT04H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9006000000).toString(op),
    "P104DT05H40M00S",
  );
  assertStrictEquals(Duration.ofMilliseconds(1).toString(op), "P0DT00H00M00S");
  assertStrictEquals(
    Duration.ofMilliseconds(0.1).toString(op),
    "P0DT00H00M00S",
  );

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.ofMilliseconds(i).toString(op)), i);
  // }
});

Deno.test("Duration.prototype.toString({}) - pattern:hms", () => {
  const op = {
    pattern: Duration.StringPattern.HOUR_MINUTE_SECOND,
  } as const;

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0H00M00S");
  assertStrictEquals(Duration.ofMilliseconds(1000).toString(op), "PT0H00M01S");
  assertStrictEquals(Duration.ofMilliseconds(60000).toString(op), "PT0H01M00S");
  assertStrictEquals(Duration.ofMilliseconds(61000).toString(op), "PT0H01M01S");

  assertStrictEquals(
    Duration.ofMilliseconds(100000).toString(op),
    "PT0H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-100000).toString(op),
    "-PT0H01M40S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(3600000).toString(op),
    "PT1H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3601000).toString(op),
    "PT1H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3660000).toString(op),
    "PT1H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(3661000).toString(op),
    "PT1H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(5900000).toString(op),
    "PT1H38M20S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6000000).toString(op),
    "PT1H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-6000000).toString(op),
    "-PT1H40M00S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6100000).toString(op),
    "PT1H41M40S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(86400000).toString(op),
    "PT24H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86401000).toString(op),
    "PT24H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86460000).toString(op),
    "PT24H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86461000).toString(op),
    "PT24H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90000000).toString(op),
    "PT25H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90001000).toString(op),
    "PT25H00M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90060000).toString(op),
    "PT25H01M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90061000).toString(op),
    "PT25H01M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(354000000).toString(op),
    "PT98H20M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(359900000).toString(op),
    "PT99H58M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360000000).toString(op),
    "PT100H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-360000000).toString(op),
    "-PT100H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360100000).toString(op),
    "PT100H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(365900000).toString(op),
    "PT101H38M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366000000).toString(op),
    "PT101H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366100000).toString(op),
    "PT101H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640000000).toString(op),
    "PT2400H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8640000000).toString(op),
    "-PT2400H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646000000).toString(op),
    "PT2401H40M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640100000).toString(op),
    "PT2400H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(op),
    "PT2401H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000000000).toString(op),
    "PT2500H00M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000100000).toString(op),
    "PT2500H01M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9006000000).toString(op),
    "PT2501H40M00S",
  );
  assertStrictEquals(Duration.ofMilliseconds(1).toString(op), "PT0H00M00S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0H00M00S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.ofMilliseconds(i).toString(op)), i);
  // }
});

Deno.test("Duration.prototype.toString({}) - pattern:ms", () => {
  const op = { pattern: Duration.StringPattern.MINUTE_SECOND } as const;

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0M00S");
  assertStrictEquals(Duration.ofMilliseconds(1000).toString(op), "PT0M01S");
  assertStrictEquals(Duration.ofMilliseconds(60000).toString(op), "PT1M00S");
  assertStrictEquals(Duration.ofMilliseconds(61000).toString(op), "PT1M01S");

  assertStrictEquals(Duration.ofMilliseconds(100000).toString(op), "PT1M40S");
  assertStrictEquals(Duration.ofMilliseconds(-100000).toString(op), "-PT1M40S");

  assertStrictEquals(Duration.ofMilliseconds(3600000).toString(op), "PT60M00S");
  assertStrictEquals(Duration.ofMilliseconds(3601000).toString(op), "PT60M01S");
  assertStrictEquals(Duration.ofMilliseconds(3660000).toString(op), "PT61M00S");
  assertStrictEquals(Duration.ofMilliseconds(3661000).toString(op), "PT61M01S");
  assertStrictEquals(Duration.ofMilliseconds(5900000).toString(op), "PT98M20S");

  assertStrictEquals(
    Duration.ofMilliseconds(6000000).toString(op),
    "PT100M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-6000000).toString(op),
    "-PT100M00S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(6100000).toString(op),
    "PT101M40S",
  );

  assertStrictEquals(
    Duration.ofMilliseconds(86400000).toString(op),
    "PT1440M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86401000).toString(op),
    "PT1440M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86460000).toString(op),
    "PT1441M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86461000).toString(op),
    "PT1441M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90000000).toString(op),
    "PT1500M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90001000).toString(op),
    "PT1500M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90060000).toString(op),
    "PT1501M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90061000).toString(op),
    "PT1501M01S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(354000000).toString(op),
    "PT5900M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(359900000).toString(op),
    "PT5998M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360000000).toString(op),
    "PT6000M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-360000000).toString(op),
    "-PT6000M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360100000).toString(op),
    "PT6001M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(365900000).toString(op),
    "PT6098M20S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366000000).toString(op),
    "PT6100M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366100000).toString(op),
    "PT6101M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640000000).toString(op),
    "PT144000M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8640000000).toString(op),
    "-PT144000M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646000000).toString(op),
    "PT144100M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640100000).toString(op),
    "PT144001M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(op),
    "PT144101M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000000000).toString(op),
    "PT150000M00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000100000).toString(op),
    "PT150001M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9006000000).toString(op),
    "PT150100M00S",
  );
  assertStrictEquals(Duration.ofMilliseconds(1).toString(op), "PT0M00S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0M00S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.ofMilliseconds(i).toString(op)), i);
  // }
});

Deno.test("Duration.prototype.toString({}) - pattern:s", () => {
  const op = { pattern: Duration.StringPattern.SECOND } as const;

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(1000).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(60000).toString(op), "PT60S");
  assertStrictEquals(Duration.ofMilliseconds(61000).toString(op), "PT61S");

  assertStrictEquals(Duration.ofMilliseconds(100000).toString(op), "PT100S");
  assertStrictEquals(Duration.ofMilliseconds(-100000).toString(op), "-PT100S");

  assertStrictEquals(Duration.ofMilliseconds(3600000).toString(op), "PT3600S");
  assertStrictEquals(Duration.ofMilliseconds(3601000).toString(op), "PT3601S");
  assertStrictEquals(Duration.ofMilliseconds(3660000).toString(op), "PT3660S");
  assertStrictEquals(Duration.ofMilliseconds(3661000).toString(op), "PT3661S");
  assertStrictEquals(Duration.ofMilliseconds(5900000).toString(op), "PT5900S");

  assertStrictEquals(Duration.ofMilliseconds(6000000).toString(op), "PT6000S");
  assertStrictEquals(
    Duration.ofMilliseconds(-6000000).toString(op),
    "-PT6000S",
  );

  assertStrictEquals(Duration.ofMilliseconds(6100000).toString(op), "PT6100S");

  assertStrictEquals(
    Duration.ofMilliseconds(86400000).toString(op),
    "PT86400S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86401000).toString(op),
    "PT86401S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86460000).toString(op),
    "PT86460S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(86461000).toString(op),
    "PT86461S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90000000).toString(op),
    "PT90000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90001000).toString(op),
    "PT90001S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90060000).toString(op),
    "PT90060S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(90061000).toString(op),
    "PT90061S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(354000000).toString(op),
    "PT354000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(359900000).toString(op),
    "PT359900S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360000000).toString(op),
    "PT360000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-360000000).toString(op),
    "-PT360000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(360100000).toString(op),
    "PT360100S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(365900000).toString(op),
    "PT365900S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366000000).toString(op),
    "PT366000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(366100000).toString(op),
    "PT366100S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640000000).toString(op),
    "PT8640000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8640000000).toString(op),
    "-PT8640000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646000000).toString(op),
    "PT8646000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8640100000).toString(op),
    "PT8640100S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(op),
    "PT8646100S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000000000).toString(op),
    "PT9000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9000100000).toString(op),
    "PT9000100S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(9006000000).toString(op),
    "PT9006000S",
  );
  assertStrictEquals(Duration.ofMilliseconds(1).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.ofMilliseconds(i).toString(op)), i);
  // }
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:6", () => {
  const op = { secondFractionDigits: 6 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.004000S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0.034000S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0.234000S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1.234000S");
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5).toString(op),
    "PT1.234500S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.56).toString(op),
    "PT1.234560S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.567).toString(op),
    "PT1.234567S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5678).toString(op),
    "PT1.234567S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-4).toString(op), "-PT0.004000S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "-PT0.034000S");
  assertStrictEquals(
    Duration.ofMilliseconds(-234).toString(op),
    "-PT0.234000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234).toString(op),
    "-PT1.234000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5).toString(op),
    "-PT1.234500S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.56).toString(op),
    "-PT1.234560S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.567).toString(op),
    "-PT1.234567S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5678).toString(op),
    "-PT1.234567S",
  );

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0.000000S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0.000100S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0.000900S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0.000010S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0.000090S");
  assertStrictEquals(
    Duration.ofMilliseconds(0.001).toString(op),
    "PT0.000001S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.009).toString(op),
    "PT0.000009S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.0001).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.0009).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.00001).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.00009).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0.000000S");
  assertStrictEquals(
    Duration.ofMilliseconds(-0.1).toString(op),
    "-PT0.000100S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.9).toString(op),
    "-PT0.000900S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.01).toString(op),
    "-PT0.000010S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.09).toString(op),
    "-PT0.000090S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.001).toString(op),
    "-PT0.000001S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.009).toString(op),
    "-PT0.000009S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.0001).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.0009).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00001).toString(op),
    "PT0.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00009).toString(op),
    "PT0.000000S",
  );
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:5", () => {
  const op = { secondFractionDigits: 5 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.00400S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0.03400S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0.23400S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1.23400S");
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5).toString(op),
    "PT1.23450S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.56).toString(op),
    "PT1.23456S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.567).toString(op),
    "PT1.23456S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5678).toString(op),
    "PT1.23456S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-4).toString(op), "-PT0.00400S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "-PT0.03400S");
  assertStrictEquals(Duration.ofMilliseconds(-234).toString(op), "-PT0.23400S");
  assertStrictEquals(
    Duration.ofMilliseconds(-1234).toString(op),
    "-PT1.23400S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5).toString(op),
    "-PT1.23450S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.56).toString(op),
    "-PT1.23456S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.567).toString(op),
    "-PT1.23456S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5678).toString(op),
    "-PT1.23456S",
  );

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0.00000S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0.00010S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0.00090S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0.00001S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0.00009S");
  assertStrictEquals(Duration.ofMilliseconds(0.001).toString(op), "PT0.00000S");
  assertStrictEquals(Duration.ofMilliseconds(0.009).toString(op), "PT0.00000S");
  assertStrictEquals(
    Duration.ofMilliseconds(0.0001).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.0009).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.00001).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.00009).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0.00000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.1).toString(op), "-PT0.00010S");
  assertStrictEquals(Duration.ofMilliseconds(-0.9).toString(op), "-PT0.00090S");
  assertStrictEquals(
    Duration.ofMilliseconds(-0.01).toString(op),
    "-PT0.00001S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.09).toString(op),
    "-PT0.00009S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.001).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.009).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.0001).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.0009).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00001).toString(op),
    "PT0.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00009).toString(op),
    "PT0.00000S",
  );
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:4", () => {
  const op = { secondFractionDigits: 4 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.0040S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0.0340S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0.2340S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1.2340S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5).toString(op), "PT1.2345S");
  assertStrictEquals(
    Duration.ofMilliseconds(1234.56).toString(op),
    "PT1.2345S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.567).toString(op),
    "PT1.2345S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5678).toString(op),
    "PT1.2345S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-4).toString(op), "-PT0.0040S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "-PT0.0340S");
  assertStrictEquals(Duration.ofMilliseconds(-234).toString(op), "-PT0.2340S");
  assertStrictEquals(Duration.ofMilliseconds(-1234).toString(op), "-PT1.2340S");
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5).toString(op),
    "-PT1.2345S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.56).toString(op),
    "-PT1.2345S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.567).toString(op),
    "-PT1.2345S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5678).toString(op),
    "-PT1.2345S",
  );

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0.0001S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0.0009S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(0.001).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(0.009).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(0.0001).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(0.0009).toString(op), "PT0.0000S");
  assertStrictEquals(
    Duration.ofMilliseconds(0.00001).toString(op),
    "PT0.0000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(0.00009).toString(op),
    "PT0.0000S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.1).toString(op), "-PT0.0001S");
  assertStrictEquals(Duration.ofMilliseconds(-0.9).toString(op), "-PT0.0009S");
  assertStrictEquals(Duration.ofMilliseconds(-0.01).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.09).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.001).toString(op), "PT0.0000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.009).toString(op), "PT0.0000S");
  assertStrictEquals(
    Duration.ofMilliseconds(-0.0001).toString(op),
    "PT0.0000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.0009).toString(op),
    "PT0.0000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00001).toString(op),
    "PT0.0000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00009).toString(op),
    "PT0.0000S",
  );
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:3", () => {
  const op = { secondFractionDigits: 3 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.004S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0.034S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0.234S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1.234S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5).toString(op), "PT1.234S");
  assertStrictEquals(Duration.ofMilliseconds(1234.56).toString(op), "PT1.234S");
  assertStrictEquals(
    Duration.ofMilliseconds(1234.567).toString(op),
    "PT1.234S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5678).toString(op),
    "PT1.234S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-4).toString(op), "-PT0.004S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "-PT0.034S");
  assertStrictEquals(Duration.ofMilliseconds(-234).toString(op), "-PT0.234S");
  assertStrictEquals(Duration.ofMilliseconds(-1234).toString(op), "-PT1.234S");
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5).toString(op),
    "-PT1.234S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.56).toString(op),
    "-PT1.234S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.567).toString(op),
    "-PT1.234S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5678).toString(op),
    "-PT1.234S",
  );

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.001).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.009).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.0001).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.0009).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.00001).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(0.00009).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.1).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.9).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.01).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.09).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.001).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.009).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0001).toString(op), "PT0.000S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0009).toString(op), "PT0.000S");
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00001).toString(op),
    "PT0.000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-0.00009).toString(op),
    "PT0.000S",
  );
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:2", () => {
  const op = { secondFractionDigits: 2 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0.03S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0.23S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1.23S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5).toString(op), "PT1.23S");
  assertStrictEquals(Duration.ofMilliseconds(1234.56).toString(op), "PT1.23S");
  assertStrictEquals(Duration.ofMilliseconds(1234.567).toString(op), "PT1.23S");
  assertStrictEquals(
    Duration.ofMilliseconds(1234.5678).toString(op),
    "PT1.23S",
  );
  assertStrictEquals(Duration.ofMilliseconds(-4).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "-PT0.03S");
  assertStrictEquals(Duration.ofMilliseconds(-234).toString(op), "-PT0.23S");
  assertStrictEquals(Duration.ofMilliseconds(-1234).toString(op), "-PT1.23S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.5).toString(op), "-PT1.23S");
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.56).toString(op),
    "-PT1.23S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.567).toString(op),
    "-PT1.23S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5678).toString(op),
    "-PT1.23S",
  );

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.001).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.009).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.0001).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.0009).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.00001).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(0.00009).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.1).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.9).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.01).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.09).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.001).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.009).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0001).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0009).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.00001).toString(op), "PT0.00S");
  assertStrictEquals(Duration.ofMilliseconds(-0.00009).toString(op), "PT0.00S");
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:1", () => {
  const op = { secondFractionDigits: 1 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0.2S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5).toString(op), "PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(1234.56).toString(op), "PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(1234.567).toString(op), "PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5678).toString(op), "PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-234).toString(op), "-PT0.2S");
  assertStrictEquals(Duration.ofMilliseconds(-1234).toString(op), "-PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.5).toString(op), "-PT1.2S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.56).toString(op), "-PT1.2S");
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.567).toString(op),
    "-PT1.2S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-1234.5678).toString(op),
    "-PT1.2S",
  );

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.001).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.009).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.0001).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.0009).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.00001).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(0.00009).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.1).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.9).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.01).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.09).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.001).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.009).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0001).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0009).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.00001).toString(op), "PT0.0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.00009).toString(op), "PT0.0S");
});

Deno.test("Duration.prototype.toString({}) - secondFractionDigits:0", () => {
  const op = { secondFractionDigits: 0 } as const;

  assertStrictEquals(Duration.ofMilliseconds(4).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(34).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(234).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(1234).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(1234.56).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(1234.567).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(1234.5678).toString(op), "PT1S");
  assertStrictEquals(Duration.ofMilliseconds(-4).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-34).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-234).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-1234).toString(op), "-PT1S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.5).toString(op), "-PT1S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.56).toString(op), "-PT1S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.567).toString(op), "-PT1S");
  assertStrictEquals(Duration.ofMilliseconds(-1234.5678).toString(op), "-PT1S");

  assertStrictEquals(Duration.ofMilliseconds(0).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.1).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.9).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.01).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.09).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.001).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.009).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.0001).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.0009).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.00001).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(0.00009).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.1).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.9).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.01).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.09).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.001).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.009).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0001).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.0009).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.00001).toString(op), "PT0S");
  assertStrictEquals(Duration.ofMilliseconds(-0.00009).toString(op), "PT0S");
});

Deno.test("Duration.prototype.toString({})", () => {
  const opD6 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 6,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD6),
    "P100DT01H41M40.000000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD6),
    "P100DT01H41M40.123000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD6),
    "P100DT01H41M40.123456S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD6),
    "-P100DT01H41M40.123456S",
  );

  const opD5 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 5,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD5),
    "P100DT01H41M40.00000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD5),
    "P100DT01H41M40.12300S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD5),
    "P100DT01H41M40.12345S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD5),
    "-P100DT01H41M40.12345S",
  );

  const opD4 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 4,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD4),
    "P100DT01H41M40.0000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD4),
    "P100DT01H41M40.1230S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD4),
    "P100DT01H41M40.1234S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD4),
    "-P100DT01H41M40.1234S",
  );

  const opD3 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 3,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD3),
    "P100DT01H41M40.000S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD3),
    "P100DT01H41M40.123S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD3),
    "P100DT01H41M40.123S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD3),
    "-P100DT01H41M40.123S",
  );

  const opD2 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 2,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD2),
    "P100DT01H41M40.00S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD2),
    "P100DT01H41M40.12S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD2),
    "P100DT01H41M40.12S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD2),
    "-P100DT01H41M40.12S",
  );

  const opD1 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 1,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD1),
    "P100DT01H41M40.0S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD1),
    "P100DT01H41M40.1S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD1),
    "P100DT01H41M40.1S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD1),
    "-P100DT01H41M40.1S",
  );

  const opD0 = {
    pattern: Duration.StringPattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 0,
  } as const;
  assertStrictEquals(
    Duration.ofMilliseconds(8646100000).toString(opD0),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123).toString(opD0),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(8646100123.4567).toString(opD0),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.ofMilliseconds(-8646100123.4567).toString(opD0),
    "-P100DT01H41M40S",
  );
});
