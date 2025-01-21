import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Circle, Svg } from "react-native-svg";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import statisticApi from "@/api/statisticApi";
import { useAuth } from "@/context/AuthContext";

export default function Statistic() {
  const [hoursSpent, setHoursSpent] = useState("0:0");
  const [loading, setLoading] = useState(true);
  const [finishedPlans, setFinishedPlans] = useState(0);
  const [totalCompletion, setCompletionRate] = useState(0);
  const [completeSessions, setCompleteSessions] = useState(0);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        console.log("userId from useAuth:", userId);

        if (!userId) {
          console.warn("userId is undefined or null");
          return;
        }

        const response = await statisticApi.getHoursSpent(userId);
        console.log("API Responses:", response);

        if (Array.isArray(response) && response.length >= 2) {
          const [hour, minute] = response;
          console.log(hour);
          setHoursSpent(`${hour}:${minute}`);
        } else {
          console.warn("Unexpected API response format:", response);
          setHoursSpent("0:0");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [userId]);

  useEffect(() => {
    const fetchFinishedPlans = async () => {
      try {
        console.log("userId from useAuth:", userId);

        if (!userId) {
          console.warn("userId is undefined or null");
          return;
        }

        const response = await statisticApi.getFinish(userId);
        console.log("Plan:", response);

        if (typeof response === "number") {
          setFinishedPlans(response);
        } else {
          console.warn("Unexpected API response format:", response);
        }
      } catch (error) {
        console.error("Error fetching finished plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedPlans();
  }, [userId]);

  useEffect(() => {
    const fetchCompletionRate = async () => {
      try {
        console.log("userId from useAuth:", userId);

        if (!userId) {
          console.warn("userId is undefined or null");
          return;
        }

        const response = await statisticApi.getFinishRate(userId);
        console.log("complete rate:", response);

        if (typeof response === "number") {
          setCompletionRate(response);
        } else {
          console.warn("Unexpected API response format:", response);
        }
      } catch (error) {
        console.error("Error fetching completion rate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletionRate();
  }, [userId]);

  useEffect(() => {
    const fetchCompleteSessions = async () => {
      try {
        console.log("userId from useAuth:", userId);

        if (!userId) {
          console.warn("userId is undefined or null");
          return;
        }

        const response = await statisticApi.getFinishSession(userId);
        console.log("API Response:", response);
        if (typeof response === "number" && !isNaN(response)) {
          setCompleteSessions(response);
        } else {
          console.warn("Invalid API response format, setting to 0:", response);
          setCompleteSessions(0);
        }
      } catch (error) {
        console.error("Error fetching complete sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleteSessions();
  }, [userId]);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Header />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Weekly report</Text>

          {/* Top Stats */}
          <View style={styles.topStatsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{finishedPlans}</Text>
              <Text style={styles.statLabel}>Finished plans</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {loading ? "Loading..." : hoursSpent}
              </Text>
              <Text style={styles.statLabel}>Hour spent on study session</Text>
            </View>
          </View>

          {/* Completion Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Plans finish in total</Text>
            <View style={styles.circularChart}>
              <Svg height="180" width="180" viewBox="0 0 36 36">
                <Circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#EAEAEA"
                  strokeWidth="2.5"
                />
                <Circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#7AB2D3"
                  strokeWidth="2.5"
                  strokeDasharray={`${totalCompletion} ${
                    100 - totalCompletion
                  }`}
                  strokeDashoffset="25"
                  transform="rotate(-90 18 18)"
                />
              </Svg>
              <Text style={styles.percentageText}>{totalCompletion}%</Text>
            </View>
          </View>

          {/* Pie Chart */}
          <View style={styles.pieContainer}>
            <Text style={styles.chartTitle}>Study session complete</Text>
            <View style={styles.pieContainer1}>
              <Svg height="180" width="180" viewBox="0 -8 35 50">
                {/* Background Circle */}
                <Circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#4A628A"
                  strokeWidth="15"
                />
                {/* Complete Segment */}
                <Circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#7AB2D3"
                  strokeWidth="15"
                  strokeDasharray={`${completeSessions} ${
                    100 - completeSessions
                  }`}
                  strokeDashoffset="25"
                  transform="rotate(-90 18 18)"
                />
              </Svg>

              {/* Legend */}
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendBox, { backgroundColor: "#7AB2D3" }]}
                  />
                  <Text style={styles.legendText}>Complete</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendBox, { backgroundColor: "#4A628A" }]}
                  />
                  <Text style={styles.legendText}>Incomplete</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7AB2D3",
    textAlign: "center",
    marginVertical: 35,
  },
  topStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    alignItems: "center",
    paddingVertical: 15,
    elevation: 2,
  },
  statNumber: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#7AB2D3",
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  },

  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
    textAlign: "center",
  },
  circularChart: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  percentageText: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    color: "#7AB2D3",
  },
  pieContainer: {
    alignItems: "center",

    marginBottom: 20,
  },
  pieContainer1: {
    display: "flex",
    flexDirection: "row",
  },
  legendContainer: {
    flexDirection: "column",
    marginTop: 10,
    justifyContent: "center",
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#4A628A",
  },
  bottom: {
    alignItems: "center",
  },
});
