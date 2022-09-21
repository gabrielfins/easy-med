export function formatDate(date: string): string {
  const dt = new Date(date);
  const day = dt.getDay().toString().length === 1 ? '0' + dt.getDay() : dt.getDay();
  const month = (dt.getMonth() + 1).toString().length === 1 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
  const year = dt.getFullYear();
  const hours = dt.getHours().toString().length === 1 ? '0' + dt.getHours() : dt.getHours();
  const minutes = dt.getMinutes().toString().length === 1 ? '0' + dt.getMinutes() : dt.getMinutes();
  return `${day}/${month}/${year} • ${hours}:${minutes}`;
}
