import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "@/components/Checkbox";
import ProgressCircle from "./time";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import { Svg, Rect, Defs, LinearGradient, Stop } from "react-native-svg";

export default function Page() {
  const [volume, setVolume] = useState(50);
  const [isLooping, setIsLooping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(660); // 11 phút
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songs = ["Westlife - My Love", "Ed Sheeran - Perfect", "Adele - Hello"];

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleFinish = () => {
    Alert.alert("Confirm Finish", "Are you sure to end time?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setIsRunning(false);
          setHasStarted(false);
          setTimeRemaining(660); // Reset lại thời gian
        },
      },
    ]);
  };

  const handleStrictMode = () => {
    Alert.alert("Strict Mode", "Strict mode is now active.");
  };

  const handleSettings = () => {
    Alert.alert("Settings", "Navigate to settings.");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.timerContainer}>
          <ProgressCircle
            radius={100}
            strokeWidth={8}
            totalTime={660}
            timeRemaining={timeRemaining}
            isRunning={isRunning}
            onTick={(remaining) => setTimeRemaining(remaining)} // Cập nhật thời gian
            onComplete={() => {
              alert("Time is up!");
              setIsRunning(false);
              setHasStarted(false);
              setTimeRemaining(660); // Reset thời gian sau khi hoàn tất
            }}
          />
          <Text style={styles.stageText}>STAGE 1</Text>
        </View>

        <View style={styles.volumeControl}>
          <Ionicons name="volume-high" size={24} color="#7AB2D3" />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor="#7AB2D3"
            maximumTrackTintColor="#EAEAEA"
          />
        </View>

        <View style={styles.songControl}>
          <Pressable onPress={handlePreviousSong}>
            <Ionicons name="play-skip-back" size={24} color="#7AB2D3" />
          </Pressable>
          <Text style={styles.songText}>{songs[currentSongIndex]}</Text>
          <Pressable onPress={handleNextSong}>
            <Ionicons name="play-skip-forward" size={24} color="#7AB2D3" />
          </Pressable>
        </View>

        <View style={styles.loopControl}>
          <Checkbox
            isChecked={isLooping}
            onToggle={(checked) => setIsLooping(checked)}
          />
          <Text style={styles.loopText}>On loop</Text>
        </View>
        <View style={styles.button}>
          <Pressable
            style={styles.finishButton}
            onPress={() => {
              if (!hasStarted) {
                setIsRunning(true);
                setHasStarted(true);
              } else {
                handleFinish();
              }
            }}
          >
            <Text style={styles.finishText}>
              {hasStarted ? "Finish" : "Start"}
            </Text>
          </Pressable>
        </View>

        {/* New Buttons */}
        {/* Additional Buttons */}
        <View style={styles.additionalButtons}>
          {/* Strict Mode Button */}
          <Pressable style={styles.iconButton} onPress={handleStrictMode}>
            <Svg height={80} width={80}>
              <Defs>
                <LinearGradient id="strictGradient" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0%" stopColor="#4A628A" />
                  <Stop offset="100%" stopColor="#131A24" />
                </LinearGradient>
              </Defs>
              <Rect
                x="0"
                y="0"
                width="80"
                height="80"
                rx="15"
                fill="url(#strictGradient)"
              />
            </Svg>
            <Ionicons
              name="remove-circle"
              size={40}
              color="#FFFFFF"
              style={styles.icon}
            />
            <Text style={styles.iconButtonText}>Strict mode</Text>
          </Pressable>

          {/* Settings Button */}
          <Pressable style={styles.iconButton} onPress={handleSettings}>
            <Svg height={80} width={80}>
              <Defs>
                <LinearGradient
                  id="settingsGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <Stop offset="0%" stopColor="#628393" />
                  <Stop offset="100%" stopColor="#1E282D" />
                </LinearGradient>
              </Defs>
              <Rect
                x="0"
                y="0"
                width="80"
                height="80"
                rx="15"
                fill="url(#settingsGradient)"
              />
            </Svg>
            <Ionicons
              name="settings"
              size={40}
              color="#FFFFFF"
              style={styles.icon}
            />
            <Text style={styles.iconButtonText1}>Settings</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottom}>
        <BottomNavBar />
      </View>
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
    paddingTop: 50,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  stageText: {
    fontSize: 24,
    color: "#4A628A",
    marginTop: 10,
    fontWeight: "bold",
  },
  volumeControl: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
  songControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  songText: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    textAlign: "center",
    fontWeight: "400",
  },
  loopControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  loopText: {
    fontSize: 16,
    color: "#2B3A4A",
    marginLeft: 10,
  },
  finishButton: {
    backgroundColor: "#7AB2D3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7AB2D3",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  finishText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  additionalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  iconButton: {
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  iconButtonText: {
    fontSize: 16,
    color: "#4A628A",
    marginTop: 5,
    fontWeight: "500",
  },
  iconButtonText1: {
    fontSize: 16,
    color: "#1E282D",
    marginTop: 5,
    fontWeight: "500",
  },
  bottom: {
    alignItems: "center",
  },
});
