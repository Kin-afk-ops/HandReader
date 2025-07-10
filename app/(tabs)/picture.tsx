import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function PictureScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  if (!uri) return <Text className="text-white">Không có ảnh</Text>;

  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <Image
        source={{ uri }}
        className="w-full h-[400px] rounded-xl"
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 bg-orange-500 px-6 py-3 rounded-full"
      >
        <Text className="text-white text-lg">🔙 Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}
