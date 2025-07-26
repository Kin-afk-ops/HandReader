import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import SaveView from "@/components/SaveView";
import CustomSwitchLabelLarge from "@/components/CustomSwitchLabelLarge";
import { useRouter } from "expo-router";
import HistoryView from "@/components/HistoryView";
import Header from "@/components/Header";
import axiosInstance from "@/api/axiosInstance";
import { useUser } from "@/contexts/UserContext";
import LoadingScreen from "../LoadingScreen";

const History = () => {
  const [savedScreen, setSavedScreen] = useState<boolean>(false);

  const onChangeScreen = (state: boolean) => {
    setSavedScreen(state);
  };

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

        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          className="mt-4"
        >
          {savedScreen ? <SaveView /> : <HistoryView />}
        </ScrollView>
      </BlurLayout>
    </LayoutScreen>
  );
};

export default History;
