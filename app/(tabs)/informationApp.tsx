import { Text, View } from "react-native";
import React from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";

const InformationApp = () => {
  return (
    <LayoutScreen>
      <BlurLayout>
        <View className="h-[100%] justify-around">
          <View className="px-4 py-8 rounded-[10px] items-center bg-white ">
            <Text className="text-third text-3xl font-bold">GIỚI THIỆU</Text>
            <Text className="text-base mt-2 text-justify">
              Đây là ứng dụng hỗ trợ người khiếm thị nhận diện chữ viết tay và
              văn bản in qua camera, sau đó đọc to nội dung bằng giọng nói. Ứng
              dụng có giao diện đơn giản, hỗ trợ rung và điều khiển bằng giọng
              nói.
            </Text>
          </View>

          <View className="px-4 py-8 rounded-[10px] items-center bg-white justify-between">
            <Text className="text-third text-3xl font-bold">
              Tác giả & Hướng dẫn
            </Text>
            <View className="mt-4 space-y-2">
              <View className="flex-row">
                <Text className="font-bold w-[100px]">Tác giả:</Text>
                <Text className="flex-1">Nguyễn Vũ Linh</Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-[100px]">Hướng dẫn:</Text>
                <Text className="flex-1">TS. Nguyễn Công Danh</Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-[100px]">Đơn vị:</Text>
                <Text className="flex-1">
                  Khoa Công nghệ phần mềm – Trường CNTT & TT
                </Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-[100px]">Công nghệ:</Text>
                <Text className="flex-1">
                  React Native, Flask, VietOCR, PostgreSQL
                </Text>
              </View>
            </View>
          </View>
        </View>
      </BlurLayout>
    </LayoutScreen>
  );
};

export default InformationApp;
