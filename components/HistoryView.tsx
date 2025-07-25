import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeardItem from "./HeardItem";
import { useUser } from "@/contexts/UserContext";
import axiosInstance from "@/api/axiosInstance";
import HistoryItem from "./HistoryItem";
import LoadingScreen from "@/app/LoadingScreen";

interface ChildProps {
  histories:
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
    | null;
}

const HistoryView: React.FC<ChildProps> = ({ histories }) => {
  const { user } = useUser();
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

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
    </View>
  );
};

export default HistoryView;
