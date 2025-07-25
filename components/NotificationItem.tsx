import { useState } from "react";
import { Text, View, Pressable, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { getTimeFromNow } from "@/utils/relativeTime";
import axiosInstance from "@/api/axiosInstance";
import expoSpeech from "@/utils/speech/expoSpeech";
import { useNotification } from "@/contexts/NotificationContext";

interface Props {
  content: string;
  isRead: boolean;
  createAt: Date;
  notificationId: string;
  speechSettings: {
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null;
}

const NotificationItem = ({
  content,
  isRead,
  createAt,
  notificationId,
  speechSettings,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { notification, setNotification } = useNotification();

  const [itemIsRead, setItemIsRead] = useState<boolean>(isRead);
  const toggleExpand = () => setExpanded(!expanded);

  const handleSetRead = async (): Promise<void> => {
    speechSettings && expoSpeech(content, speechSettings);

    try {
      if (notificationId && !itemIsRead) {
        await axiosInstance.put(`/notifications/${notificationId}`, {
          is_read: true,
        });

        setItemIsRead(true);
        if (notification) {
          setNotification({
            ...notification,
            unread: notification.unread - 1,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={() => handleSetRead()}>
      <View
        accessibilityLabel="content"
        className={`${
          itemIsRead ? "bg-white" : "bg-[#5ce1e6]"
        } overflow-hidden w-full`}
      >
        <BlurView
          intensity={itemIsRead ? 200 : 100}
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
    </TouchableOpacity>
  );
};

export default NotificationItem;
