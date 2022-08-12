import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./styles";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={"white"} />
    </View>
  );
};

export default Loading;
