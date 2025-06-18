import { Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const HeardItem = () => {
  return (
    <View className="w-full bg-white my-2 py-4 px-2 rounded-[10px] flex-row">
      <View className="w-[70%]">
        <Text>Văn bản 2 giờ 48 phút ngày 14 tháng 6 năm 2024</Text>
      </View>

      <View className="w-[30%] flex-row justify-between">
        <MaterialIcons name="play-arrow" size={40} color="#8c52ff" />
        {/* <MaterialIcons name="pause" size={40} color="#5f605a" /> */}
        <MaterialIcons name="bookmark-border" size={40} color="#5f605a" />
        {/* <MaterialIcons name="bookmark" size={40} color="#ffde59" /> */}
      </View>
    </View>
  );
};

export default HeardItem;
