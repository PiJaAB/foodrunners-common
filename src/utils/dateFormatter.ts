const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Stockholm',
  formatMatcher: 'basic',
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
  hour12: false,
});

export default dateFormatter;
