function formatVietnameseDocumentDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) return "";

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Văn bản ${hours} giờ ${minutes} phút ngày ${day} tháng ${month} năm ${year}`;
}

export default formatVietnameseDocumentDate;
