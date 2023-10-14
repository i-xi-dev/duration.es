import { StringUtils } from "../deps.ts";

type Duration = number;

// const _MILLISECOND = 1;
const _SECOND = 1000;
const _MINUTE = 60000;
const _HOUR = 3600000;
const _DAY = 86400000;

function _secondsToMillis(seconds: number): Duration {
  return seconds * _SECOND;
}

function _minutesToMillis(minutes: number): Duration {
  return minutes * _MINUTE;
}

function _hoursToMillis(hours: number): Duration {
  return hours * _HOUR;
}

function _daysToMillis(days: number): Duration {
  return days * _DAY;
}

function _millisToSeconds(millis: Duration): number {
  return millis / _SECOND;
}

function _millisToMinutes(millis: Duration): number {
  return millis / _MINUTE;
}

function _millisToHours(millis: Duration): number {
  return millis / _HOUR;
}

function _millisToDays(millis: Duration): number {
  return millis / _DAY;
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

  export function isNegative(milliseconds: Duration): boolean {
    return (milliseconds < 0);
  }

  /**
   * @param isoExt - java.time における ISO 8601 の拡張構文を受け付ける
   */
  export function fromString(isoExt: string): Duration {
    if (StringUtils.isNonEmptyString(isoExt) !== true) {
      throw new TypeError("isoExt");
    }
    //XXX trimするか？

    const parsed =
      /^([\-+]?)P([\-+]?[0-9]+D)(?:T([\-+]?[0-9]+H)([\-+]?[0-9]+M)([\-+]?[0-9]+(?:[\.,]?[0-9]+)S))$/i
        .exec(isoExt);

    if (parsed) {
      const [, dStr, hStr, mStr, sStr] = parsed;
      const d = dStr ? Number.parseInt(dStr, 10) : 0;
      const h = hStr ? Number.parseInt(hStr, 10) : 0;
      const m = mStr ? Number.parseInt(mStr, 10) : 0;
      const s = sStr ? Number.parseFloat(sStr) : 0;

      return _daysToMillis(d) + _hoursToMillis(h) + _minutesToMillis(m) +
        _secondsToMillis(s);
    }
    throw new RangeError("isoExt");
  }

  //TODO toString(milliseconds: Duration, options?: ToStringOptions): string
}

export { Duration };
