import { Alert, StyleSheet, Text, View } from "react-native";
import { CLEAR, ENTER, colors } from "../constants/theme";
import React, { useEffect, useState } from "react";

import Keyboard from "../components/Keyboard";
import axios from "axios";

const GameScreen = () => {
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [tries, setTries] = useState(6);
  const [rows, setRows] = useState(
    new Array(tries).fill(new Array(letters.length).fill(""))
  );
  const [currentCell, setCurrentCell] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [greenCaps, setGreenCaps] = useState([]);
  const [yellowCaps, setYellowCaps] = useState([]);
  const [greyCaps, setGreyCaps] = useState([]);

  const getRandomWord = () => {
    axios
      .get("https://palabras-aleatorias-public-api.herokuapp.com/random")
      .then((response) => {
        console.log(response.data.body.Word);
        setWord(response.data.body.Word.toUpperCase());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const options = {
  //   method: "GET",
  //   url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
  //   params: { count: "2", maxLength: "7" },
  //   headers: {
  //     "X-RapidAPI-Key": "2a58126853mshd02106ea5d89ef1p1ca5cdjsn30a22734b65d",
  //     "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
  //   },
  // };

  useEffect(() => {
    const wordLetters = word.split("");
    setLetters(wordLetters);
    setRows(new Array(tries).fill(new Array(wordLetters.length).fill("")));
  }, [word]);

  useEffect(() => {
    getRandomWord();
  }, []);

  const changeBackground = (rowIndex, cellIndex, cell) => {
    if (rowIndex >= currentRow) {
      return colors.black;
    }
    if (cell.toUpperCase() === letters[cellIndex]) {
      greenCaps.push(cell);
      return colors.primary;
    }
    if (letters.includes(cell.toUpperCase())) {
      yellowCaps.push(cell);
      return colors.secondary;
    }
    greyCaps.push(cell);
    return colors.darkgrey;
  };

  const checkGame = () => {
    if (rows[currentRow].join("").toUpperCase() === letters.join("")) {
      Alert.alert("Ganaste!", "", [
        {
          text: "Jugar de nuevo",
          onPress: () => {
            // GET NEW WORD FROM ENDPOINT
            getRandomWord();
            setRows(new Array(tries).fill(new Array(letters.length).fill("")));
            setCurrentRow(0);
            setCurrentCell(0);
            setGreenCaps([]);
            setYellowCaps([]);
            setGreyCaps([]);
          },
        },
      ]);
    } else if (currentRow === tries - 1) {
      Alert.alert("Perdiste!", `La palabra era ${word}`, [
        {
          text: "Jugar de nuevo",
          onPress: () => {
            // GET NEW WORD FROM ENDPOINT
            getRandomWord();
            setRows(new Array(tries).fill(new Array(letters.length).fill("")));
            setCurrentRow(0);
            setCurrentCell(0);
            setGreenCaps([]);
            setYellowCaps([]);
            setGreyCaps([]);
          },
        },
      ]);
    }
  };

  const onKeyPressed = (key) => {
    let newArr = [...rows.map((row) => [...row])];
    if (key === CLEAR) {
      if (currentCell - 1 >= 0) {
        newArr[currentRow][currentCell - 1] = "";
        setCurrentCell(currentCell - 1);
      }
    } else if (key === ENTER) {
      if (rows[currentRow][rows[currentRow].length - 1] !== "") {
        if (currentRow < tries - 1) {
          setCurrentRow(currentRow + 1);
          setCurrentCell(0);
        }
        checkGame();
      }
    } else {
      if (currentCell < rows[currentRow].length) {
        newArr[currentRow][currentCell] = key;
        setCurrentCell(currentCell + 1);
      }
    }
    setRows(newArr);
  };

  const isCellActive = (row, cell) => {
    return row === currentRow && cell === currentCell;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORDLE</Text>

      <View style={styles.map}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(rowIndex, cellIndex)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: changeBackground(
                      rowIndex,
                      cellIndex,
                      cell
                    ),
                  },
                ]}
              >
                <Text style={styles.guess}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.keyboardContainer}>
        <Keyboard
          onKeyPressed={onKeyPressed}
          greenCaps={greenCaps}
          yellowCaps={yellowCaps}
          greyCaps={greyCaps}
        />
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
