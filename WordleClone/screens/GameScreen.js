import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Keyboard from "../components/Keyboard";
import { colors } from "../constants/theme";

const ROWS = 6;

const GameScreen = () => {
  const rows = [];

  const renderRows = () => {
    for (let i = 0; i < ROWS; i++) {
      rows.push(
        <View key={i} style={{ backgroundColor: "green" }}>
          <Text>dhola</Text>
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORDLE</Text>

      <View style={styles.map}>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
        </View>
      </View>
      <View style={styles.keyboardContainer}>
        <Keyboard />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.black,
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: "15%",
    letterSpacing: 7,
  },
  keyboardContainer: {
    marginBottom: 25,
  },
  map: {
    paddingVertical: 20,
    //backgroundColor: "red",
    flex: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    //backgroundColor: "blue",
    width: "100%",
    height: 50,
  },
  cell: {
    borderColor: colors.grey,
    borderWidth: 2,
    marginHorizontal: 8,
    flex: 1,
    aspectRatio: 1,
  },
});
