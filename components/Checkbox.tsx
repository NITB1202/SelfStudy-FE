import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CheckboxProps {
  onToggle?: (isChecked: boolean) => void; // Prop tùy chọn
}

export default function Checkbox({ onToggle }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Gọi hàm nếu được truyền
    if (onToggle) {
      onToggle(newCheckedState);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons
        name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
        size={24}
        color={isChecked ? "#7AB2D3" : "#7AB2D3"}
      />
    </TouchableOpacity>
  );
}
