import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useEffect, useRef } from "react";

type Props = {
  label1: string;
  label2: string;
  onToggle: (enabled: boolean) => void;
};

const CustomSwitchLabelLarge = ({ label1, label2, onToggle }: Props) => {
  const [enabled, setEnabled] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: enabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (width - 48) / 2], // độ dài phần trượt
  });

  const colorLabel1 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#5f605a"],
  });

  const colorLabel2 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#5f605a", "#fff"],
  });

  const toggleSwitch = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onToggle?.(newValue); // GỌI VỚI GIÁ TRỊ MỚ
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      className="w-[100%] h-12 bg-white rounded-full px-1 py-1 flex-row items-center relative overflow-hidden"
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        className="absolute w-[50%] h-12  bg-primary rounded-full z-0"
      />
      <View className="flex-1 z-10 items-center">
        <Animated.Text style={{ color: colorLabel1 }} className="text-m">
          {label1}
        </Animated.Text>
      </View>
      <View className="flex-1 z-10 items-center">
        <Animated.Text style={{ color: colorLabel2 }} className="text-m">
          {label2}
        </Animated.Text>
      </View>
    </Pressable>
  );
};

export default CustomSwitchLabelLarge;
