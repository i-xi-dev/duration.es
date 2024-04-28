import {
  NumberEx,
  RoundingMode,
  SafeInteger,
  SafeIntegerFormat,
  StringEx,
} from "../deps.ts";

export type Duration = number;

// const _MILLISECOND = 1;
const _SECOND = 1_000;
const _MINUTE = 60_000;
const _HOUR = 3_600_000;
const _DAY = 86_400_000;

function _secondsToMillis(seconds: number): Duration {
  return NumberEx.normalizeNumber(seconds * _SECOND);
}

function _minutesToMillis(minutes: number): Duration {
  return NumberEx.normalizeNumber(minutes * _MINUTE);
}

function _hoursToMillis(hours: number): Duration {
  return NumberEx.normalizeNumber(hours * _HOUR);
}

function _daysToMillis(days: number): Duration {
  return NumberEx.normalizeNumber(days * _DAY);
}

function _millisToSeconds(millis: Duration): number {
  return NumberEx.normalizeNumber(millis / _SECOND);
}

function _millisToMinutes(millis: Duration): number {
  return NumberEx.normalizeNumber(millis / _MINUTE);
}

function _millisToHours(millis: Duration): number {
  return NumberEx.normalizeNumber(millis / _HOUR);
}

function _millisToDays(millis: Duration): number {
  return NumberEx.normalizeNumber(millis / _DAY);
}

const _dFormatOptions = SafeIntegerFormat.Options.resolve({ suffix: "D" });
const _hFormatOptions = SafeIntegerFormat.Options.resolve({ suffix: "H" });
const _mFormatOptions = SafeIntegerFormat.Options.resolve({ suffix: "M" });

export namespace Duration {
  export const ZERO = 0;

  export function ofSeconds(seconds: number): Duration {
    if (Number.isFinite(seconds)) {
      return _secondsToMillis(seconds);
    }
    throw new TypeError("seconds");
  }

  export function toSeconds(milliseconds: Duration): number {
    if (Number.isFinite(milliseconds)) {
      return _millisToSeconds(milliseconds);
    }
    throw new TypeError("milliseconds");
  }

  export function ofMinutes(minutes: number): Duration {
    if (Number.isFinite(minutes)) {
      return _minutesToMillis(minutes);
    }
    throw new TypeError("minutes");
  }

  export function toMinutes(milliseconds: Duration): number {
    if (Number.isFinite(milliseconds)) {
      return _millisToMinutes(milliseconds);
    }
    throw new TypeError("milliseconds");
  }

  export function ofHours(hours: number): Duration {
    if (Number.isFinite(hours)) {
      return _hoursToMillis(hours);
    }
    throw new TypeError("hours");
  }

  export function toHours(milliseconds: Duration): number {
    if (Number.isFinite(milliseconds)) {
      return _millisToHours(milliseconds);
    }
    throw new TypeError("milliseconds");
  }

  export function ofDays(days: number): Duration {
    if (Number.isFinite(days)) {
      return _daysToMillis(days);
    }
    throw new TypeError("days");
  }

  export function toDays(milliseconds: Duration): number {
    if (Number.isFinite(milliseconds)) {
      return _millisToDays(milliseconds);
    }
    throw new TypeError("milliseconds");
  }

  // export function isNegative(milliseconds: Duration): boolean {
  //   return (milliseconds < 0);
  // }

  /**
   * @param isoExt - java.time における ISO 8601 の拡張構文を受け付ける
   */
  export function fromString(isoExt: string): Duration {
    if (StringEx.isNonEmptyString(isoExt) !== true) {
      throw new TypeError("isoExt");
    }
    //XXX trimするか？

    const parsed =
      /^([\-+]?)P([\-+]?[0-9]+D)?(?:T([\-+]?[0-9]+H)?([\-+]?[0-9]+M)?([\-+]?[0-9]+(?:[\.,]?[0-9]+)?S)?)?$/i
        .exec(isoExt);

    if (parsed) {
      const [, signStr, dStr, hStr, mStr, sStr] = parsed;
      const isNegative = signStr === "-";
      const d = dStr ? SafeIntegerFormat.parse(dStr, _dFormatOptions) : 0;
      const h = hStr ? SafeIntegerFormat.parse(hStr, _hFormatOptions) : 0;
      const m = mStr ? SafeIntegerFormat.parse(mStr, _mFormatOptions) : 0;
      const s = sStr ? _parseS(sStr) : 0;

      const absTotal = _daysToMillis(d) + _hoursToMillis(h) +
        _minutesToMillis(m) +
        _secondsToMillis(s);

      return (isNegative === true) ? -absTotal : absTotal;
    }
    throw new RangeError("isoExt");
  }

  export type StringOptions = {
    pattern?: StringOptions.Pattern;
    secondFractionDigits?: StringOptions.SecondFractionDigits;
    //TODO style : "iso8601ext" | ...;
  };

  export namespace StringOptions {
    export const Pattern = {
      AUTO: "auto",
      DAY_HOUR_MINUTE_SECOND: "dayHourMinuteSecond",
      HOUR_MINUTE_SECOND: "hourMinuteSecond",
      MINUTE_SECOND: "minuteSecond",
      SECOND: "second",
    } as const;
    export type Pattern = typeof Pattern[keyof typeof Pattern];

    //TODO Precision : auto | day | hour | minute | second

    export type SecondFractionDigits = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }

  export function toString(
    milliseconds: Duration,
    options: StringOptions = {},
  ): string {
    if (Number.isFinite(milliseconds) != true) {
      throw new TypeError("milliseconds");
    }

    const isNegative = milliseconds < 0;
    const absMs = Math.abs(milliseconds);

    const dInt = (absMs >= _DAY) ? Math.trunc(toDays(absMs)) : 0;
    const hInt = (absMs >= _HOUR) ? Math.trunc(toHours(absMs)) : 0;
    const mInt = (absMs >= _MINUTE) ? Math.trunc(toMinutes(absMs)) : 0;
    const sInt = (absMs >= _SECOND) ? Math.trunc(toSeconds(absMs)) : 0;

    const pattern = _normalizePattern(options.pattern);
    const patternIsAuto = pattern === StringOptions.Pattern.AUTO;
    const patternIsDay =
      pattern === StringOptions.Pattern.DAY_HOUR_MINUTE_SECOND;
    const patternIsHour = pattern === StringOptions.Pattern.HOUR_MINUTE_SECOND;
    const patternIsMinute = pattern === StringOptions.Pattern.MINUTE_SECOND;

    let result = StringEx.EMPTY;

    if (patternIsDay || (patternIsAuto && (dInt > 0))) {
      result = result + _toDayString(dInt);
    }

    result = result + "T";

    if (patternIsDay || patternIsHour || (patternIsAuto && (hInt > 0))) {
      result = result +
        _toHourString(hInt, patternIsDay || (patternIsAuto && (dInt > 0)));
    }

    if (
      patternIsDay || patternIsHour || patternIsMinute ||
      (patternIsAuto && (mInt > 0))
    ) {
      result = result +
        _toMinuteString(
          mInt,
          patternIsDay || patternIsHour || (patternIsAuto && (hInt > 0)),
        );
    }

    result = result + _toSecondString(
      sInt,
      patternIsDay || patternIsHour || patternIsMinute ||
        (patternIsAuto && (mInt > 0)),
      absMs,
      options.secondFractionDigits,
    );

    // 負の値であっても、0に丸まられた場合は符号なしとする
    let sign = StringEx.EMPTY;
    if (isNegative && /[1-9]/.test(result)) {
      sign = "-";
    }

    return `${sign}P${result}`;
  }
}

function _toDayString(dInt: SafeInteger): string {
  return `${dInt}D`;
}

function _toHourString(hInt: SafeInteger, isHead: boolean): string {
  const hIntStr = (isHead === true)
    ? `${hInt % 24}`.padStart(2, "0")
    : `${hInt}`;
  return `${hIntStr}H`;
}

function _toMinuteString(mInt: SafeInteger, isHead: boolean): string {
  const mIntStr = (isHead === true)
    ? `${mInt % 60}`.padStart(2, "0")
    : `${mInt}`;
  return `${mIntStr}M`;
}

function _toSecondString(
  sInt: SafeInteger,
  isHead: boolean,
  totalMs: Duration,
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
  let totalMsStr = totalMs.toFixed(4);
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

function _normalizePattern(pattern: unknown): Duration.StringOptions.Pattern {
  if (
    Object.values(Duration.StringOptions.Pattern).includes(
      pattern as Duration.StringOptions.Pattern,
    )
  ) {
    return pattern as Duration.StringOptions.Pattern;
  }
  return Duration.StringOptions.Pattern.AUTO;
}

//TODO 外に出す NumberFormatとか
function _parseS(s: string): number {
  const unitRemoved = s.slice(0, -1);
  const f = Number.parseFloat(unitRemoved.replace(",", "."));
  return (f === 0) ? 0 : f; // -0は0にする
}
