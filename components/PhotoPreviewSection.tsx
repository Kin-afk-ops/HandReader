import { Fontisto } from "@expo/vector-icons";
import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { TouchableOpacity, SafeAreaView, Image, View } from "react-native";

const PhotoPreviewSection = ({
  photo,
  handleRetakePhoto,
}: {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
}) => (
  <SafeAreaView className="flex-1 bg-black justify-center items-center">
    <View className="w-[95%] bg-gray-600 rounded-2xl p-1 items-center justify-center">
      <Image
        className="w-[95%] h-[85%] rounded-2xl"
        source={{ uri: "data:image/jpg;base64," + photo.base64 }}
      />
    </View>

    <View className="mt-4 w-full flex-row justify-center">
      <TouchableOpacity
        onPress={handleRetakePhoto}
        className="bg-gray-400 p-3 rounded-full items-center justify-center"
      >
        <Fontisto name="trash" size={36} color="black" />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default PhotoPreviewSection;
