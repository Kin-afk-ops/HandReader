import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import SupportBlock from "@/components/SupportBlock";

const Feedback = () => {
  return (
    <LayoutScreen>
      <View className="relative">
        <BlurLayout>
          <View className="bg-white px-4 py-2 rounded-[10px]">
            <Text className="font-bold text-secondary text-2xl text-center">
              Nội dung văn bản
            </Text>

            <View className="flex-row items-start mt-4">
              <Image
                source={require("../../assets/temp.jpg")}
                contentFit="contain"
                transition={1000}
                style={{ width: 100, height: 100 }}
              />
              <View className="flex-1">
                <Text>
                  Người giàu nhìn thấy các cơ hội. Người nhèo nhìn thấy những
                  khó khăn.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white px-4 py-2 rounded-[10px] mt-8">
            <Text className="font-bold text-secondary text-2xl text-center">
              Đánh giá kết quả
            </Text>
            <TouchableOpacity className="w-full border border-[#ccc] h-[150px] rounded-[10px] mt-4 items-center">
              <MaterialIcons name="graphic-eq" size={100} color="#8c52ff" />
              <Text className="text-secondary text-xl font-bold mt-2">
                Giữ và nói
              </Text>
            </TouchableOpacity>
          </View>
          <View className="items-center mt-2">
            <TouchableOpacity className="px-6 py-4 bg-[#0cc0df] rounded-[10px]">
              <Text className="text-xl text-white">Gửi đánh giá</Text>
            </TouchableOpacity>
          </View>
        </BlurLayout>
        <SupportBlock />
      </View>
    </LayoutScreen>
  );
};

export default Feedback;
