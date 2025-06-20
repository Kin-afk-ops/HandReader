import { Text, TouchableOpacity, View } from "react-native";
import LayoutScreen from "@/components/LayoutScreen";
import { MaterialIcons } from "@expo/vector-icons";
import SupportBlock from "@/components/SupportBlock";
import Header from "@/components/Header";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <LayoutScreen>
      <View className="relative">
        <Header />
        <View className="w-full bg-red-400 h-[300px] mt-8 rounded-[10px]"></View>

        {/* <TouchableOpacity className="mt-4 items-center">
          <MaterialIcons name="camera-alt" size={90} color="#fff" />
        </TouchableOpacity> */}
        <TouchableOpacity className="mt-4 items-center ">
          <Text className="bg-[#0cc0df] px-8 py-4 text-xl text-white rounded-[10px]">
            Lưu kết quả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-2 items-center "
          onPress={() => router.push("/(tabs)/feedback")}
        >
          <Text className="bg-[#e5c95a] px-8 py-4 text-xl text-white rounded-[10px]">
            Đánh giá kết quả
          </Text>
        </TouchableOpacity>

        <SupportBlock />
      </View>
    </LayoutScreen>
  );
}
