import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      <MaterialCommunityIcons name="barcode-scan" size={300} color="black" />
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 80,
          color: "gray",
        }}>
        App
      </Text>
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}>
        <Text>version 2.0.0{"\n"}</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            Here’s an improved version:
          </Text>
          {"\n"}
          {"\n"}
          -You can now click on the UPC and SKU to search directly on Google
          Images.{"\n"}
          -You can view the sub-department of each item.
        </Text>
      </View>
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
