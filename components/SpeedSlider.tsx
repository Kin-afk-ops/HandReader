import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

interface ChildProps {
  speedValue: number;
  setSpeedValue: React.Dispatch<React.SetStateAction<number>>;
}

const SpeedSlider: React.FC<ChildProps> = ({ speedValue, setSpeedValue }) => {
  const { width } = useWindowDimensions();

  const sliderWidth = width - 64 - 64;

  // Tính vị trí thumb

  return (
    <View className="w-full px-8 items-center relative">
      <MultiSlider
        values={[speedValue]}
        onValuesChange={(values) => setSpeedValue(values[0])}
        min={0.25}
        max={2}
        step={0.25}
        sliderLength={sliderWidth}
        selectedStyle={{
          backgroundColor: "#8c52ff",
          height: 10, // ✅ chiều cao phần đã kéo
          borderRadius: 5,
        }}
        unselectedStyle={{
          backgroundColor: "#5f605a",
          height: 10, // ✅ chiều cao phần đã kéo
          borderRadius: 5,
        }}
        customMarker={() => (
          <LinearGradient
            colors={["#FFF7AD", "#FFA9F9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "#8c52ff",
            }}
          />
        )}
      />

      <Text className="text-xl">{speedValue}</Text>
    </View>
  );
};

export default SpeedSlider;
