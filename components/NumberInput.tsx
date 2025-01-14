import React, { forwardRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import { Colors } from "@/constants/Colors";

interface NumberInputProps {
  defaultValue?: string;
  onChangeText: (text: string) => void;
}

const NumberInput = forwardRef<TextInput, NumberInputProps>(
  ({ defaultValue = "", onChangeText }, ref) => {
    const loaded = useCustomFonts();
    const [isFocus, setFocus] = useState(false);

    if (!loaded) {
      return null;
    }

    return (
      <View style={[styles.container, isFocus && styles.focus]}>
        <TextInput
          style={styles.text}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          keyboardType="numeric"
          maxLength={1}
          ref={ref}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 52,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
  text: {
    color: "black",
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    height: "100%",
    textAlign: "center",
  },
  focus: {
    borderColor: "#7AB2D3",
  },
});

export default NumberInput;
