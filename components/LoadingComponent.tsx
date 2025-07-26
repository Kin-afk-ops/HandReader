import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BlurLayout from "./BlurLayout";

const LoadingComponent = () => {
  return (
    <SafeAreaProvider>
      <BlurLayout>
        <View
          className="h-full justify-center items-center"
          accessibilityLabel="Đang tải..."
        >
          <ActivityIndicator size="large" color="#8c52ff" />
          <Text className="text-white">Đang tải...</Text>
        </View>
      </BlurLayout>
    </SafeAreaProvider>
  );
};

export default LoadingComponent;
