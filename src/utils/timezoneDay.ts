export function StartOfDay(
  dateStr: string,
  timeZone = 'Europe/Stockholm',
): Date {
  const utcDate = new Date(
    Date.UTC(
      ...(dateStr
        .split('-')
        .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)) as [
        number,
        number,
        number,
      ]),
    ),
  );
  const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    formatMatcher: 'basic',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour12: false,
  });
  const timeFormatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    formatMatcher: 'basic',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const utcOffsetDate = new Date(
    Date.UTC(
      ...([
        ...(dateFormatter
          .format(utcDate)
          .split('-')
          .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)) as [
          number,
          number,
          number,
        ]),
        ...(timeFormatter
          .format(utcDate)
          .split(':')
          .map((n) => Number.parseInt(n, 10)) as [number, number]),
      ] as const),
    ),
  );
  return new Date(utcDate.getTime() * 2 - utcOffsetDate.getTime());
}

export function EndOfDay(dateStr: string, timeZone = 'Europe/Stockholm'): Date {
  const utcDate = new Date(
    Date.UTC(
      ...([
        ...(dateStr
          .split('-')
          .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)) as [
          number,
          number,
          number,
        ]),
        23,
        59,
        59,
      ] as const),
    ),
  );
  const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    formatMatcher: 'basic',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour12: false,
  });
  const timeFormatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    formatMatcher: 'basic',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const utcOffsetDate = new Date(
    Date.UTC(
      ...([
        ...(dateFormatter
          .format(utcDate)
          .split('-')
          .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)) as [
          number,
          number,
          number,
        ]),
        ...(timeFormatter
          .format(utcDate)
          .split(':')
          .map((n) => Number.parseInt(n, 10)) as [number, number]),
        59,
      ] as const),
    ),
  );
  return new Date(utcDate.getTime() * 2 - utcOffsetDate.getTime());
}
