import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface APlanProps {
  Name: string; // Nhận props tên kế hoạch
}

export default function APlan({ Name }: APlanProps) {
  const [name, setName] = useState("New Plan"); // Đặt giá trị mặc định cho name
  const [description, setDescription] = useState(
    "My first plan to test the application"
  );
  const [remindBefore, setRemindBefore] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleRemindBeforeChange = (
    field: "hours" | "minutes" | "seconds",
    value: string
  ) => {
    const numericValue = parseInt(value, 10) || 0;

    // Giới hạn giờ từ 0 đến 24, phút và giây từ 0 đến 60
    if (field === "hours") {
      setRemindBefore((prev) => ({
        ...prev,
        hours: Math.min(Math.max(numericValue, 0), 24),
      }));
    } else if (field === "minutes" || field === "seconds") {
      setRemindBefore((prev) => ({
        ...prev,
        [field]: Math.min(Math.max(numericValue, 0), 60),
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Name}</Text>

      {/* Name Field */}
      {/* <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter plan name"
          value={name}
          onChangeText={setName}
        />
      </View> */}

      {/* Description Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter plan description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Start Date */}
      <View style={styles.fieldContainerRow}>
        {/* Đặt icon và Text chung một hàng */}
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={24}
            color="#7AB2D3"
          />
          <Text style={styles.label}>Start Date</Text>
        </View>

        <View style={styles.rowContainer}>
          {/* Start Date Picker */}
          <TouchableOpacity
            style={styles.halfInput}
            onPress={() => setShowStartDatePicker(true)}
          >
            <TextInput
              style={styles.input}
              value={startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) =>
                handleDateChange(
                  event,
                  date,
                  setStartDate,
                  setShowStartDatePicker
                )
              }
            />
          )}

          {/* Start Time Picker */}
          <TouchableOpacity
            style={styles.halfInput}
            onPress={() => setShowStartTimePicker(true)}
          >
            <TextInput
              style={styles.input}
              value={startDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>

          {showStartTimePicker && (
            <DateTimePicker
              value={startDate}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) =>
                handleDateChange(
                  event,
                  date,
                  setStartDate,
                  setShowStartTimePicker
                )
              }
            />
          )}
        </View>
      </View>

      {/* End Date */}
      <View style={styles.fieldContainerRow}>
        {/* Đặt icon và Text chung một hàng */}
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={24}
            color="#7AB2D3"
          />
          <Text style={styles.label}>End Date</Text>
        </View>

        <View style={styles.rowContainer}>
          {/* End Date Picker */}
          <TouchableOpacity
            style={styles.halfInput}
            onPress={() => setShowEndDatePicker(true)}
          >
            <TextInput
              style={styles.input}
              value={endDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) =>
                handleDateChange(event, date, setEndDate, setShowEndDatePicker)
              }
            />
          )}

          {/* End Time Picker */}
          <TouchableOpacity
            style={styles.halfInput}
            onPress={() => setShowEndTimePicker(true)}
          >
            <TextInput
              style={styles.input}
              value={endDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>

          {showEndTimePicker && (
            <DateTimePicker
              value={endDate}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) =>
                handleDateChange(event, date, setEndDate, setShowEndTimePicker)
              }
            />
          )}
        </View>
      </View>

      {/* Remind Me Before Field */}
      <View style={styles.fieldContainer}>
        {/* Đặt icon và Text chung một hàng */}
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons name="alarm" size={24} color="#7AB2D3" />
          <Text style={styles.label}>Remind Me Before</Text>
        </View>

        <View style={styles.remindContainer}>
          <TextInput
            style={styles.remindInput}
            placeholder="HH"
            keyboardType="numeric"
            value={remindBefore.hours.toString()}
            onChangeText={(value) => handleRemindBeforeChange("hours", value)}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.remindInput}
            placeholder="MM"
            keyboardType="numeric"
            value={remindBefore.minutes.toString()}
            onChangeText={(value) => handleRemindBeforeChange("minutes", value)}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.remindInput}
            placeholder="SS"
            keyboardType="numeric"
            value={remindBefore.seconds.toString()}
            onChangeText={(value) => handleRemindBeforeChange("seconds", value)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7AB2D3",
    textAlign: "center",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldContainerRow: {
    marginBottom: 20,
    flexDirection: "column",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Khoảng cách giữa icon + label và các input
    gap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.5)", // Màu đen với độ trong suốt 50%
    marginBottom: 5,
    fontFamily: "Roboto_400Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  halfInput: {
    width: "48%",
  },
  remindContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remindInput: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
  colon: {
    fontSize: 20,
    alignSelf: "center",
  },
});
