import {
  View,
  Text,
  TouchableOpacity,
  findNodeHandle,
  AccessibilityInfo,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface childProps {
  screenType: string;
}

const Header: React.FC<childProps> = ({ screenType }) => {
  const router = useRouter();
  const titleRef = useRef<Text>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const node = findNodeHandle(titleRef.current);
      if (node) {
        AccessibilityInfo.setAccessibilityFocus(node);
      }
    }, 500); // delay để đảm bảo render xong

    return () => clearTimeout(timeout);
  }, [screenType]); // chạy mỗi khi screenType thay đổi (màn hình mới)

  const goToCamera = () => {
    // Reset về trang camera, có thể thêm logic xóa ảnh cũ nếu cần
    router.push("/");
  };

  return (
    <View className=" flex-row border-b border-gray-300 justify-between items-center">
      <Text
        className="text-[18px] text-secondary flex-1 pr-4"
        numberOfLines={1} // nếu muốn cắt dòng và thêm dấu "..."
        ellipsizeMode="tail"
        ref={titleRef}
        accessible={true}
        accessibilityLabel={screenType}
        accessibilityRole="header"
      >
        {screenType}
      </Text>

      {screenType !== "Màn hình Camera" && (
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Quay về màn hình camera"
          onPress={goToCamera}
          className="mr-2"
        >
          <MaterialIcons name="camera-alt" size={45} color="#2563eb" />
        </TouchableOpacity>
      )}

      <View className="flex-row ">
        <TouchableOpacity
          className="ml-2 relative"
          onPress={() => router.push("/notification")}
          accessibilityLabel={`Vào màn hình thông báo. Có 1 thông báo mới`}
        >
          <MaterialIcons name="notifications" size={45} color="#5f605a" />
          <View className="absolute rounded-[50%] bg-red-500 w-[20px] h-[20px] items-center justify-center left-[60%]">
            <Text className="text-white">1</Text>
          </View>
        </TouchableOpacity>

        {screenType !== "Màn hình cài đặt" && (
          <TouchableOpacity
            className="ml-2"
            onPress={() => router.push("/setting")}
            accessibilityLabel="Vào màn hình cài đặt"
          >
            <MaterialIcons name="settings" size={45} color="#5f605a" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
