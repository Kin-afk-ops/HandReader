import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import HeardItem from "@/components/HeardItem";
import CustomSwitchLabelLarge from "@/components/CustomSwitchLabelLarge";
import { useRouter } from "expo-router";
import HistoryView from "@/components/HistoryView";
import Header from "@/components/Header";
import axiosInstance from "@/api/axiosInstance";
import { useUser } from "@/contexts/UserContext";
import LoadingScreen from "../LoadingScreen";

const History = () => {
  const router = useRouter();
  const { user } = useUser();
  const [savedScreen, setSavedScreen] = useState<boolean>(false);
  const [moreBtnDisplay, setMoreBtnDisplay] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;
  const [totalHistories, setTotalHistories] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [histories, setHistories] = useState<
    | {
        id: string;
        user_id: string;
        result_id: string;
        viewed_at: string;
        is_saved_by_user: boolean;
        recognized_text: string;
        confidence: number;
        created_at: string;
      }[]
    | null
  >(null);
  const onChangeScreen = (state: boolean) => {
    setSavedScreen(state);
  };

  useEffect(() => {
    const getHistories = async () => {
      setLoading(true);
      try {
        if (user) {
          const res = await axiosInstance.get(
            `/histories/userId/${user.id}?offset=${offset}&limit=${limit}`
          );
          setHistories(res.data);

          const resTotalHistories = await axiosInstance.get(
            `/histories/length/${user.id}`
          );
          setTotalHistories(resTotalHistories.data.total);
        }
      } catch (error) {
        console.log(error);
        setMoreBtnDisplay(false);
      } finally {
        setLoading(false);
      }
    };

    getHistories();
  }, [user, offset]);

  const loadSeeMore = () => {
    setOffset((prev) => (prev += 10));
  };

  useEffect(() => {
    if (totalHistories != null && Array.isArray(histories)) {
      if (histories.length >= totalHistories) {
        setMoreBtnDisplay(false);
      } else {
        setMoreBtnDisplay(true);
      }
    }
  }, [totalHistories, histories]);

  if (loading) return <LoadingScreen />;

  return (
    <LayoutScreen>
      <Header
        screenType={
          savedScreen ? "Màn hình văn bản đã lưu" : "Màn hình lịch sử văn bản"
        }
      />
      <BlurLayout>
        <View
          accessibilityLabel={
            savedScreen
              ? "Đang hiển thị văn bản đã lưu"
              : "Đang hiển thị lịch sử văn bản"
          }
        >
          <CustomSwitchLabelLarge
            label1="Lịch sử"
            label2="Đã lưu"
            onToggle={onChangeScreen}
          />
        </View>

        {savedScreen ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            className="mt-4"
          >
            <HeardItem />
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            className="mt-4"
          >
            <HistoryView histories={histories} />
          </ScrollView>
        )}

        {moreBtnDisplay && (
          <TouchableOpacity
            onPress={loadSeeMore}
            className="mt-4 px-4 py-2 bg-blue-500 rounded-lg items-center"
          >
            <Text className="text-white font-semibold text-base">
              Xem {savedScreen ? "Đã lưu " : "Lịch sử"} trước đó
            </Text>
          </TouchableOpacity>
        )}
      </BlurLayout>
    </LayoutScreen>
  );
};

export default History;
