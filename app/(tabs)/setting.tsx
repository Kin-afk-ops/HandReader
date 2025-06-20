import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import SpeedSlider from "@/components/SpeedSlider";
import CustomSwitchLabelSmall from "@/components/CustomSwitchLabelSmall";
import SupportBlock from "@/components/SupportBlock";

const Setting = () => {
  const [speedValue, setSpeedValue] = useState<number>(1);
  const onChangeVoiceGender = (state: boolean): void => {};

  return (
    <LayoutScreen>
      <View className="relative">
        <BlurLayout>
          <View className="bg-white w-full px-4 py-4 rounded-[10px]">
            <Text className="text-secondary text-xl">Tốc độ đọc văn bản</Text>
            <SpeedSlider
              speedValue={speedValue}
              setSpeedValue={setSpeedValue}
            />
          </View>

          <View className="bg-white w-full px-4 py-4 rounded-[10px] mt-8 flex-row items-center">
            <Text className="text-secondary text-xl w-[60%]">
              Chọn giọng đọc
            </Text>
            <View className="w-[40%]">
              <CustomSwitchLabelSmall
                label1="Nam"
                label2="Nữ"
                onToggle={onChangeVoiceGender}
              />
            </View>
          </View>

          <View className="bg-white w-full px-4 py-4 rounded-[10px] mt-8 flex-row items-center">
            <Text className="text-secondary text-xl w-[60%]">Rung</Text>
            <View className=" w-[40%]">
              <CustomSwitchLabelSmall
                label1="Bật"
                label2="Tắt"
                onToggle={onChangeVoiceGender}
              />
            </View>
          </View>

          <View className="bg-white w-full px-4 py-4 rounded-[10px] mt-8 flex-row items-center">
            <Text className="text-secondary text-xl w-[60%]">
              Chế độ tương phản cao
            </Text>
            <View className=" w-[40%]">
              <CustomSwitchLabelSmall
                label1="Bật"
                label2="Tắt"
                onToggle={onChangeVoiceGender}
              />
            </View>
          </View>
        </BlurLayout>
        <SupportBlock />
      </View>
    </LayoutScreen>
  );
};

export default Setting;
