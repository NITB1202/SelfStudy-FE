import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "@/components/Checkbox";
import ProgressCircle from "./time";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";

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
  },
  finishText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottom: {
    alignItems: "center",
  },
});
