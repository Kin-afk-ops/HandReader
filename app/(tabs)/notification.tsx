import axiosInstance from "@/api/axiosInstance";
import BlurLayout from "@/components/BlurLayout";
import Header from "@/components/Header";
import LayoutScreen from "@/components/LayoutScreen";
import NotificationItem from "@/components/NotificationItem";
import { useUser } from "@/contexts/UserContext";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Notification = () => {
  const { user } = useUser();
  const [moreBtnDisplay, setMoreBtnDisplay] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<
    | {
        id: string;
        user_id: string;
        is_read: boolean;
        message: string;
        created_at: Date;
      }[]
    | null
  >(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  useEffect(() => {
    const getNotifications = async (): Promise<void> => {
      if (user) {
        await axiosInstance
          .get(`/notifications/user/${user.id}?offset=${offset}&limit=${limit}`)
          .then((res) => {
            const newNotifications = res.data;
            setNotifications((prev) => [
              ...(prev ?? []), // giữ lại thông báo cũ (nếu null thì dùng [])
              ...newNotifications, // thêm các thông báo mới
            ]);
          })
          .catch((error) => {
            console.log(error);
            setMoreBtnDisplay(false);
          });
        console.log("load");
      }
    };
    getNotifications();
  }, [user, offset]);

  const loadSeeMore = () => {
    setOffset((prev) => (prev += 10));
  };

  return (
    <LayoutScreen>
      <Header screenType="Màn hình thông báo" />

      <BlurLayout>
        <Text
          className="text-[16px] text-secondary"
          accessibilityLabel="QCó 10 thông báo chưa đọc"
        >
          Có 10 thông báo chưa đọc
        </Text>
        <View className="mt-2">
          {notifications?.length !== 0 ? (
            notifications?.map((noti) => (
              <NotificationItem
                key={noti?.id}
                content={noti.message || "Không có nội dung"}
                isRead={noti.is_read}
                createAt={noti.created_at}
              />
            ))
          ) : (
            <View>
              <Text>Không có thông báo</Text>
            </View>
          )}
        </View>

        {moreBtnDisplay && (
          <TouchableOpacity
            onPress={loadSeeMore}
            className="mt-4 px-4 py-2 bg-blue-500 rounded-lg items-center"
          >
            <Text className="text-white font-semibold text-base">
              Xem thông báo trước đó
            </Text>
          </TouchableOpacity>
        )}

        {/* <NotificationItem
          content="
Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatibus libero eveniet animi sit sed, amet perferendis, natus tempora itaque quia obcaecati assumenda nisi? Porro quaerat velit voluptatem laborum repudiandae!
"
          isRead={false}
        /> */}
      </BlurLayout>
    </LayoutScreen>
  );
};

export default Notification;
