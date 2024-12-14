import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

// Định nghĩa kiểu cho props
interface PlanItemProps {
  progress: number; // Giá trị tiến độ (0-100)
  planName: string; // Tên kế hoạch
  deadline: string; // Hạn chót
}

export default function PlanItem({
  progress,
  planName,
  deadline,
}: PlanItemProps) {
  // Đảm bảo progress nằm trong khoảng 0-100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  // Kích thước và bán kính của vòng tròn
  const radius = 30; // Bán kính
  const strokeWidth = 8; // Độ dày
  const circumference = 2 * Math.PI * radius; // Chu vi
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference; // Độ dài đường gạch

  return (
    <View style={styles.container}>
      {/* Progress Circle SVG */}
      <Svg
        height={(radius + strokeWidth) * 2}
        width={(radius + strokeWidth) * 2}
      >
        {/* Vòng tròn nền */}
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#E3E3E3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Vòng tròn tiến độ */}
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
        />
        {/* Text phần trăm nằm giữa vòng tròn */}
        <SvgText
          x={radius + strokeWidth}
          y={radius + strokeWidth}
          fill="black"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {normalizedProgress.toFixed(0)}%
        </SvgText>
      </Svg>

      {/* Plan Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.planName}>{planName}</Text>
        <View style={styles.deadlineContainer}>
          <Text style={styles.deadlineLabel}>Deadline:</Text>
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
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
  },
  planName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  deadlineLabel: {
    fontSize: 12,
    color: "gray",
    marginRight: 4,
  },
  deadline: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7AB2D3",
  },
});
