import axiosInstance from "@/api/axiosInstance";
import BlurLayout from "@/components/BlurLayout";
import Header from "@/components/Header";
import LayoutScreen from "@/components/LayoutScreen";
import NotificationItem from "@/components/NotificationItem";
import { useUser } from "@/contexts/UserContext";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import { BlurView } from "expo-blur";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from "../LoadingScreen";
import { useNotification } from "@/contexts/NotificationContext";
import { useFocusEffect } from "expo-router";
import { loadSpeechSettings } from "@/utils/speech/speechSettings";
import * as Speech from "expo-speech";

const Notification = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [speechSettings, setSpeechSettings] = useState<{
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null>(null);

  const [moreBtnDisplay, setMoreBtnDisplay] = useState<boolean>(false);
  const { notification } = useNotification();
  const [notifications, setNotifications] = useState<
    | {
        id: string;
        user_id: string;
        message: string;
        is_read: boolean;
        created_at: Date;
      }[]
    | null
  >(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  useFocusEffect(
    useCallback(() => {
      const loadSpeechSetting = async (): Promise<void> => {
        const getSetting = await loadSpeechSettings();
        setSpeechSettings(getSetting);
        Speech.stop();
      };

      loadSpeechSetting();

      // Optional cleanup nếu cần
      return () => {};
    }, [])
  );

  useEffect(() => {
    const getNotifications = async (): Promise<void> => {
      setLoading(true);

      try {
        if (user) {
          await axiosInstance
            .get(
              `/notifications/user/${user.id}?offset=${offset}&limit=${limit}`
            )
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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, [user, offset]);

  const loadSeeMore = () => {
    setOffset((prev) => (prev += 10));
  };

  useEffect(() => {
    if (notification?.total != null && Array.isArray(notifications)) {
      if (notifications.length >= notification.total) {
        setMoreBtnDisplay(false);
      } else {
        setMoreBtnDisplay(true);
      }
    }
  }, [notification, notifications]);

  if (loading) return <LoadingScreen />;

  return (
    <LayoutScreen>
      <Header screenType="Màn hình thông báo" />

      <BlurLayout>
        {notification?.unread !== 0 && (
          <Text
            className="text-[16px] text-secondary"
            accessibilityLabel={`Có ${notification?.unread} thông báo chưa đọc`}
          >
            Có {notification?.unread} thông báo chưa đọc
          </Text>
        )}

        <View className="mt-2">
          {notifications?.length !== 0 ? (
            notifications?.map((noti) => (
              <NotificationItem
                key={noti?.id}
                content={noti.message || "Không có nội dung"}
                isRead={noti.is_read}
                createAt={noti.created_at}
                notificationId={noti?.id}
                speechSettings={speechSettings}
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
      </BlurLayout>
    </LayoutScreen>
  );
};

export default Notification;
