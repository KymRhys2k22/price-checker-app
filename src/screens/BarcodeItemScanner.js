import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Items from "../items.json";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BarCodeItemScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState({});
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    //**map items file from json and filter
    const result = () =>
      Items.filter((item) => item.SKU === data || item.UPC === data).map(
        (items) => {
          setModalVisible(true);
          setResults(items);
        }
      );
    result();
  };

  const handleManualInput = ({ data }) => {
    if (!data) {
      return;
    }
    setScanned(true);
    //**map items file from json and filter
    const result = () =>
      Items.filter((item) => item.SKU === data || item.UPC === data).map(
        (items) => {
          setModalVisible(true);
          setResults(items);
        }
      );
    result();
  };

  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "row",
        }}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 24 }}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
      behavior="padding"
      style={styles.container}>
      <BarCodeScanner
        BarCodeBounds
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && !modalVisible && (
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}>
            <Text style={{ fontSize: 30 }}>⚠️</Text> NO RECORD
          </Text>
        </View>
      )}
      <MaterialCommunityIcons
        style={{ top: -8, left: 1 }}
        name="scan-helper"
        size={300}
        color="#F4F3F2"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Description:
              <Text style={styles.modalTextResult}>
                {`\n`}
                {results.Description}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              UPC:
              <Text style={styles.modalTextResult}>
                {`\n`}
                {results.SKU}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              SKU:
              <Text style={styles.modalTextResult}>
                {`\n`}
                {results.UPC}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Price:
              <Text style={styles.modalTextResult}>
                {`\n`}₱{results.Price}
              </Text>
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setScanned(false);
                setModalVisible(!modalVisible);
                setResults({});
                setManualInput("");
              }}>
              <Text style={styles.textStyle}>Tap to Scan Again</Text>
            </Pressable>
            <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>
              Pinag-puyatan by: {"\n"}KYM RHYS MALLARI
            </Text>
          </View>
        </View>
      </Modal>

      {scanned && !modalVisible && (
        <TouchableOpacity
          style={{
            backgroundColor: "#DC143C",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
          onPress={() => setScanned(false)}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}>
            SCAN/INPUT AGAIN
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.manualInput}>
        <TextInput
          style={{ fontSize: 24, width: "90%" }}
          placeholder="SKU or UPC"
          value={manualInput}
          onChangeText={setManualInput}
          keyboardType="numeric"
          maxLength={13}
          onBlur={() => handleManualInput({ data: manualInput })}
        />
        <MaterialCommunityIcons
          onPress={() => handleManualInput({ data: manualInput })}
          name="text-search"
          size={24}
          color="red"
        />
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#252525",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#F4F3F2",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "#CCCCCC",
  },
  modalTextResult: {
    fontWeight: "bold",
    color: "#F4F3F2",
    fontSize: 25,
  },
  manualInput: {
    position: "static",
    borderWidth: 1,
    borderColor: "#252525",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    bottom: -100,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
