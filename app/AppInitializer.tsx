// components/AppInitializer.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/contexts/UserContext";
import { generateAutoUsername } from "@/utils/auth/generateAutoUsername";
import axiosInstance from "@/api/axiosInstance";
import { ActivityIndicator, View } from "react-native";

const AppInitializer = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const storedUser = await AsyncStorage.getItem("userInfo");

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        console.log("Found stored user", parsed);
        setUser(parsed);
        router.replace("/(tabs)");
      } else {
        const username = generateAutoUsername();
        const userData = {
          name: username,
          role: "user",
        };

        try {
          const resUser = await axiosInstance.post("/users", userData);
          await AsyncStorage.setItem("userInfo", JSON.stringify(resUser.data));
          setUser(resUser.data);
          router.replace("/(tabs)");
        } catch (error) {
          console.error("Lỗi tạo user:", error);
        }
      }
    };

    checkLogin();
  }, [router, setUser]);

  return null;
};

export default AppInitializer;
