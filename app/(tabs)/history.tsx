import { ScrollView, Switch, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import HeardItem from "@/components/HeardItem";
import CustomSwitchLabelLarge from "@/components/CustomSwitchLabelLarge";
import { useRouter } from "expo-router";
import HistoryView from "@/components/HistoryView";

const History = () => {
  const router = useRouter();
  const [savedScreen, setSavedScreen] = useState<boolean>(false);
  const onChangeScreen = (state: boolean) => {
    setSavedScreen(state);
  };

  return (
    <LayoutScreen>
      <BlurLayout>
        <View>
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
            <HistoryView />
          </ScrollView>
        )}
      </BlurLayout>
    </LayoutScreen>
  );
};

export default History;
