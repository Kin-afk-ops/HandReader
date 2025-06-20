import BlurLayout from "@/components/BlurLayout";
import LayoutScreen from "@/components/LayoutScreen";
import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";

const Notification = () => {
  return (
    <LayoutScreen>
      <BlurLayout>
        <View className="bg-[#5ce1e6] rounded-[10px] overflow-hidden mt-4 w-full">
          <BlurView intensity={100} tint="light" className="w-[100%] px-4 py-4">
            <Text className="text-secondary">
              Chào mừng bạn đến với ứng dụng. Hãy học cách sử dụng ứng dụng ngay
            </Text>
          </BlurView>
        </View>

        <View className="bg-white rounded-[10px] overflow-hidden mt-4 w-full">
          <BlurView intensity={200} tint="light" className="w-[100%] px-4 py-4">
            <Text className="text-secondary">
              Chào mừng bạn đến với ứng dụng. Hãy học cách sử dụng ứng dụng ngay
            </Text>
          </BlurView>
        </View>
      </BlurLayout>
    </LayoutScreen>
  );
};

export default Notification;

const styles = StyleSheet.create({});
