import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/vi"; // nạp ngôn ngữ tiếng Việt

dayjs.extend(relativeTime);
dayjs.locale("vi"); // thiết lập ngôn ngữ tiếng Việt

export const getTimeFromNow = (createdAt: Date) => {
  return dayjs(createdAt).fromNow(); // Ví dụ: "5 phút trước", "3 giờ trước"
};
