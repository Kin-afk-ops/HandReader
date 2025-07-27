import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SaveItem from "./SaveItem";
import { useUser } from "@/contexts/UserContext";
import LoadingComponent from "./LoadingComponent";
import axiosInstance from "@/api/axiosInstance";

const SaveView = () => {
  const { user } = useUser();
  const [moreBtnDisplay, setMoreBtnDisplay] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;
  const [saves, setSaves] = useState<
    | {
        id: string;
        user_id: string;
        result_id: string;
        viewed_at: string;
        is_saved_by_user: boolean;
        recognized_text: string;
        confidence: number;
        created_at: string;
      }[]
    | null
  >(null);
  const [totalSaves, setTotalSaves] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      if (!saves) {
        setLoading(true);
      }
      try {
        if (user) {
          const res = await axiosInstance.get(
            `/histories/save/${user.id}?offset=${offset}&limit=${limit}`
          );

          const newSave = res.data;
          setSaves((prev) => [
            ...(prev ?? []), // giữ lại thông báo cũ (nếu null thì dùng [])
            ...newSave, // thêm các thông báo mới
          ]);

          const resTotal = await axiosInstance.get(
            `/histories/saveLength/${user.id}`
          );

          setTotalSaves(resTotal.data.total);
        }
      } catch (error) {
        console.log(error);
        setMoreBtnDisplay(false);
      } finally {
        setLoading(false);
      }
    };

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, offset]);

  const loadSeeMore = () => {
    setOffset((prev) => (prev += 10));
  };

  useEffect(() => {
    if (totalSaves != null && Array.isArray(saves)) {
      if (saves.length >= totalSaves) {
        setMoreBtnDisplay(false);
      } else {
        setMoreBtnDisplay(true);
      }
    }
  }, [totalSaves, saves]);

  if (loading) return <LoadingComponent />;
  return (
    <View>
      {saves ? (
        saves.map((save) => (
          <SaveItem
            key={save.id}
            save={save}
            setCurrentPlayingId={setCurrentPlayingId}
            currentPlayingId={currentPlayingId}
          />
        ))
      ) : (
        <Text>Không có bản lưu nào</Text>
      )}

      {moreBtnDisplay && (
        <TouchableOpacity
          onPress={loadSeeMore}
          className="mt-4 px-4 py-2 bg-blue-500 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-base">
            Xem bản lưu trước đó
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SaveView;
