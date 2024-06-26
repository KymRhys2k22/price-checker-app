import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  Touchable,
  TouchableOpacity,
  TextComponent,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Items from "../items.json";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function BarCodeItemScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    const result = () =>
      Items.filter((item) => item.SKU === data || item.UPC === data).map(
        (items) => {
          setModalVisible(true);
          setResults(items);
        }
        /* alert(`your Item: ${items.Description} Price: ${items.Price}`) */
      );
    result();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        BarCodeBounds
        BarCodeSize={{}}
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
      <SimpleLineIcons
        style={{ top: 1, left: 1 }}
        name="frame"
        size={300}
        color="#fff"
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
            SCAN AGAIN
          </Text>
        </TouchableOpacity>
      )}

      <StatusBar style="='auto" />
    </View>
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
    backgroundColor: "white",
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "gray",
  },
  modalTextResult: {
    fontWeight: "bold",
    color: "#252525",
    fontSize: 25,
  },
});
