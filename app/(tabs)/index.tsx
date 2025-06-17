import { Text, TouchableOpacity, View } from "react-native";
import LayoutScreen from "@/components/LayoutScreen";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import SupportBlock from "@/components/SupportBlock";

export default function Index() {
  return (
    <LayoutScreen>
      <View className="relative">
        <Header />
        <View className="w-full bg-red-400 h-[300px] mt-8 rounded-[10px]"></View>

        <TouchableOpacity className="mt-4 items-center">
          <MaterialIcons name="camera-alt" size={90} color="#fff" />
        </TouchableOpacity>
        <SupportBlock />
      </View>
    </LayoutScreen>
  );
}
