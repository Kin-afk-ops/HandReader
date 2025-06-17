import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

const SupportBlock = () => {
  return (
    <View className="absolute top-[95%] w-full h-[100px] flex-row justify-between">
      <TouchableOpacity>
        <BlurView
          intensity={50}
          tint="light"
          className="w-[100px] h-[100px] bg-white  rounded-full overflow-hidden items-center justify-center"
        >
          <MaterialIcons name="question-mark" size={60} color="#5f605a" />
        </BlurView>
      </TouchableOpacity>
      <TouchableOpacity>
        <BlurView
          intensity={50}
          tint="light"
          className="w-[100px] h-[100px] bg-white  rounded-full overflow-hidden items-center justify-center"
        >
          <MaterialIcons name="mic" size={60} color="#5f605a" />
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

export default SupportBlock;
