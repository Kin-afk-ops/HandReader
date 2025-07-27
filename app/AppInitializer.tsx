// components/AppInitializer.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/contexts/UserContext";
import { generateAutoUsername } from "@/utils/auth/generateAutoUsername";
import axiosInstance from "@/api/axiosInstance";
import { useNotification } from "@/contexts/NotificationContext";

const AppInitializer = () => {
  const { user, setUser } = useUser();
  const { setNotification } = useNotification();
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

  useEffect(() => {
    const checkNotification = async (): Promise<void> => {
      try {
        if (user) {
          const res = await axiosInstance.get(
            `/notifications/length/${user.id}`
          );
          setNotification(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkNotification();
  }, [user, setNotification]);

  return null;
};

export default AppInitializer;
