import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <View className=" flex-row border-b border-gray-300 justify-between items-center">
      <Text
        className="text-[18px] text-secondary flex-1 pr-4"
        numberOfLines={1} // nếu muốn cắt dòng và thêm dấu "..."
        ellipsizeMode="tail"
      >
        user6654845468
      </Text>

      <View className="flex-row ">
        <TouchableOpacity
          className="ml-2"
          onPress={() => router.push("/notification")}
        >
          <MaterialIcons name="notifications" size={45} color="#5f605a" />
        </TouchableOpacity>
        <TouchableOpacity
          className="ml-2"
          onPress={() => router.push("/setting")}
        >
          <MaterialIcons name="settings" size={45} color="#5f605a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
