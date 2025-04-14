export function getDateHour(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const moth = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();

  const hour = now.getHours().toString().padStart(2, '0');
  const min = now.getMinutes().toString().padStart(2, '0');

  return `${day}/${moth}/${year}-${hour}:${min}`;
}
