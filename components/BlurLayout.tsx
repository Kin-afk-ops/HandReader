import { BlurView } from "expo-blur";
const BlurLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BlurView
      intensity={50}
      tint="light"
      className="w-[100%] mt-4 mb-16 px-4 py-4 bg-white  rounded-[10px] overflow-hidden"
    >
      {children}
    </BlurView>
  );
};

export default BlurLayout;
