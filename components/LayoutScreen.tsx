import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const LayoutScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={["#FFF7AD", "#FFA9F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-8 mt-10">{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default LayoutScreen;
