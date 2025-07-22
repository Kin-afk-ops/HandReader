/**
 * Tạo tên user tự động theo định dạng: user + YYYYMMDDHHMMSS
 */
export function generateAutoUsername(): string {
  const now = new Date();

  const pad2 = (n: number) => n.toString().padStart(2, "0");

  const year = now.getFullYear();
  const month = pad2(now.getMonth() + 1); // Tháng (0–11)
  const day = pad2(now.getDate());
  const hour = pad2(now.getHours());
  const minute = pad2(now.getMinutes());
  const second = pad2(now.getSeconds());

  return `user${year}${month}${day}${hour}${minute}${second}`;
}
