import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { getTimeFromNow } from "@/utils/relativeTime";

interface Props {
  content: string;
  isRead: boolean;
  createAt: Date;
}

const NotificationItem = ({ content, isRead, createAt }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <View
      accessibilityLabel="content"
      className={`${
        isRead ? "bg-white" : "bg-[#5ce1e6]"
      } overflow-hidden w-full`}
    >
      <BlurView
        intensity={isRead ? 200 : 100}
        tint="light"
        className="w-full px-4 py-4"
      >
        <Text
          className="text-secondary"
          numberOfLines={expanded ? undefined : 3}
        >
          {content}
        </Text>
        {content.split(" ").length > 20 && ( // Nếu dài thì mới hiển thị nút
          <Pressable onPress={toggleExpand}>
            <Text className="text-blue-600 mt-2">
              {expanded ? "Ẩn bớt" : "Hiển thị thêm"}
            </Text>
          </Pressable>
        )}

        <Text className="text-[12px] text-[#555]">
          {getTimeFromNow(createAt)}
        </Text>
      </BlurView>
    </View>
  );
};

export default NotificationItem;
