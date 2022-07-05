import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Keyboard from "../components/Keyboard";
import { colors } from "../constants/theme";

const GameScreen = () => {
  const word = "hello";
  const letters = word.split("");
  const [tries, setTries] = useState(6);
  const [rows, setRows] = useState(
    new Array(tries).fill(new Array(letters.length).fill(""))
  );

  const onKeyPressed = (key) => {
    console.log(key);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORDLE</Text>

      <View style={styles.map}>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((cell, index) => (
              <View key={index} style={styles.cell}>
                <Text style={styles.guess}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.keyboardContainer}>
        <Keyboard onKeyPressed={onKeyPressed} />
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
    flex: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.darkgrey,
    borderWidth: 2,
    marginHorizontal: 5,
    maxWidth: 50,
    flex: 1,
    aspectRatio: 1,
  },
  guess: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
  },
});
