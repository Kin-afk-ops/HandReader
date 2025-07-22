import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LayoutScreen from "@/components/LayoutScreen";

const Welcome = () => {
  return (
    <LayoutScreen>
      <View className="justify-center items-center h-full w-full">
        {/* <TouchableOpacity className="flex-row bg-white items-center px-4 rounded-[10px] w-[80%] mb-4 py-3">
          <Image
            source={require("../assets/images/google-icon.png")}
            contentFit="contain"
            transition={1000}
            style={{ width: 40, height: 40 }}
            accessibilityLabel="Đăng nhập với Gu gồ"
          />
          <Text className="font-bold">Đăng nhập với Google</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          className="bg-third w-[80%] py-6  items-center rounded-[10px]"
          accessibilityLabel="Vào ứng dụng"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold">Vào ứng dụng</Text>
        </TouchableOpacity>
      </View>
    </LayoutScreen>
  );
};

export default Welcome;
