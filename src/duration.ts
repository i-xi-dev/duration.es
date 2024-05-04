import {
  NumberEx,
  RoundingMode,
  SafeInteger,
  SafeIntegerFormat,
  StringEx,
} from "../deps.ts";

export class Duration {
  #milliseconds: number;

  private constructor(milliseconds: number) {
    if (Number.isFinite(milliseconds) !== true) {
      throw new TypeError("milliseconds");
    }

    this.#milliseconds = NumberEx.normalizeNumber(milliseconds);
  }

  static ofMilliseconds(milliseconds: number): Duration {
    return new Duration(milliseconds);
  }

  toMilliseconds(): number {
    return this.#milliseconds;
  }

  static ofSeconds(seconds: number): Duration {
    return new Duration(Duration.secondsToMilliseconds(seconds));
  }

  toSeconds(): number {
    return Duration.millisecondsToSeconds(this.#milliseconds);
  }

  static ofMinutes(minutes: number): Duration {
    return new Duration(Duration.minutesToMilliseconds(minutes));
  }

  toMinutes(): number {
    return Duration.millisecondsToMinutes(this.#milliseconds);
  }

  static ofHours(hours: number): Duration {
    return new Duration(Duration.hoursToMilliseconds(hours));
  }

  toHours(): number {
    return Duration.millisecondsToHours(this.#milliseconds);
  }

  static ofDays(days: number): Duration {
    return new Duration(Duration.daysToMilliseconds(days));
  }

  toDays(): number {
    return Duration.millisecondsToDays(this.#milliseconds);
  }

  isNegative(): boolean {
    return (this.#milliseconds < NumberEx.ZERO);
  }

  // java.time における ISO 8601 の拡張構文を受け付ける
  static fromString(isoExt: string): Duration {
    if (StringEx.isNonEmptyString(isoExt) !== true) {
      throw new TypeError("isoExt");
    }
    //XXX trimするか？

    const parsedParts =
      /^([\-+]?)P([\-+]?[0-9]+D)?(?:T([\-+]?[0-9]+H)?([\-+]?[0-9]+M)?([\-+]?[0-9]+(?:[\.,]?[0-9]+)?S)?)?$/i
        .exec(isoExt);

    if (parsedParts) {
      const [, signStr, dStr, hStr, mStr, sStr] = parsedParts;
      const isNegative = signStr === "-";
      const dInt = dStr
        ? SafeIntegerFormat.parse(dStr, _dFormatOptions)
        : NumberEx.ZERO;
      const hInt = hStr
        ? SafeIntegerFormat.parse(hStr, _hFormatOptions)
        : NumberEx.ZERO;
      const mInt = mStr
        ? SafeIntegerFormat.parse(mStr, _mFormatOptions)
        : NumberEx.ZERO;
      const sInt = sStr ? _parseS(sStr) : NumberEx.ZERO;

      const absTotalMillis = Duration.daysToMilliseconds(dInt) +
        Duration.hoursToMilliseconds(hInt) +
        Duration.minutesToMilliseconds(mInt) +
        Duration.secondsToMilliseconds(sInt);

      return new Duration(
        (isNegative === true) ? -absTotalMillis : absTotalMillis,
      );
    }
    throw new RangeError("isoExt");
  }

  toString(options: Duration.StringOptions = {}): string {
    const absTotalMillis = Math.abs(this.#milliseconds);

    const dInt = (absTotalMillis >= Duration.DAY)
      ? Math.trunc(Duration.millisecondsToDays(absTotalMillis))
      : 0;
    const hInt = (absTotalMillis >= Duration.HOUR)
      ? Math.trunc(Duration.millisecondsToHours(absTotalMillis))
      : 0;
    const mInt = (absTotalMillis >= Duration.MINUTE)
      ? Math.trunc(Duration.millisecondsToMinutes(absTotalMillis))
      : 0;
    const sInt = (absTotalMillis >= Duration.SECOND)
      ? Math.trunc(Duration.millisecondsToSeconds(absTotalMillis))
      : 0;

    const pattern = _normalizePattern(options.pattern);
    const patternIsAuto = pattern === Duration.StringPattern.AUTO;
    const patternIsDay =
      pattern === Duration.StringPattern.DAY_HOUR_MINUTE_SECOND;
    const patternIsHour = pattern === Duration.StringPattern.HOUR_MINUTE_SECOND;
    const patternIsMinute = pattern === Duration.StringPattern.MINUTE_SECOND;

    let result = StringEx.EMPTY;

    if (patternIsDay || (patternIsAuto && (dInt > 0))) {
      result = result + _dayToString(dInt);
    }

    result = result + "T";

    if (patternIsDay || patternIsHour || (patternIsAuto && (hInt > 0))) {
      result = result +
        _hourToString(hInt, patternIsDay || (patternIsAuto && (dInt > 0)));
    }

    if (
      patternIsDay || patternIsHour || patternIsMinute ||
      (patternIsAuto && (mInt > 0))
    ) {
      result = result +
        _minuteToString(
          mInt,
          patternIsDay || patternIsHour || (patternIsAuto && (hInt > 0)),
        );
    }

    result = result + _secondToString(
      sInt,
      patternIsDay || patternIsHour || patternIsMinute ||
        (patternIsAuto && (mInt > 0)),
      absTotalMillis,
      options.secondFractionDigits,
    );

    // 負の値であっても、0に丸まられた場合は符号なしとする
    let sign = StringEx.EMPTY;
    if (this.isNegative() && /[1-9]/.test(result)) {
      sign = "-";
    }

    return `${sign}P${result}`;
  }

  valueOf(): number {
    return this.#milliseconds;
  }
}

const _dFormatOptions = SafeIntegerFormat.Options.resolve({ suffix: "D" });
const _hFormatOptions = SafeIntegerFormat.Options.resolve({ suffix: "H" });
const _mFormatOptions = SafeIntegerFormat.Options.resolve({ suffix: "M" });

export namespace Duration {
  export const MILLISECOND = 1;

  export const SECOND = 1_000;

  export const MINUTE = 60_000;

  export const HOUR = 3_600_000;

  export const DAY = 86_400_000;

  export function millisecondsToSeconds(milliseconds: number): number {
    if (Number.isFinite(milliseconds) !== true) {
      throw new TypeError("milliseconds");
    }
    return NumberEx.normalizeNumber(milliseconds / Duration.SECOND);
  }

  export function secondsToMilliseconds(seconds: number): number {
    if (Number.isFinite(seconds) !== true) {
      throw new TypeError("seconds");
    }
    return NumberEx.normalizeNumber(seconds * Duration.SECOND);
  }

  export function millisecondsToMinutes(milliseconds: number): number {
    if (Number.isFinite(milliseconds) !== true) {
      throw new TypeError("milliseconds");
    }
    return NumberEx.normalizeNumber(milliseconds / Duration.MINUTE);
  }

  export function minutesToMilliseconds(minutes: number): number {
    if (Number.isFinite(minutes) !== true) {
      throw new TypeError("minutes");
    }
    return NumberEx.normalizeNumber(minutes * Duration.MINUTE);
  }

  export function millisecondsToHours(milliseconds: number): number {
    if (Number.isFinite(milliseconds) !== true) {
      throw new TypeError("milliseconds");
    }
    return NumberEx.normalizeNumber(milliseconds / Duration.HOUR);
  }

  export function hoursToMilliseconds(hours: number): number {
    if (Number.isFinite(hours) !== true) {
      throw new TypeError("hours");
    }
    return NumberEx.normalizeNumber(hours * Duration.HOUR);
  }

  export function millisecondsToDays(milliseconds: number): number {
    if (Number.isFinite(milliseconds) !== true) {
      throw new TypeError("milliseconds");
    }
    return NumberEx.normalizeNumber(milliseconds / Duration.DAY);
  }

  export function daysToMilliseconds(days: number): number {
    if (Number.isFinite(days) !== true) {
      throw new TypeError("days");
    }
    return NumberEx.normalizeNumber(days * Duration.DAY);
  }

  export const StringPattern = {
    AUTO: "auto",
    DAY_HOUR_MINUTE_SECOND: "dayHourMinuteSecond",
    HOUR_MINUTE_SECOND: "hourMinuteSecond",
    MINUTE_SECOND: "minuteSecond",
    SECOND: "second",
  } as const;
  export type StringPattern = typeof StringPattern[keyof typeof StringPattern];

  export const ZERO = 0;

  export type StringOptions = {
    pattern?: StringPattern;
    secondFractionDigits?: StringOptions.SecondFractionDigits;
    //TODO style : "iso8601ext" | ...;
  };

  export namespace StringOptions {
    //TODO Precision : auto | day | hour | minute | second

    export type SecondFractionDigits = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }

  //TODO millisecondsToString

  //TODO stringToMilliseconds
}

function _normalizePattern(pattern: unknown): Duration.StringPattern {
  if (
    Object.values(Duration.StringPattern).includes(
      pattern as Duration.StringPattern,
    )
  ) {
    return pattern as Duration.StringPattern;
  }
  return Duration.StringPattern.AUTO;
}

function _dayToString(dInt: SafeInteger): string {
  return `${dInt}D`;
}

function _hourToString(hInt: SafeInteger, isHead: boolean): string {
  const hIntStr = (isHead === true)
    ? `${hInt % 24}`.padStart(2, "0")
    : `${hInt}`;
  return `${hIntStr}H`;
}

function _minuteToString(mInt: SafeInteger, isHead: boolean): string {
  const mIntStr = (isHead === true)
    ? `${mInt % 60}`.padStart(2, "0")
    : `${mInt}`;
  return `${mIntStr}M`;
}

function _secondToString(
  sInt: SafeInteger,
  isHead: boolean,
  totalMillis: number,
  fractionDigits?: Duration.StringOptions.SecondFractionDigits,
): string {
  const sIntStr = (isHead === true)
    ? `${sInt % 60}`.padStart(2, "0")
    : `${sInt}`;

  const normalizedFractionDigits = SafeInteger.fromNumber(
    fractionDigits,
    {
      fallback: 0,
      roundingMode: RoundingMode.TRUNCATE,
      clampRange: [0, 6],
    },
  );

  if (normalizedFractionDigits <= 0) {
    return `${sIntStr}S`;
  }

  // ミリ秒の小数部3桁（4桁目以降は切り捨て）までを取得
  let totalMsStr = totalMillis.toFixed(4);
  totalMsStr = totalMsStr.substring(0, totalMsStr.length - 1);

  // ミリ秒の整数部3桁と小数部3桁を取得
  const strMinLen = 7;
  if (totalMsStr.length < strMinLen) {
    totalMsStr = totalMsStr.padStart(strMinLen, "0");
  }

  const sFractionStr = totalMsStr.slice(-7).replace(".", StringEx.EMPTY)
    .substring(0, normalizedFractionDigits);
  return `${sIntStr}.${sFractionStr}S`;
}

//TODO 外に出す NumberFormatとか
function _parseS(s: string): number {
  const unitRemoved = s.slice(0, -1);
  const f = Number.parseFloat(unitRemoved.replace(",", "."));
  return (f === 0) ? 0 : f; // -0は0にする
}
