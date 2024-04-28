import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.toString(number)", () => {
  assertThrows(
    () => {
      Duration.toString("" as unknown as number);
    },
    TypeError,
    "milliseconds",
  );

  assertStrictEquals(Duration.toString(0), "PT0S");
  assertStrictEquals(Duration.toString(1000), "PT1S");
  assertStrictEquals(Duration.toString(60000), "PT1M00S");
  assertStrictEquals(Duration.toString(61000), "PT1M01S");

  assertStrictEquals(Duration.toString(100000), "PT1M40S");
  assertStrictEquals(Duration.toString(-100000), "-PT1M40S");

  assertStrictEquals(Duration.toString(3600000), "PT1H00M00S");
  assertStrictEquals(Duration.toString(3601000), "PT1H00M01S");
  assertStrictEquals(Duration.toString(3660000), "PT1H01M00S");
  assertStrictEquals(Duration.toString(3661000), "PT1H01M01S");
  assertStrictEquals(Duration.toString(5900000), "PT1H38M20S");

  assertStrictEquals(Duration.toString(6000000), "PT1H40M00S");
  assertStrictEquals(Duration.toString(-6000000), "-PT1H40M00S");

  assertStrictEquals(Duration.toString(6100000), "PT1H41M40S");

  assertStrictEquals(Duration.toString(86400000), "P1DT00H00M00S");
  assertStrictEquals(Duration.toString(86401000), "P1DT00H00M01S");
  assertStrictEquals(Duration.toString(86460000), "P1DT00H01M00S");
  assertStrictEquals(Duration.toString(86461000), "P1DT00H01M01S");
  assertStrictEquals(Duration.toString(90000000), "P1DT01H00M00S");
  assertStrictEquals(Duration.toString(90001000), "P1DT01H00M01S");
  assertStrictEquals(Duration.toString(90060000), "P1DT01H01M00S");
  assertStrictEquals(Duration.toString(90061000), "P1DT01H01M01S");
  assertStrictEquals(Duration.toString(354000000), "P4DT02H20M00S");
  assertStrictEquals(Duration.toString(359900000), "P4DT03H58M20S");
  assertStrictEquals(Duration.toString(360000000), "P4DT04H00M00S");
  assertStrictEquals(Duration.toString(-360000000), "-P4DT04H00M00S");
  assertStrictEquals(Duration.toString(360100000), "P4DT04H01M40S");
  assertStrictEquals(Duration.toString(365900000), "P4DT05H38M20S");
  assertStrictEquals(Duration.toString(366000000), "P4DT05H40M00S");
  assertStrictEquals(Duration.toString(366100000), "P4DT05H41M40S");
  assertStrictEquals(Duration.toString(8640000000), "P100DT00H00M00S");
  assertStrictEquals(Duration.toString(-8640000000), "-P100DT00H00M00S");
  assertStrictEquals(Duration.toString(8646000000), "P100DT01H40M00S");
  assertStrictEquals(Duration.toString(8640100000), "P100DT00H01M40S");
  assertStrictEquals(Duration.toString(8646100000), "P100DT01H41M40S");
  assertStrictEquals(Duration.toString(9000000000), "P104DT04H00M00S");
  assertStrictEquals(Duration.toString(9000100000), "P104DT04H01M40S");
  assertStrictEquals(Duration.toString(9006000000), "P104DT05H40M00S");
  assertStrictEquals(Duration.toString(1), "PT0S");
  assertStrictEquals(Duration.toString(0.1), "PT0S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.toString(i)), i);
  // }
});

Deno.test("Duration.toString(number, {}) - pattern:auto", () => {
  const op = { pattern: "auto" } as const;

  assertStrictEquals(Duration.toString(0, op), "PT0S");
  assertStrictEquals(Duration.toString(1000, op), "PT1S");
  assertStrictEquals(Duration.toString(60000, op), "PT1M00S");
  assertStrictEquals(Duration.toString(61000, op), "PT1M01S");

  assertStrictEquals(Duration.toString(100000, op), "PT1M40S");
  assertStrictEquals(Duration.toString(-100000, op), "-PT1M40S");

  assertStrictEquals(Duration.toString(3600000, op), "PT1H00M00S");
  assertStrictEquals(Duration.toString(3601000, op), "PT1H00M01S");
  assertStrictEquals(Duration.toString(3660000, op), "PT1H01M00S");
  assertStrictEquals(Duration.toString(3661000, op), "PT1H01M01S");
  assertStrictEquals(Duration.toString(5900000, op), "PT1H38M20S");

  assertStrictEquals(Duration.toString(6000000, op), "PT1H40M00S");
  assertStrictEquals(Duration.toString(-6000000, op), "-PT1H40M00S");

  assertStrictEquals(Duration.toString(6100000, op), "PT1H41M40S");

  assertStrictEquals(Duration.toString(86400000, op), "P1DT00H00M00S");
  assertStrictEquals(Duration.toString(86401000, op), "P1DT00H00M01S");
  assertStrictEquals(Duration.toString(86460000, op), "P1DT00H01M00S");
  assertStrictEquals(Duration.toString(86461000, op), "P1DT00H01M01S");
  assertStrictEquals(Duration.toString(90000000, op), "P1DT01H00M00S");
  assertStrictEquals(Duration.toString(90001000, op), "P1DT01H00M01S");
  assertStrictEquals(Duration.toString(90060000, op), "P1DT01H01M00S");
  assertStrictEquals(Duration.toString(90061000, op), "P1DT01H01M01S");
  assertStrictEquals(Duration.toString(354000000, op), "P4DT02H20M00S");
  assertStrictEquals(Duration.toString(359900000, op), "P4DT03H58M20S");
  assertStrictEquals(Duration.toString(360000000, op), "P4DT04H00M00S");
  assertStrictEquals(Duration.toString(-360000000, op), "-P4DT04H00M00S");
  assertStrictEquals(Duration.toString(360100000, op), "P4DT04H01M40S");
  assertStrictEquals(Duration.toString(365900000, op), "P4DT05H38M20S");
  assertStrictEquals(Duration.toString(366000000, op), "P4DT05H40M00S");
  assertStrictEquals(Duration.toString(366100000, op), "P4DT05H41M40S");
  assertStrictEquals(Duration.toString(8640000000, op), "P100DT00H00M00S");
  assertStrictEquals(Duration.toString(-8640000000, op), "-P100DT00H00M00S");
  assertStrictEquals(Duration.toString(8646000000, op), "P100DT01H40M00S");
  assertStrictEquals(Duration.toString(8640100000, op), "P100DT00H01M40S");
  assertStrictEquals(Duration.toString(8646100000, op), "P100DT01H41M40S");
  assertStrictEquals(Duration.toString(9000000000, op), "P104DT04H00M00S");
  assertStrictEquals(Duration.toString(9000100000, op), "P104DT04H01M40S");
  assertStrictEquals(Duration.toString(9006000000, op), "P104DT05H40M00S");
  assertStrictEquals(Duration.toString(1, op), "PT0S");
  assertStrictEquals(Duration.toString(0.1, op), "PT0S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.toString(i, op)), i);
  // }
});

Deno.test("Duration.toString(number, {}) - pattern:dhms", () => {
  const op = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
  } as const;

  assertStrictEquals(Duration.toString(0, op), "P0DT00H00M00S");
  assertStrictEquals(Duration.toString(1000, op), "P0DT00H00M01S");
  assertStrictEquals(Duration.toString(60000, op), "P0DT00H01M00S");
  assertStrictEquals(Duration.toString(61000, op), "P0DT00H01M01S");

  assertStrictEquals(Duration.toString(100000, op), "P0DT00H01M40S");
  assertStrictEquals(Duration.toString(-100000, op), "-P0DT00H01M40S");

  assertStrictEquals(Duration.toString(3600000, op), "P0DT01H00M00S");
  assertStrictEquals(Duration.toString(3601000, op), "P0DT01H00M01S");
  assertStrictEquals(Duration.toString(3660000, op), "P0DT01H01M00S");
  assertStrictEquals(Duration.toString(3661000, op), "P0DT01H01M01S");
  assertStrictEquals(Duration.toString(5900000, op), "P0DT01H38M20S");

  assertStrictEquals(Duration.toString(6000000, op), "P0DT01H40M00S");
  assertStrictEquals(Duration.toString(-6000000, op), "-P0DT01H40M00S");

  assertStrictEquals(Duration.toString(6100000, op), "P0DT01H41M40S");

  assertStrictEquals(Duration.toString(86400000, op), "P1DT00H00M00S");
  assertStrictEquals(Duration.toString(86401000, op), "P1DT00H00M01S");
  assertStrictEquals(Duration.toString(86460000, op), "P1DT00H01M00S");
  assertStrictEquals(Duration.toString(86461000, op), "P1DT00H01M01S");
  assertStrictEquals(Duration.toString(90000000, op), "P1DT01H00M00S");
  assertStrictEquals(Duration.toString(90001000, op), "P1DT01H00M01S");
  assertStrictEquals(Duration.toString(90060000, op), "P1DT01H01M00S");
  assertStrictEquals(Duration.toString(90061000, op), "P1DT01H01M01S");
  assertStrictEquals(Duration.toString(354000000, op), "P4DT02H20M00S");
  assertStrictEquals(Duration.toString(359900000, op), "P4DT03H58M20S");
  assertStrictEquals(Duration.toString(360000000, op), "P4DT04H00M00S");
  assertStrictEquals(Duration.toString(-360000000, op), "-P4DT04H00M00S");
  assertStrictEquals(Duration.toString(360100000, op), "P4DT04H01M40S");
  assertStrictEquals(Duration.toString(365900000, op), "P4DT05H38M20S");
  assertStrictEquals(Duration.toString(366000000, op), "P4DT05H40M00S");
  assertStrictEquals(Duration.toString(366100000, op), "P4DT05H41M40S");
  assertStrictEquals(Duration.toString(8640000000, op), "P100DT00H00M00S");
  assertStrictEquals(Duration.toString(-8640000000, op), "-P100DT00H00M00S");
  assertStrictEquals(Duration.toString(8646000000, op), "P100DT01H40M00S");
  assertStrictEquals(Duration.toString(8640100000, op), "P100DT00H01M40S");
  assertStrictEquals(Duration.toString(8646100000, op), "P100DT01H41M40S");
  assertStrictEquals(Duration.toString(9000000000, op), "P104DT04H00M00S");
  assertStrictEquals(Duration.toString(9000100000, op), "P104DT04H01M40S");
  assertStrictEquals(Duration.toString(9006000000, op), "P104DT05H40M00S");
  assertStrictEquals(Duration.toString(1, op), "P0DT00H00M00S");
  assertStrictEquals(Duration.toString(0.1, op), "P0DT00H00M00S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.toString(i, op)), i);
  // }
});

Deno.test("Duration.toString(number, {}) - pattern:hms", () => {
  const op = {
    pattern: Duration.StringOptions.Pattern.HOUR_MINUTE_SECOND,
  } as const;

  assertStrictEquals(Duration.toString(0, op), "PT0H00M00S");
  assertStrictEquals(Duration.toString(1000, op), "PT0H00M01S");
  assertStrictEquals(Duration.toString(60000, op), "PT0H01M00S");
  assertStrictEquals(Duration.toString(61000, op), "PT0H01M01S");

  assertStrictEquals(Duration.toString(100000, op), "PT0H01M40S");
  assertStrictEquals(Duration.toString(-100000, op), "-PT0H01M40S");

  assertStrictEquals(Duration.toString(3600000, op), "PT1H00M00S");
  assertStrictEquals(Duration.toString(3601000, op), "PT1H00M01S");
  assertStrictEquals(Duration.toString(3660000, op), "PT1H01M00S");
  assertStrictEquals(Duration.toString(3661000, op), "PT1H01M01S");
  assertStrictEquals(Duration.toString(5900000, op), "PT1H38M20S");

  assertStrictEquals(Duration.toString(6000000, op), "PT1H40M00S");
  assertStrictEquals(Duration.toString(-6000000, op), "-PT1H40M00S");

  assertStrictEquals(Duration.toString(6100000, op), "PT1H41M40S");

  assertStrictEquals(Duration.toString(86400000, op), "PT24H00M00S");
  assertStrictEquals(Duration.toString(86401000, op), "PT24H00M01S");
  assertStrictEquals(Duration.toString(86460000, op), "PT24H01M00S");
  assertStrictEquals(Duration.toString(86461000, op), "PT24H01M01S");
  assertStrictEquals(Duration.toString(90000000, op), "PT25H00M00S");
  assertStrictEquals(Duration.toString(90001000, op), "PT25H00M01S");
  assertStrictEquals(Duration.toString(90060000, op), "PT25H01M00S");
  assertStrictEquals(Duration.toString(90061000, op), "PT25H01M01S");
  assertStrictEquals(Duration.toString(354000000, op), "PT98H20M00S");
  assertStrictEquals(Duration.toString(359900000, op), "PT99H58M20S");
  assertStrictEquals(Duration.toString(360000000, op), "PT100H00M00S");
  assertStrictEquals(Duration.toString(-360000000, op), "-PT100H00M00S");
  assertStrictEquals(Duration.toString(360100000, op), "PT100H01M40S");
  assertStrictEquals(Duration.toString(365900000, op), "PT101H38M20S");
  assertStrictEquals(Duration.toString(366000000, op), "PT101H40M00S");
  assertStrictEquals(Duration.toString(366100000, op), "PT101H41M40S");
  assertStrictEquals(Duration.toString(8640000000, op), "PT2400H00M00S");
  assertStrictEquals(Duration.toString(-8640000000, op), "-PT2400H00M00S");
  assertStrictEquals(Duration.toString(8646000000, op), "PT2401H40M00S");
  assertStrictEquals(Duration.toString(8640100000, op), "PT2400H01M40S");
  assertStrictEquals(Duration.toString(8646100000, op), "PT2401H41M40S");
  assertStrictEquals(Duration.toString(9000000000, op), "PT2500H00M00S");
  assertStrictEquals(Duration.toString(9000100000, op), "PT2500H01M40S");
  assertStrictEquals(Duration.toString(9006000000, op), "PT2501H40M00S");
  assertStrictEquals(Duration.toString(1, op), "PT0H00M00S");
  assertStrictEquals(Duration.toString(0.1, op), "PT0H00M00S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.toString(i, op)), i);
  // }
});

Deno.test("Duration.toString(number, {}) - pattern:ms", () => {
  const op = { pattern: Duration.StringOptions.Pattern.MINUTE_SECOND } as const;

  assertStrictEquals(Duration.toString(0, op), "PT0M00S");
  assertStrictEquals(Duration.toString(1000, op), "PT0M01S");
  assertStrictEquals(Duration.toString(60000, op), "PT1M00S");
  assertStrictEquals(Duration.toString(61000, op), "PT1M01S");

  assertStrictEquals(Duration.toString(100000, op), "PT1M40S");
  assertStrictEquals(Duration.toString(-100000, op), "-PT1M40S");

  assertStrictEquals(Duration.toString(3600000, op), "PT60M00S");
  assertStrictEquals(Duration.toString(3601000, op), "PT60M01S");
  assertStrictEquals(Duration.toString(3660000, op), "PT61M00S");
  assertStrictEquals(Duration.toString(3661000, op), "PT61M01S");
  assertStrictEquals(Duration.toString(5900000, op), "PT98M20S");

  assertStrictEquals(Duration.toString(6000000, op), "PT100M00S");
  assertStrictEquals(Duration.toString(-6000000, op), "-PT100M00S");

  assertStrictEquals(Duration.toString(6100000, op), "PT101M40S");

  assertStrictEquals(Duration.toString(86400000, op), "PT1440M00S");
  assertStrictEquals(Duration.toString(86401000, op), "PT1440M01S");
  assertStrictEquals(Duration.toString(86460000, op), "PT1441M00S");
  assertStrictEquals(Duration.toString(86461000, op), "PT1441M01S");
  assertStrictEquals(Duration.toString(90000000, op), "PT1500M00S");
  assertStrictEquals(Duration.toString(90001000, op), "PT1500M01S");
  assertStrictEquals(Duration.toString(90060000, op), "PT1501M00S");
  assertStrictEquals(Duration.toString(90061000, op), "PT1501M01S");
  assertStrictEquals(Duration.toString(354000000, op), "PT5900M00S");
  assertStrictEquals(Duration.toString(359900000, op), "PT5998M20S");
  assertStrictEquals(Duration.toString(360000000, op), "PT6000M00S");
  assertStrictEquals(Duration.toString(-360000000, op), "-PT6000M00S");
  assertStrictEquals(Duration.toString(360100000, op), "PT6001M40S");
  assertStrictEquals(Duration.toString(365900000, op), "PT6098M20S");
  assertStrictEquals(Duration.toString(366000000, op), "PT6100M00S");
  assertStrictEquals(Duration.toString(366100000, op), "PT6101M40S");
  assertStrictEquals(Duration.toString(8640000000, op), "PT144000M00S");
  assertStrictEquals(Duration.toString(-8640000000, op), "-PT144000M00S");
  assertStrictEquals(Duration.toString(8646000000, op), "PT144100M00S");
  assertStrictEquals(Duration.toString(8640100000, op), "PT144001M40S");
  assertStrictEquals(Duration.toString(8646100000, op), "PT144101M40S");
  assertStrictEquals(Duration.toString(9000000000, op), "PT150000M00S");
  assertStrictEquals(Duration.toString(9000100000, op), "PT150001M40S");
  assertStrictEquals(Duration.toString(9006000000, op), "PT150100M00S");
  assertStrictEquals(Duration.toString(1, op), "PT0M00S");
  assertStrictEquals(Duration.toString(0.1, op), "PT0M00S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.toString(i, op)), i);
  // }
});

Deno.test("Duration.toString(number, {}) - pattern:s", () => {
  const op = { pattern: Duration.StringOptions.Pattern.SECOND } as const;

  assertStrictEquals(Duration.toString(0, op), "PT0S");
  assertStrictEquals(Duration.toString(1000, op), "PT1S");
  assertStrictEquals(Duration.toString(60000, op), "PT60S");
  assertStrictEquals(Duration.toString(61000, op), "PT61S");

  assertStrictEquals(Duration.toString(100000, op), "PT100S");
  assertStrictEquals(Duration.toString(-100000, op), "-PT100S");

  assertStrictEquals(Duration.toString(3600000, op), "PT3600S");
  assertStrictEquals(Duration.toString(3601000, op), "PT3601S");
  assertStrictEquals(Duration.toString(3660000, op), "PT3660S");
  assertStrictEquals(Duration.toString(3661000, op), "PT3661S");
  assertStrictEquals(Duration.toString(5900000, op), "PT5900S");

  assertStrictEquals(Duration.toString(6000000, op), "PT6000S");
  assertStrictEquals(Duration.toString(-6000000, op), "-PT6000S");

  assertStrictEquals(Duration.toString(6100000, op), "PT6100S");

  assertStrictEquals(Duration.toString(86400000, op), "PT86400S");
  assertStrictEquals(Duration.toString(86401000, op), "PT86401S");
  assertStrictEquals(Duration.toString(86460000, op), "PT86460S");
  assertStrictEquals(Duration.toString(86461000, op), "PT86461S");
  assertStrictEquals(Duration.toString(90000000, op), "PT90000S");
  assertStrictEquals(Duration.toString(90001000, op), "PT90001S");
  assertStrictEquals(Duration.toString(90060000, op), "PT90060S");
  assertStrictEquals(Duration.toString(90061000, op), "PT90061S");
  assertStrictEquals(Duration.toString(354000000, op), "PT354000S");
  assertStrictEquals(Duration.toString(359900000, op), "PT359900S");
  assertStrictEquals(Duration.toString(360000000, op), "PT360000S");
  assertStrictEquals(Duration.toString(-360000000, op), "-PT360000S");
  assertStrictEquals(Duration.toString(360100000, op), "PT360100S");
  assertStrictEquals(Duration.toString(365900000, op), "PT365900S");
  assertStrictEquals(Duration.toString(366000000, op), "PT366000S");
  assertStrictEquals(Duration.toString(366100000, op), "PT366100S");
  assertStrictEquals(Duration.toString(8640000000, op), "PT8640000S");
  assertStrictEquals(Duration.toString(-8640000000, op), "-PT8640000S");
  assertStrictEquals(Duration.toString(8646000000, op), "PT8646000S");
  assertStrictEquals(Duration.toString(8640100000, op), "PT8640100S");
  assertStrictEquals(Duration.toString(8646100000, op), "PT8646100S");
  assertStrictEquals(Duration.toString(9000000000, op), "PT9000000S");
  assertStrictEquals(Duration.toString(9000100000, op), "PT9000100S");
  assertStrictEquals(Duration.toString(9006000000, op), "PT9006000S");
  assertStrictEquals(Duration.toString(1, op), "PT0S");
  assertStrictEquals(Duration.toString(0.1, op), "PT0S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Duration.toString(i, op)), i);
  // }
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:6", () => {
  const op0 = { secondFractionDigits: 6 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0.004000S");
  assertStrictEquals(Duration.toString(34, op0), "PT0.034000S");
  assertStrictEquals(Duration.toString(234, op0), "PT0.234000S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1.234000S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1.234500S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1.234560S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1.234567S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1.234567S");
  assertStrictEquals(Duration.toString(-4, op0), "-PT0.004000S");
  assertStrictEquals(Duration.toString(-34, op0), "-PT0.034000S");
  assertStrictEquals(Duration.toString(-234, op0), "-PT0.234000S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1.234000S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1.234500S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1.234560S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1.234567S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1.234567S");

  assertStrictEquals(Duration.toString(0, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0.000100S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0.000900S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0.000010S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0.000090S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0.000001S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0.000009S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(-0.1, op0), "-PT0.000100S");
  assertStrictEquals(Duration.toString(-0.9, op0), "-PT0.000900S");
  assertStrictEquals(Duration.toString(-0.01, op0), "-PT0.000010S");
  assertStrictEquals(Duration.toString(-0.09, op0), "-PT0.000090S");
  assertStrictEquals(Duration.toString(-0.001, op0), "-PT0.000001S");
  assertStrictEquals(Duration.toString(-0.009, op0), "-PT0.000009S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0.000000S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0.000000S");
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:5", () => {
  const op0 = { secondFractionDigits: 5 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0.00400S");
  assertStrictEquals(Duration.toString(34, op0), "PT0.03400S");
  assertStrictEquals(Duration.toString(234, op0), "PT0.23400S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1.23400S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1.23450S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1.23456S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1.23456S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1.23456S");
  assertStrictEquals(Duration.toString(-4, op0), "-PT0.00400S");
  assertStrictEquals(Duration.toString(-34, op0), "-PT0.03400S");
  assertStrictEquals(Duration.toString(-234, op0), "-PT0.23400S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1.23400S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1.23450S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1.23456S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1.23456S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1.23456S");

  assertStrictEquals(Duration.toString(0, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0.00010S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0.00090S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0.00001S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0.00009S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0.1, op0), "-PT0.00010S");
  assertStrictEquals(Duration.toString(-0.9, op0), "-PT0.00090S");
  assertStrictEquals(Duration.toString(-0.01, op0), "-PT0.00001S");
  assertStrictEquals(Duration.toString(-0.09, op0), "-PT0.00009S");
  assertStrictEquals(Duration.toString(-0.001, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0.009, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0.00000S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0.00000S");
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:4", () => {
  const op0 = { secondFractionDigits: 4 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0.0040S");
  assertStrictEquals(Duration.toString(34, op0), "PT0.0340S");
  assertStrictEquals(Duration.toString(234, op0), "PT0.2340S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1.2340S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1.2345S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1.2345S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1.2345S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1.2345S");
  assertStrictEquals(Duration.toString(-4, op0), "-PT0.0040S");
  assertStrictEquals(Duration.toString(-34, op0), "-PT0.0340S");
  assertStrictEquals(Duration.toString(-234, op0), "-PT0.2340S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1.2340S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1.2345S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1.2345S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1.2345S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1.2345S");

  assertStrictEquals(Duration.toString(0, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0.0001S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0.0009S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.1, op0), "-PT0.0001S");
  assertStrictEquals(Duration.toString(-0.9, op0), "-PT0.0009S");
  assertStrictEquals(Duration.toString(-0.01, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.09, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.001, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.009, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0.0000S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0.0000S");
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:3", () => {
  const op0 = { secondFractionDigits: 3 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0.004S");
  assertStrictEquals(Duration.toString(34, op0), "PT0.034S");
  assertStrictEquals(Duration.toString(234, op0), "PT0.234S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1.234S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1.234S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1.234S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1.234S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1.234S");
  assertStrictEquals(Duration.toString(-4, op0), "-PT0.004S");
  assertStrictEquals(Duration.toString(-34, op0), "-PT0.034S");
  assertStrictEquals(Duration.toString(-234, op0), "-PT0.234S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1.234S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1.234S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1.234S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1.234S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1.234S");

  assertStrictEquals(Duration.toString(0, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.1, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.9, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.01, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.09, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.001, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.009, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0.000S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0.000S");
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:2", () => {
  const op0 = { secondFractionDigits: 2 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(34, op0), "PT0.03S");
  assertStrictEquals(Duration.toString(234, op0), "PT0.23S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1.23S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1.23S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1.23S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1.23S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1.23S");
  assertStrictEquals(Duration.toString(-4, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-34, op0), "-PT0.03S");
  assertStrictEquals(Duration.toString(-234, op0), "-PT0.23S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1.23S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1.23S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1.23S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1.23S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1.23S");

  assertStrictEquals(Duration.toString(0, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.1, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.9, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.01, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.09, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.001, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.009, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0.00S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0.00S");
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:1", () => {
  const op0 = { secondFractionDigits: 1 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(34, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(234, op0), "PT0.2S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1.2S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1.2S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1.2S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1.2S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1.2S");
  assertStrictEquals(Duration.toString(4, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-34, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-234, op0), "-PT0.2S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1.2S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1.2S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1.2S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1.2S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1.2S");

  assertStrictEquals(Duration.toString(0, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.1, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.9, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.01, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.09, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.001, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.009, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0.0S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0.0S");
});

Deno.test("Duration.toString(number, {}) - secondFractionDigits:0", () => {
  const op0 = { secondFractionDigits: 0 } as const;

  assertStrictEquals(Duration.toString(4, op0), "PT0S");
  assertStrictEquals(Duration.toString(34, op0), "PT0S");
  assertStrictEquals(Duration.toString(234, op0), "PT0S");
  assertStrictEquals(Duration.toString(1234, op0), "PT1S");
  assertStrictEquals(Duration.toString(1234.5, op0), "PT1S");
  assertStrictEquals(Duration.toString(1234.56, op0), "PT1S");
  assertStrictEquals(Duration.toString(1234.567, op0), "PT1S");
  assertStrictEquals(Duration.toString(1234.5678, op0), "PT1S");
  assertStrictEquals(Duration.toString(-4, op0), "PT0S");
  assertStrictEquals(Duration.toString(-34, op0), "PT0S");
  assertStrictEquals(Duration.toString(-234, op0), "PT0S");
  assertStrictEquals(Duration.toString(-1234, op0), "-PT1S");
  assertStrictEquals(Duration.toString(-1234.5, op0), "-PT1S");
  assertStrictEquals(Duration.toString(-1234.56, op0), "-PT1S");
  assertStrictEquals(Duration.toString(-1234.567, op0), "-PT1S");
  assertStrictEquals(Duration.toString(-1234.5678, op0), "-PT1S");

  assertStrictEquals(Duration.toString(0, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.1, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.9, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.01, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.09, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.001, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.009, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.0001, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.0009, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.00001, op0), "PT0S");
  assertStrictEquals(Duration.toString(0.00009, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.1, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.9, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.01, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.09, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.001, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.009, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.0001, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.0009, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.00001, op0), "PT0S");
  assertStrictEquals(Duration.toString(-0.00009, op0), "PT0S");
});

Deno.test("Duration.toString(number, {})", () => {
  const opD6 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 6,
  } as const;
  assertStrictEquals(
    Duration.toString(8646100000, opD6),
    "P100DT01H41M40.000000S",
  );
  assertStrictEquals(
    Duration.toString(8646100123, opD6),
    "P100DT01H41M40.123000S",
  );
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD6),
    "P100DT01H41M40.123456S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD6),
    "-P100DT01H41M40.123456S",
  );

  const opD5 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 5,
  } as const;
  assertStrictEquals(
    Duration.toString(8646100000, opD5),
    "P100DT01H41M40.00000S",
  );
  assertStrictEquals(
    Duration.toString(8646100123, opD5),
    "P100DT01H41M40.12300S",
  );
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD5),
    "P100DT01H41M40.12345S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD5),
    "-P100DT01H41M40.12345S",
  );

  const opD4 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 4,
  } as const;
  assertStrictEquals(
    Duration.toString(8646100000, opD4),
    "P100DT01H41M40.0000S",
  );
  assertStrictEquals(
    Duration.toString(8646100123, opD4),
    "P100DT01H41M40.1230S",
  );
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD4),
    "P100DT01H41M40.1234S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD4),
    "-P100DT01H41M40.1234S",
  );

  const opD3 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 3,
  } as const;
  assertStrictEquals(
    Duration.toString(8646100000, opD3),
    "P100DT01H41M40.000S",
  );
  assertStrictEquals(
    Duration.toString(8646100123, opD3),
    "P100DT01H41M40.123S",
  );
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD3),
    "P100DT01H41M40.123S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD3),
    "-P100DT01H41M40.123S",
  );

  const opD2 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 2,
  } as const;
  assertStrictEquals(Duration.toString(8646100000, opD2), "P100DT01H41M40.00S");
  assertStrictEquals(Duration.toString(8646100123, opD2), "P100DT01H41M40.12S");
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD2),
    "P100DT01H41M40.12S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD2),
    "-P100DT01H41M40.12S",
  );

  const opD1 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 1,
  } as const;
  assertStrictEquals(Duration.toString(8646100000, opD1), "P100DT01H41M40.0S");
  assertStrictEquals(Duration.toString(8646100123, opD1), "P100DT01H41M40.1S");
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD1),
    "P100DT01H41M40.1S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD1),
    "-P100DT01H41M40.1S",
  );

  const opD0 = {
    pattern: Duration.StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND,
    secondFractionDigits: 0,
  } as const;
  assertStrictEquals(Duration.toString(8646100000, opD0), "P100DT01H41M40S");
  assertStrictEquals(Duration.toString(8646100123, opD0), "P100DT01H41M40S");
  assertStrictEquals(
    Duration.toString(8646100123.4567, opD0),
    "P100DT01H41M40S",
  );
  assertStrictEquals(
    Duration.toString(-8646100123.4567, opD0),
    "-P100DT01H41M40S",
  );
});
