import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Duration } from "../mod.ts";

Deno.test("Duration.fromString(string)", () => {
  assertStrictEquals(Duration.fromString("PT1S").toMilliseconds(), 1000);

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
  assertStrictEquals(Duration.fromString("PT0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1S").toMilliseconds(), 1000);
  assertStrictEquals(Duration.fromString("PT1.0S").toMilliseconds(), 1000);
  assertStrictEquals(Duration.fromString("PT01.0S").toMilliseconds(), 1000);
  assertStrictEquals(
    Duration.fromString("PT00100.0000S").toMilliseconds(),
    100000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100.0000S").toMilliseconds(),
    -100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100.0000S").toMilliseconds(),
    -100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100.0000S").toMilliseconds(),
    100000,
  );

  assertStrictEquals(Duration.fromString("PT0.001S").toMilliseconds(), 1);
  assertStrictEquals(Duration.fromString("PT00.0001S").toMilliseconds(), 0.1);
  assertStrictEquals(Duration.fromString("PT00,0001S").toMilliseconds(), 0.1);
  assertStrictEquals(Duration.fromString("PT00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0S").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("PT0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1M").toMilliseconds(), 60000);
  assertStrictEquals(Duration.fromString("PT01M").toMilliseconds(), 60000);
  assertStrictEquals(Duration.fromString("PT00100M").toMilliseconds(), 6000000);
  assertStrictEquals(
    Duration.fromString("PT-00100M").toMilliseconds(),
    -6000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100M").toMilliseconds(),
    -6000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100M").toMilliseconds(),
    6000000,
  );

  assertStrictEquals(Duration.fromString("PT00M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0M").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("PT0H").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1H").toMilliseconds(), 3600000);
  assertStrictEquals(Duration.fromString("PT01H").toMilliseconds(), 3600000);
  assertStrictEquals(
    Duration.fromString("PT00100H").toMilliseconds(),
    360000000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H").toMilliseconds(),
    -360000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100H").toMilliseconds(),
    -360000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100H").toMilliseconds(),
    360000000,
  );

  assertStrictEquals(Duration.fromString("PT00H").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0H").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0H").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0D").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P1D").toMilliseconds(), 86400000);
  assertStrictEquals(Duration.fromString("P01D").toMilliseconds(), 86400000);
  assertStrictEquals(
    Duration.fromString("P00100D").toMilliseconds(),
    8640000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100D").toMilliseconds(),
    -8640000000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100D").toMilliseconds(),
    -8640000000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100D").toMilliseconds(),
    8640000000,
  );

  assertStrictEquals(Duration.fromString("P00D").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0D").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0D").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("PT0M0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1M1S").toMilliseconds(), 61000);
  assertStrictEquals(Duration.fromString("PT1M1.0S").toMilliseconds(), 61000);
  assertStrictEquals(Duration.fromString("PT01M01.0S").toMilliseconds(), 61000);
  assertStrictEquals(
    Duration.fromString("PT00100M00100.0000S").toMilliseconds(),
    6100000,
  );
  assertStrictEquals(
    Duration.fromString("PT00100M-00100.0000S").toMilliseconds(),
    5900000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100M-00100.0000S").toMilliseconds(),
    -6100000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100M00100.0000S").toMilliseconds(),
    -5900000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100M00100.0000S").toMilliseconds(),
    -6100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100M-00100.0000S").toMilliseconds(),
    -5900000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100M-00100.0000S").toMilliseconds(),
    6100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100M00100.0000S").toMilliseconds(),
    5900000,
  );

  assertStrictEquals(Duration.fromString("PT00M00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0M-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0M+0S").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("PT0H0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1H1M").toMilliseconds(), 3660000);
  assertStrictEquals(Duration.fromString("PT01H01M").toMilliseconds(), 3660000);
  assertStrictEquals(
    Duration.fromString("PT00100H00100M").toMilliseconds(),
    366000000,
  );
  assertStrictEquals(
    Duration.fromString("PT00100H-00100M").toMilliseconds(),
    354000000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H-00100M").toMilliseconds(),
    -366000000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H00100M").toMilliseconds(),
    -354000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100H00100M").toMilliseconds(),
    -366000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100H-00100M").toMilliseconds(),
    -354000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100H-00100M").toMilliseconds(),
    366000000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100H00100M").toMilliseconds(),
    354000000,
  );

  assertStrictEquals(Duration.fromString("PT00H00M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0H-0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0H+0M").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("PT0H0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1H1S").toMilliseconds(), 3601000);
  assertStrictEquals(Duration.fromString("PT01H01S").toMilliseconds(), 3601000);
  assertStrictEquals(
    Duration.fromString("PT00100H00100S").toMilliseconds(),
    360100000,
  );
  assertStrictEquals(
    Duration.fromString("PT00100H-00100S").toMilliseconds(),
    359900000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H-00100S").toMilliseconds(),
    -360100000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H00100S").toMilliseconds(),
    -359900000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100H00100S").toMilliseconds(),
    -360100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100H-00100S").toMilliseconds(),
    -359900000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100H-00100S").toMilliseconds(),
    360100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100H00100S").toMilliseconds(),
    359900000,
  );

  assertStrictEquals(Duration.fromString("PT00H00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0H-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0H+0S").toMilliseconds(), 0);

  assertThrows(
    () => {
      Duration.fromString("PT1S1H");
    },
    RangeError,
    "isoExt",
  );
});

Deno.test("Duration.fromString(string) - hms", () => {
  assertStrictEquals(Duration.fromString("PT0H0M0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT1H1M1S").toMilliseconds(), 3661000);
  assertStrictEquals(
    Duration.fromString("PT001H001M001S").toMilliseconds(),
    3661000,
  );
  assertStrictEquals(
    Duration.fromString("PT00100H00100M00100S").toMilliseconds(),
    366100000,
  );
  assertStrictEquals(
    Duration.fromString("PT00100H00100M-00100S").toMilliseconds(),
    365900000,
  );
  assertStrictEquals(
    Duration.fromString("PT00100H-00100M00100S").toMilliseconds(),
    354100000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H00100M00100S").toMilliseconds(),
    -353900000,
  );
  assertStrictEquals(
    Duration.fromString("-PT00100H00100M00100S").toMilliseconds(),
    -366100000,
  );
  assertStrictEquals(
    Duration.fromString("PT-00100H-00100M-00100S").toMilliseconds(),
    -366100000,
  );
  assertStrictEquals(
    Duration.fromString("-PT-00100H-00100M-00100S").toMilliseconds(),
    366100000,
  );

  assertStrictEquals(Duration.fromString("PT00H00M00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT-0H-0M-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("PT+0H+0M+0S").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0H0M0S").toMilliseconds(), 0);
  assertStrictEquals(
    Duration.fromString("P1DT1H1M1S").toMilliseconds(),
    90061000,
  );
  assertStrictEquals(
    Duration.fromString("P001DT001H001M001S").toMilliseconds(),
    90061000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H00100M00100S").toMilliseconds(),
    9006100000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H00100M-00100S").toMilliseconds(),
    9005900000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H-00100M00100S").toMilliseconds(),
    8994100000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100H00100M00100S").toMilliseconds(),
    8286100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100H00100M00100S").toMilliseconds(),
    -8273900000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100H00100M00100S").toMilliseconds(),
    -9006100000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100H-00100M-00100S").toMilliseconds(),
    9006100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100H-00100M-00100S").toMilliseconds(),
    -9006100000,
  );

  assertStrictEquals(Duration.fromString("P00DT00H00M00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H-0M-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H+0M+0S").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0H0M").toMilliseconds(), 0);
  assertStrictEquals(
    Duration.fromString("P1DT1H1M").toMilliseconds(),
    90060000,
  );
  assertStrictEquals(
    Duration.fromString("P001DT001H001M").toMilliseconds(),
    90060000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H00100M").toMilliseconds(),
    9006000000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H-00100M").toMilliseconds(),
    8994000000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100H00100M").toMilliseconds(),
    8286000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100H00100M").toMilliseconds(),
    -8274000000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100H00100M").toMilliseconds(),
    -9006000000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100H-00100M").toMilliseconds(),
    9006000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100H-00100M").toMilliseconds(),
    -9006000000,
  );

  assertStrictEquals(Duration.fromString("P00DT00H00M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H-0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H+0M").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0M0S").toMilliseconds(), 0);
  assertStrictEquals(
    Duration.fromString("P1DT1M1S").toMilliseconds(),
    86461000,
  );
  assertStrictEquals(
    Duration.fromString("P001DT001M001S").toMilliseconds(),
    86461000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100M00100S").toMilliseconds(),
    8646100000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100M-00100S").toMilliseconds(),
    8645900000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100M00100S").toMilliseconds(),
    8634100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100M00100S").toMilliseconds(),
    -8633900000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100M00100S").toMilliseconds(),
    -8646100000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100M-00100S").toMilliseconds(),
    8646100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100M-00100S").toMilliseconds(),
    -8646100000,
  );

  assertStrictEquals(Duration.fromString("P00DT00M00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0M-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0M+0S").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0H0S").toMilliseconds(), 0);
  assertStrictEquals(
    Duration.fromString("P1DT1H1S").toMilliseconds(),
    90001000,
  );
  assertStrictEquals(
    Duration.fromString("P001DT001H001S").toMilliseconds(),
    90001000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H00100S").toMilliseconds(),
    9000100000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H-00100S").toMilliseconds(),
    8999900000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100H00100S").toMilliseconds(),
    8280100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100H00100S").toMilliseconds(),
    -8279900000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100H00100S").toMilliseconds(),
    -9000100000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100H-00100S").toMilliseconds(),
    9000100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100H-00100S").toMilliseconds(),
    -9000100000,
  );

  assertStrictEquals(Duration.fromString("P00DT00H00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H+0S").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0H").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P1DT1H").toMilliseconds(), 90000000);
  assertStrictEquals(
    Duration.fromString("P001DT001H").toMilliseconds(),
    90000000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100H").toMilliseconds(),
    9000000000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100H").toMilliseconds(),
    8280000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100H").toMilliseconds(),
    -8280000000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100H").toMilliseconds(),
    -9000000000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100H").toMilliseconds(),
    9000000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100H").toMilliseconds(),
    -9000000000,
  );

  assertStrictEquals(Duration.fromString("P00DT00H").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0H").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0H").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P1DT1M").toMilliseconds(), 86460000);
  assertStrictEquals(
    Duration.fromString("P001DT001M").toMilliseconds(),
    86460000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100M").toMilliseconds(),
    8646000000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100M").toMilliseconds(),
    8634000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100M").toMilliseconds(),
    -8634000000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100M").toMilliseconds(),
    -8646000000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100M").toMilliseconds(),
    8646000000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100M").toMilliseconds(),
    -8646000000,
  );

  assertStrictEquals(Duration.fromString("P00DT00M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0M").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0M").toMilliseconds(), 0);

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
  assertStrictEquals(Duration.fromString("P0DT0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P1DT1S").toMilliseconds(), 86401000);
  assertStrictEquals(
    Duration.fromString("P001DT001S").toMilliseconds(),
    86401000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT00100S").toMilliseconds(),
    8640100000,
  );
  assertStrictEquals(
    Duration.fromString("P00100DT-00100S").toMilliseconds(),
    8639900000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT00100S").toMilliseconds(),
    -8639900000,
  );
  assertStrictEquals(
    Duration.fromString("-P00100DT00100S").toMilliseconds(),
    -8640100000,
  );
  assertStrictEquals(
    Duration.fromString("-P-00100DT-00100S").toMilliseconds(),
    8640100000,
  );
  assertStrictEquals(
    Duration.fromString("P-00100DT-00100S").toMilliseconds(),
    -8640100000,
  );

  assertStrictEquals(Duration.fromString("P00DT00S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P-0DT-0S").toMilliseconds(), 0);
  assertStrictEquals(Duration.fromString("P+0DT+0S").toMilliseconds(), 0);

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
