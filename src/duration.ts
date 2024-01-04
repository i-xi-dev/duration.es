import { SafeInteger, StringEx } from "../deps.ts";

type Duration = number;

// const _MILLISECOND = 1;
const _SECOND = 1000;
const _MINUTE = 60000;
const _HOUR = 3600000;
const _DAY = 86400000;

function _n(n: number): number {
  return (n === 0) ? 0 : n;
}

function _secondsToMillis(seconds: number): Duration {
  return _n(seconds * _SECOND);
}

function _minutesToMillis(minutes: number): Duration {
  return _n(minutes * _MINUTE);
}

function _hoursToMillis(hours: number): Duration {
  return _n(hours * _HOUR);
}

function _daysToMillis(days: number): Duration {
  return _n(days * _DAY);
}

function _millisToSeconds(millis: Duration): number {
  return _n(millis / _SECOND);
}

function _millisToMinutes(millis: Duration): number {
  return _n(millis / _MINUTE);
}

function _millisToHours(millis: Duration): number {
  return _n(millis / _HOUR);
}

function _millisToDays(millis: Duration): number {
  return _n(millis / _DAY);
}

namespace Duration {
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
      const d = dStr ? _parsePart(dStr, "D") : 0;
      const h = hStr ? _parsePart(hStr, "H") : 0;
      const m = mStr ? _parsePart(mStr, "M") : 0;
      const s = sStr ? _parsePart(sStr, "S") : 0;

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
function _parsePart(s: string, type: string): number {
  const unitRemoved = s.slice(0, -1);
  if (type === "S") {
    const f = Number.parseFloat(unitRemoved.replace(",", "."));
    return (f === 0) ? 0 : f; // -0は0にする
  } else {
    return SafeInteger.fromString(unitRemoved, {
      fallback: 0,
    });
  }
}

export { Duration };
