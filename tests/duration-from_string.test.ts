import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.fromString(string)", () => {
  assertStrictEquals(Duration.fromString("PT1S"), 1000);

  assertThrows(
    () => {
      Duration.fromString(0 as unknown as string);
    },
    TypeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("");
    },
    TypeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("1DT12H35M3S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1S ");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString(" PT1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P T1S");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - s", () => {
  assertStrictEquals(Duration.fromString("PT0S"), 0);
  assertStrictEquals(Duration.fromString("PT1S"), 1000);
  assertStrictEquals(Duration.fromString("PT1.0S"), 1000);
  assertStrictEquals(Duration.fromString("PT01.0S"), 1000);
  assertStrictEquals(Duration.fromString("PT00100.0000S"), 100000);
  assertStrictEquals(Duration.fromString("PT-00100.0000S"), -100000);
  assertStrictEquals(Duration.fromString("-PT00100.0000S"), -100000);
  assertStrictEquals(Duration.fromString("-PT-00100.0000S"), 100000);

  assertStrictEquals(Duration.fromString("PT0.001S"), 1);
  assertStrictEquals(Duration.fromString("PT00.0001S"), 0.1);
  assertStrictEquals(Duration.fromString("PT00,0001S"), 0.1);
  assertStrictEquals(Duration.fromString("PT00S"), 0);
  assertStrictEquals(Duration.fromString("PT-0S"), 0);
  assertStrictEquals(Duration.fromString("PT+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1 S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT 1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1.S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT.1S");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - m", () => {
  assertStrictEquals(Duration.fromString("PT0M"), 0);
  assertStrictEquals(Duration.fromString("PT1M"), 60000);
  assertStrictEquals(Duration.fromString("PT01M"), 60000);
  assertStrictEquals(Duration.fromString("PT00100M"), 6000000);
  assertStrictEquals(Duration.fromString("PT-00100M"), -6000000);
  assertStrictEquals(Duration.fromString("-PT00100M"), -6000000);
  assertStrictEquals(Duration.fromString("-PT-00100M"), 6000000);

  assertStrictEquals(Duration.fromString("PT00M"), 0);
  assertStrictEquals(Duration.fromString("PT-0M"), 0);
  assertStrictEquals(Duration.fromString("PT+0M"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1 M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT 1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1.0M");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - h", () => {
  assertStrictEquals(Duration.fromString("PT0H"), 0);
  assertStrictEquals(Duration.fromString("PT1H"), 3600000);
  assertStrictEquals(Duration.fromString("PT01H"), 3600000);
  assertStrictEquals(Duration.fromString("PT00100H"), 360000000);
  assertStrictEquals(Duration.fromString("PT-00100H"), -360000000);
  assertStrictEquals(Duration.fromString("-PT00100H"), -360000000);
  assertStrictEquals(Duration.fromString("-PT-00100H"), 360000000);

  assertStrictEquals(Duration.fromString("PT00H"), 0);
  assertStrictEquals(Duration.fromString("PT-0H"), 0);
  assertStrictEquals(Duration.fromString("PT+0H"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1 H");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT 1H");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1.0H");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - d", () => {
  assertStrictEquals(Duration.fromString("P0D"), 0);
  assertStrictEquals(Duration.fromString("P1D"), 86400000);
  assertStrictEquals(Duration.fromString("P01D"), 86400000);
  assertStrictEquals(Duration.fromString("P00100D"), 8640000000);
  assertStrictEquals(Duration.fromString("P-00100D"), -8640000000);
  assertStrictEquals(Duration.fromString("-P00100D"), -8640000000);
  assertStrictEquals(Duration.fromString("-P-00100D"), 8640000000);

  assertStrictEquals(Duration.fromString("P00D"), 0);
  assertStrictEquals(Duration.fromString("P-0D"), 0);
  assertStrictEquals(Duration.fromString("P+0D"), 0);

  assertThrows(
    () => {
      Duration.fromString("P1 D");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P 1D");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1.0D");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1D");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - ms", () => {
  assertStrictEquals(Duration.fromString("PT0M0S"), 0);
  assertStrictEquals(Duration.fromString("PT1M1S"), 61000);
  assertStrictEquals(Duration.fromString("PT1M1.0S"), 61000);
  assertStrictEquals(Duration.fromString("PT01M01.0S"), 61000);
  assertStrictEquals(Duration.fromString("PT00100M00100.0000S"), 6100000);
  assertStrictEquals(Duration.fromString("PT00100M-00100.0000S"), 5900000);
  assertStrictEquals(Duration.fromString("PT-00100M-00100.0000S"), -6100000);
  assertStrictEquals(Duration.fromString("PT-00100M00100.0000S"), -5900000);
  assertStrictEquals(Duration.fromString("-PT00100M00100.0000S"), -6100000);
  assertStrictEquals(Duration.fromString("-PT00100M-00100.0000S"), -5900000);
  assertStrictEquals(Duration.fromString("-PT-00100M-00100.0000S"), 6100000);
  assertStrictEquals(Duration.fromString("-PT-00100M00100.0000S"), 5900000);

  assertStrictEquals(Duration.fromString("PT00M00S"), 0);
  assertStrictEquals(Duration.fromString("PT-0M-0S"), 0);
  assertStrictEquals(Duration.fromString("PT+0M+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1S1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT0.1M1S");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - hm", () => {
  assertStrictEquals(Duration.fromString("PT0H0M"), 0);
  assertStrictEquals(Duration.fromString("PT1H1M"), 3660000);
  assertStrictEquals(Duration.fromString("PT01H01M"), 3660000);
  assertStrictEquals(Duration.fromString("PT00100H00100M"), 366000000);
  assertStrictEquals(Duration.fromString("PT00100H-00100M"), 354000000);
  assertStrictEquals(Duration.fromString("PT-00100H-00100M"), -366000000);
  assertStrictEquals(Duration.fromString("PT-00100H00100M"), -354000000);
  assertStrictEquals(Duration.fromString("-PT00100H00100M"), -366000000);
  assertStrictEquals(Duration.fromString("-PT00100H-00100M"), -354000000);
  assertStrictEquals(Duration.fromString("-PT-00100H-00100M"), 366000000);
  assertStrictEquals(Duration.fromString("-PT-00100H00100M"), 354000000);

  assertStrictEquals(Duration.fromString("PT00H00M"), 0);
  assertStrictEquals(Duration.fromString("PT-0H-0M"), 0);
  assertStrictEquals(Duration.fromString("PT+0H+0M"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1M1H");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT0.1H1M");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - hs", () => {
  assertStrictEquals(Duration.fromString("PT0H0S"), 0);
  assertStrictEquals(Duration.fromString("PT1H1S"), 3601000);
  assertStrictEquals(Duration.fromString("PT01H01S"), 3601000);
  assertStrictEquals(Duration.fromString("PT00100H00100S"), 360100000);
  assertStrictEquals(Duration.fromString("PT00100H-00100S"), 359900000);
  assertStrictEquals(Duration.fromString("PT-00100H-00100S"), -360100000);
  assertStrictEquals(Duration.fromString("PT-00100H00100S"), -359900000);
  assertStrictEquals(Duration.fromString("-PT00100H00100S"), -360100000);
  assertStrictEquals(Duration.fromString("-PT00100H-00100S"), -359900000);
  assertStrictEquals(Duration.fromString("-PT-00100H-00100S"), 360100000);
  assertStrictEquals(Duration.fromString("-PT-00100H00100S"), 359900000);

  assertStrictEquals(Duration.fromString("PT00H00S"), 0);
  assertStrictEquals(Duration.fromString("PT-0H-0S"), 0);
  assertStrictEquals(Duration.fromString("PT+0H+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1S1H");
    },
    RangeError,
    "isoExt",
  );
});

//TODO ,hms,dh,dm,ds,dhm,dms,dhs,dhms
