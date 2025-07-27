import { Text, View } from "react-native";
import React from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import Header from "@/components/Header";

const InformationApp = () => {
  return (
    <LayoutScreen>
      <Header screenType="Thông tin ứng dụng" />
      <BlurLayout>
        <View className="h-full justify-around">
          {/* Giới thiệu ứng dụng */}
          <View className="px-4 py-8 rounded-[10px] items-center bg-white shadow-md">
            <Text className="text-third text-3xl font-bold mb-2">
              Về Ứng Dụng
            </Text>
            <Text className="text-base text-justify leading-relaxed">
              Ứng dụng hỗ trợ người khiếm thị nhận diện chữ viết tay và văn bản
              in từ camera, sau đó chuyển đổi thành giọng nói để đọc nội dung.
              Với giao diện tối giản, trực quan và có hướng dẫn bằng âm thanh,
              ứng dụng hướng tới khả năng sử dụng thực tế cho người dùng yếu thị
              lực.
            </Text>
          </View>

          {/* Thông tin dự án */}
          <View className="px-4 py-8 rounded-[10px] items-center bg-white shadow-md">
            <Text className="text-third text-3xl font-bold mb-4">
              Thông Tin Dự Án
            </Text>
            <View className="space-y-3 w-full">
              <View className="flex-row">
                <Text className="font-bold w-[30%]">Tác giả:</Text>
                <Text className="flex-1">Nguyễn Vũ Linh</Text>
              </View>
              <View className="flex-row">
                <Text className="font-bold w-[30%]">Hướng dẫn:</Text>
                <Text className="flex-1">TS. Nguyễn Công Danh</Text>
              </View>
              <View className="flex-row">
                <Text className="font-bold w-[30%]">Đơn vị:</Text>
                <Text className="flex-1">
                  Khoa Công nghệ phần mềm – Trường CNTT & Truyền thông
                </Text>
              </View>
              <View className="flex-row">
                <Text className="font-bold w-[30%]">Công nghệ:</Text>
                <Text className="flex-1">
                  React Native, Flask, PostgreSQL, VietOCR
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
