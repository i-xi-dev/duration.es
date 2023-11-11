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

Deno.test("Duration.fromString(string) - hms", () => {
  assertStrictEquals(Duration.fromString("PT0H0M0S"), 0);
  assertStrictEquals(Duration.fromString("PT1H1M1S"), 3661000);
  assertStrictEquals(Duration.fromString("PT001H001M001S"), 3661000);
  assertStrictEquals(Duration.fromString("PT00100H00100M00100S"), 366100000);
  assertStrictEquals(Duration.fromString("PT00100H00100M-00100S"), 365900000);
  assertStrictEquals(Duration.fromString("PT00100H-00100M00100S"), 354100000);
  assertStrictEquals(Duration.fromString("PT-00100H00100M00100S"), -353900000);
  assertStrictEquals(Duration.fromString("-PT00100H00100M00100S"), -366100000);
  assertStrictEquals(Duration.fromString("PT-00100H-00100M-00100S"), -366100000);
  assertStrictEquals(Duration.fromString("-PT-00100H-00100M-00100S"), 366100000);

  assertStrictEquals(Duration.fromString("PT00H00M00S"), 0);
  assertStrictEquals(Duration.fromString("PT-0H-0M-0S"), 0);
  assertStrictEquals(Duration.fromString("PT+0H+0M+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1S1H1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1S1M1H");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("PT1H1S1M");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - dhms", () => {
  assertStrictEquals(Duration.fromString("P0DT0H0M0S"), 0);
  assertStrictEquals(Duration.fromString("P1DT1H1M1S"), 90061000);
  assertStrictEquals(Duration.fromString("P001DT001H001M001S"), 90061000);
  assertStrictEquals(Duration.fromString("P00100DT00100H00100M00100S"), 9006100000);
  assertStrictEquals(Duration.fromString("P00100DT00100H00100M-00100S"), 9005900000);
  assertStrictEquals(Duration.fromString("P00100DT00100H-00100M00100S"), 8994100000);
  assertStrictEquals(Duration.fromString("P00100DT-00100H00100M00100S"), 8286100000);
  assertStrictEquals(Duration.fromString("P-00100DT00100H00100M00100S"), -8273900000);
  assertStrictEquals(Duration.fromString("-P00100DT00100H00100M00100S"), -9006100000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100H-00100M-00100S"), 9006100000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100H-00100M-00100S"), -9006100000);

  assertStrictEquals(Duration.fromString("P00DT00H00M00S"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H-0M-0S"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H+0M+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1H1M1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1HT1M1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1H1MT1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1H1M1ST");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1H1S1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1S1H1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1S1M1H");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1M1H1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1M1S1H");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - dhm", () => {
  assertStrictEquals(Duration.fromString("P0DT0H0M"), 0);
  assertStrictEquals(Duration.fromString("P1DT1H1M"), 90060000);
  assertStrictEquals(Duration.fromString("P001DT001H001M"), 90060000);
  assertStrictEquals(Duration.fromString("P00100DT00100H00100M"), 9006000000);
  assertStrictEquals(Duration.fromString("P00100DT00100H-00100M"), 8994000000);
  assertStrictEquals(Duration.fromString("P00100DT-00100H00100M"), 8286000000);
  assertStrictEquals(Duration.fromString("P-00100DT00100H00100M"), -8274000000);
  assertStrictEquals(Duration.fromString("-P00100DT00100H00100M"), -9006000000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100H-00100M"), 9006000000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100H-00100M"), -9006000000);

  assertStrictEquals(Duration.fromString("P00DT00H00M"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H-0M"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H+0M"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1H1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1HT1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1H1MT");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1M1H");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - dms", () => {
  assertStrictEquals(Duration.fromString("P0DT0M0S"), 0);
  assertStrictEquals(Duration.fromString("P1DT1M1S"), 86461000);
  assertStrictEquals(Duration.fromString("P001DT001M001S"), 86461000);
  assertStrictEquals(Duration.fromString("P00100DT00100M00100S"), 8646100000);
  assertStrictEquals(Duration.fromString("P00100DT00100M-00100S"), 8645900000);
  assertStrictEquals(Duration.fromString("P00100DT-00100M00100S"), 8634100000);
  assertStrictEquals(Duration.fromString("P-00100DT00100M00100S"), -8633900000);
  assertStrictEquals(Duration.fromString("-P00100DT00100M00100S"), -8646100000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100M-00100S"), 8646100000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100M-00100S"), -8646100000);

  assertStrictEquals(Duration.fromString("P00DT00M00S"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0M-0S"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0M+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1M1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1MT1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1M1ST");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1S1M");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - dhs", () => {
  assertStrictEquals(Duration.fromString("P0DT0H0S"), 0);
  assertStrictEquals(Duration.fromString("P1DT1H1S"), 90001000);
  assertStrictEquals(Duration.fromString("P001DT001H001S"), 90001000);
  assertStrictEquals(Duration.fromString("P00100DT00100H00100S"), 9000100000);
  assertStrictEquals(Duration.fromString("P00100DT00100H-00100S"), 8999900000);
  assertStrictEquals(Duration.fromString("P00100DT-00100H00100S"), 8280100000);
  assertStrictEquals(Duration.fromString("P-00100DT00100H00100S"), -8279900000);
  assertStrictEquals(Duration.fromString("-P00100DT00100H00100S"), -9000100000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100H-00100S"), 9000100000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100H-00100S"), -9000100000);

  assertStrictEquals(Duration.fromString("P00DT00H00S"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H-0S"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1H1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1HT1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1H1ST");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1DT1S1H");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - dh", () => {
  assertStrictEquals(Duration.fromString("P0DT0H"), 0);
  assertStrictEquals(Duration.fromString("P1DT1H"), 90000000);
  assertStrictEquals(Duration.fromString("P001DT001H"), 90000000);
  assertStrictEquals(Duration.fromString("P00100DT00100H"), 9000000000);
  assertStrictEquals(Duration.fromString("P00100DT-00100H"), 8280000000);
  assertStrictEquals(Duration.fromString("P-00100DT00100H"), -8280000000);
  assertStrictEquals(Duration.fromString("-P00100DT00100H"), -9000000000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100H"), 9000000000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100H"), -9000000000);

  assertStrictEquals(Duration.fromString("P00DT00H"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1H");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1HT");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1H");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - dm", () => {
  assertStrictEquals(Duration.fromString("P0DT0M"), 0);
  assertStrictEquals(Duration.fromString("P1DT1M"), 86460000);
  assertStrictEquals(Duration.fromString("P001DT001M"), 86460000);
  assertStrictEquals(Duration.fromString("P00100DT00100M"), 8646000000);
  assertStrictEquals(Duration.fromString("P00100DT-00100M"), 8634000000);
  assertStrictEquals(Duration.fromString("P-00100DT00100M"), -8634000000);
  assertStrictEquals(Duration.fromString("-P00100DT00100M"), -8646000000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100M"), 8646000000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100M"), -8646000000);

  assertStrictEquals(Duration.fromString("P00DT00M"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0M"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0M"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1M");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1MT");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1M");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - ds", () => {
  assertStrictEquals(Duration.fromString("P0DT0S"), 0);
  assertStrictEquals(Duration.fromString("P1DT1S"), 86401000);
  assertStrictEquals(Duration.fromString("P001DT001S"), 86401000);
  assertStrictEquals(Duration.fromString("P00100DT00100S"), 8640100000);
  assertStrictEquals(Duration.fromString("P00100DT-00100S"), 8639900000);
  assertStrictEquals(Duration.fromString("P-00100DT00100S"), -8639900000);
  assertStrictEquals(Duration.fromString("-P00100DT00100S"), -8640100000);
  assertStrictEquals(Duration.fromString("-P-00100DT-00100S"), 8640100000);
  assertStrictEquals(Duration.fromString("P-00100DT-00100S"), -8640100000);

  assertStrictEquals(Duration.fromString("P00DT00S"), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0S"), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0S"), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1D1S");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1ST");
    },
    RangeError,
    "isoExt",
  );
  assertThrows(
    () => {
      Duration.fromString("P1D1S");
    },
    RangeError,
    "isoExt",
  );
});
