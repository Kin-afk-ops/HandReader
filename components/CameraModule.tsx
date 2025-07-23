import { AntDesign } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import mime from "mime";

import PhotoPreviewSection from "./PhotoPreviewSection";
import axiosInstance from "@/api/axiosInstance";
import { useUser } from "@/contexts/UserContext";
import LoadingScreen from "@/app/LoadingScreen";
import axios from "axios";

interface ChildProps {
  takePhoto: boolean;
  setTakePhoto: React.Dispatch<React.SetStateAction<boolean>>;
  setPhoto: React.Dispatch<React.SetStateAction<any>>;
  photo: any;
}

export default function CameraModule({
  takePhoto,
  setTakePhoto,
  photo,
  setPhoto,
}: ChildProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(true);
  const cameraRef = useRef<CameraView | null>(null);

  // / 👉 Gỡ và khởi tạo camera theo focus màn hình
  useFocusEffect(
    useCallback(() => {
      setCameraActive(true);
      return () => {
        setCameraActive(false); // Tắt camera khi rời màn hình
      };
    }, [])
  );

  const uploadPhotoToServer = async (photo: any, userId: string) => {
    const newImageUri = "file:///" + photo.uri.split("file:/").join("");

    const fileUri = photo.uri;
    const fileName = fileUri.split("/").pop() || "photo.jpg";
    const fileType = "image/jpeg"; // hoặc từ photo.type nếu có

    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      name: newImageUri.split("/").pop(),
      type: mime.getType(photo.uri) || "image/jpeg", // fallback,
    } as any);

    formData.append("user_id", userId);
    formData.append("source", "camera");

    //   await axios
    //     .post("http://localhost:9999/images", formData, {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     })
    //     .then((response) => console.log(response.data))
    //     .catch((error) => console.log(error));
    // };

    try {
      const response = await fetch(
        "https://evident-kingfish-actual.ngrok-free.app/images",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            // KHÔNG đặt Content-Type ở đây!
          },
          body: formData,
        }
      );

      const json = await response.json();
      console.log("Upload response:", json);
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  useEffect(() => {
    const handleTakePhoto = async () => {
      if (cameraRef.current && takePhoto) {
        const options = {
          quality: 1,
          base64: true,
          exif: false,
        };
        const takenPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(takenPhoto);
        setTakePhoto(false);

        if (user) {
          console.log("Đang gửi");
          const resImage = await uploadPhotoToServer(takenPhoto, user.id);

          console.log(resImage);
        }
      }
    };
    handleTakePhoto();
  }, [takePhoto, setPhoto, setTakePhoto, user, photo]);

  if (!permission) {
    return <View />;
  }

  if (!cameraActive) return null;

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-center text-lg font-semibold mb-3 text-gray-800">
          Ứng dụng cần quyền truy cập camera
        </Text>
        <Text className="text-center text-base text-gray-600 mb-6">
          Vui lòng cấp quyền để tiếp tục sử dụng tính năng chụp ảnh nhận diện
          văn bản.
        </Text>
        <Button onPress={requestPermission} title="Cấp quyền truy cập" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleRetakePhoto = () => {
    setPhoto(null);
    setTakePhoto(false);
  };

  // if (photo)
  //   return (
  //     <View className="flex-1 justify-center h-full  relative">
  //       <PhotoPreviewSection
  //         photo={photo}
  //         handleRetakePhoto={handleRetakePhoto}
  //       />
  //     </View>
  //   );

  return (
    <View className="flex-1 justify-center h-full w-full relative">
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        mirror={true}
        responsiveOrientationWhenOrientationLocked={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4,
  },
});
