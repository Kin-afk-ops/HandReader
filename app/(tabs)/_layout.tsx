import { View } from "react-native";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5ce1e6",
        tabBarInactiveTintColor: "#5f605a",
        headerShown: false,

        tabBarShowLabel: false, // ẩn label chữ
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="history"
              size={30}
              color={color}
              accessibilityLabel="Vào màn hình lịch sử và đã lưu"
              accessible={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 75,
                height: 75,
                backgroundColor: "#5ce1e6",
                borderRadius: 37.5,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 35,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 10,
              }}
              accessibilityLabel="Vào màn hình camera"
              accessible={true}
            >
              <MaterialIcons name="camera-alt" size={46} color="#fff" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="guide"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="informationApp"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="info-outline"
              size={30}
              color={color}
              accessibilityLabel="Vào màn hình thông tin ứng dụng"
              accessible={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="feedback"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="picture"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="splash"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
