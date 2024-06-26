import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        paddingVertical: 100,
        alignItems: "center",
      }}>
      <Text style={{ fontSize: 40, fontWeight: "bold", color: "gray" }}>
        Price Check
      </Text>
      <MaterialIcons name="qr-code-scanner" size={300} color="black" />
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 200,
          color: "gray",
        }}>
        App
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BarcodeItemScanner")}>
        <Text style={styles.textButton}>Start Scanning</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EF018D",
    paddingVertical: 20,
    width: 350,
    borderRadius: 20,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
