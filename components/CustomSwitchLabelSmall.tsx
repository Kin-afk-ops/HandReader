import React, { useState } from "react";
import { View, Pressable, Animated } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
  label1: string;
  label2: string;
  onToggle: (enabled: boolean) => void;
  stateInitValue: boolean;
};

const CustomSwitchLabelSmall = ({
  label1,
  label2,
  onToggle,
  stateInitValue,
}: Props) => {
  const [enabled, setEnabled] = useState(stateInitValue);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setEnabled(stateInitValue);
    Animated.timing(animatedValue, {
      toValue: stateInitValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateInitValue]);

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
    outputRange: [0, 40], // độ dài phần trượt
  });

  const colorLabel1 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#ccc"],
  });

  const colorLabel2 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#fff"],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#5ce1e6", "#ff66c4"],
  });

  const toggleSwitch = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onToggle?.(newValue); // GỌI VỚI GIÁ TRỊ MỚ
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      className="w-[100%] h-12 bg-white rounded-full px-1 py-1 flex-row items-center relative overflow-hidden border border-[#ccc] "
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          backgroundColor: backgroundColor,
        }}
        className="absolute w-[65%] h-12  bg-primary rounded-full z-0"
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

export default CustomSwitchLabelSmall;
