import React from "react";
import { Text, View } from "react-native";
import { theme } from "../core/theme";

type Props = {
  usd: number;
  sol: number;
};

const PriceHeader = ({ usd, sol }: Props) => (
  <View style={{ width: "100%", alignItems: "center" }}>
    <Text
      style={{
        marginTop: 20,
        color: theme.colors.primary,
        fontSize: 55,
        fontWeight: "bold",
      }}
    >
      {`$${usd}`}
    </Text>
    <Text style={{ 
      color: theme.colors.accent, 
      fontWeight: "bold",
      fontSize: 20,
       }}>
      {`${sol}`} SOL
    </Text>
  </View>
);

export default PriceHeader;
