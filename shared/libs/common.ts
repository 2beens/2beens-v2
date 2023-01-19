export function getTimestampString(date: Date) {
  const hourInfo =
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2);

  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const dateInfo =
    ('0' + d).slice(-2) + '/' + ('0' + (m + 1)).slice(-2) + '/' + y;

  return dateInfo + ' ' + hourInfo;
}
