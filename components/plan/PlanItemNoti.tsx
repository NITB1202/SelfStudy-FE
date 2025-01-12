import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import Checkbox from "@/components/Checkbox";

interface PlanItemProps {
  progress: number;
  planName: string;
  deadline: string;
  isChecked?: boolean;
  onToggle?: () => void;
  showCheckbox?: boolean; // Thuộc tính kiểm soát việc hiển thị checkbox
}

export default function PlanItemNoti({
  progress,
  planName,
  deadline,
  isChecked = false, // Mặc định là false
  onToggle,
  showCheckbox = true, // Mặc định hiển thị checkbox
}: PlanItemProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  const radius = 25;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Checkbox */}
      {showCheckbox && (
        <Checkbox onToggle={onToggle || (() => {})} isChecked={isChecked} />
      )}

      {/* Progress Circle */}
      <Svg
        height={(radius + strokeWidth) * 2}
        width={(radius + strokeWidth) * 2}
        style={styles.progressCircle}
      >
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#E3E3E3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#7AB2D3"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + strokeWidth} ${
            radius + strokeWidth
          })`}
        />
        <SvgText
          x={radius + strokeWidth}
          y={radius + strokeWidth}
          fill="black"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {`${normalizedProgress.toFixed(1)}%`}
        </SvgText>
      </Svg>

      {/* Plan Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.planName}>{planName}</Text>
        <View style={styles.deadlineContainer}>
          <Text style={styles.deadlineLabel}>Deadline</Text>
          <Text style={styles.deadline}>{deadline}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  },
  progressCircle: {
    marginHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deadlineContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  deadlineLabel: {
    fontSize: 12,
    color: "gray",
  },
  deadline: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF2D30",
  },
});
