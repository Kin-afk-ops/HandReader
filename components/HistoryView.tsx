import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import axiosInstance from "@/api/axiosInstance";
import HistoryItem from "./HistoryItem";
import LoadingComponent from "./LoadingComponent";

const HistoryView = () => {
  const { user } = useUser();
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [moreBtnDisplay, setMoreBtnDisplay] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;
  const [totalHistories, setTotalHistories] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [histories, setHistories] = useState<
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
  useEffect(() => {
    const getItems = async () => {
      if (!histories) setLoading(true);
      try {
        if (user) {
          const res = await axiosInstance.get(
            `/histories/userId/${user.id}?offset=${offset}&limit=${limit}`
          );

          const newHistories = res.data;
          setHistories((prev) => [
            ...(prev ?? []), // giữ lại thông báo cũ (nếu null thì dùng [])
            ...newHistories, // thêm các thông báo mới
          ]);

          const resTotal = await axiosInstance.get(
            `/histories/length/${user.id}`
          );

          setTotalHistories(resTotal.data.total);
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
    if (totalHistories != null && Array.isArray(histories)) {
      if (histories.length >= totalHistories) {
        setMoreBtnDisplay(false);
      } else {
        setMoreBtnDisplay(true);
      }
    }
  }, [totalHistories, histories]);

  if (loading) return <LoadingComponent />;

  return (
    <View>
      {histories ? (
        histories.map((history) => (
          <HistoryItem
            key={history.id}
            history={history}
            currentPlayingId={currentPlayingId}
            setCurrentPlayingId={setCurrentPlayingId}
          />
        ))
      ) : (
        <Text>Không có lịch sử</Text>
      )}

      {moreBtnDisplay && (
        <TouchableOpacity
          onPress={loadSeeMore}
          className="mt-4 px-4 py-2 bg-blue-500 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-base">
            Xem lịch sử trước đó
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HistoryView;
