import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import Slider from "@react-native-community/slider"; // Import từ thư viện riêng
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";

export default function Page() {
  const [volume, setVolume] = useState(50);
  const [isLooping, setIsLooping] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Volume Control */}
        <View style={styles.volumeControl}>
          <Ionicons name="volume-high" size={20} color="#7AB2D3" />
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
        {/* Loop Control */}
        <View style={styles.loopControl}>
          <Switch
            value={isLooping}
            onValueChange={setIsLooping}
            trackColor={{ false: "#EAEAEA", true: "#7AB2D3" }}
            thumbColor={isLooping ? "#FFFFFF" : "#FFFFFF"}
          />
          <Text style={styles.loopText}>On loop</Text>
        </View>
      </View>
      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
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
    padding: 20,
  },
  volumeControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
  loopControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  loopText: {
    fontSize: 16,
    color: "#2B3A4A",
    marginLeft: 10,
  },
  bottomNavBar: {
    alignItems: "center",
  },
});
