import { NumberEx, SafeIntegerFormat, StringEx } from "../deps.ts";

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

  //TODO toString(milliseconds: Duration, options?: ToStringOptions): string
}

//TODO 外に出す NumberFormatとか
function _parseS(s: string): number {
  const unitRemoved = s.slice(0, -1);
  const f = Number.parseFloat(unitRemoved.replace(",", "."));
  return (f === 0) ? 0 : f; // -0は0にする
}
