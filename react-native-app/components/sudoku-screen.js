import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, View, StatusBar, Text } from 'react-native';
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cell from "./sudoku-cell.js";
import {
      responsiveWidth,
      responsiveFontSize
} from "react-native-responsive-dimensions";
import FetchSolvedSudoku from "./assests/solve-sudoku.js";
import ProcessingAnimation from "./processing-animation.js";

export default function Sudoku({ route, navigation }) {

      const { board, pressActive, timeReq } = route.params;
      const [isVisible, setIsVisible] = useState(false);
      const [row, setRow] = useState(null);
      const [column, setColumn] = useState(null);

      const [isModalVisible, setModalVisible] = useState(false);
      const [statusText, setStatusText] = useState("Solving Sudoku\n(Server 1)");
      const [showBackButton, setShowBackButton] = useState(false);

      useEffect(() => {
            StatusBar.setHidden(true);
      }, []);


      const list = [
            { title: 1, onPress: () => { board[row][column] = 1; setIsVisible(false); } },
            { title: 2, onPress: () => { board[row][column] = 2; setIsVisible(false); } },
            { title: 3, onPress: () => { board[row][column] = 3; setIsVisible(false); } },
            { title: 4, onPress: () => { board[row][column] = 4; setIsVisible(false); } },
            { title: 5, onPress: () => { board[row][column] = 5; setIsVisible(false); } },
            { title: 6, onPress: () => { board[row][column] = 6; setIsVisible(false); } },
            { title: 7, onPress: () => { board[row][column] = 7; setIsVisible(false); } },
            { title: 8, onPress: () => { board[row][column] = 8; setIsVisible(false); } },
            { title: 9, onPress: () => { board[row][column] = 9; setIsVisible(false); } },
            {
                  title: 'Clear',
                  containerStyle: { backgroundColor: 'skyblue' },
                  titleStyle: { color: 'white' },
                  onPress: () => { board[row][column] = 0; setIsVisible(false); }
            },
            {
                  title: 'Cancel',
                  containerStyle: { backgroundColor: 'red' },
                  titleStyle: { color: 'white' },
                  onPress: () => { setIsVisible(false); }
            },
      ];
      const side = responsiveWidth(100) / 10;
      let keyValue = 101;
      const handleCellClick = (rowNo, colNo) => {
            setIsVisible(true);
            setRow(rowNo);
            setColumn(colNo);
      }
      let getRow = (rowValue, rowNo) => {
            let element = [];
            for (let i = 0; i < 9; ++i) {
                  if (i % 3 == 0)
                        element.push(<View key={keyValue++} style={{ height: "100%", width: responsiveWidth(1) }} />)
                  element.push(
                        <Pressable key={keyValue++}
                              onPress={() => handleCellClick(rowNo, i)
                              } disabled={!pressActive}>
                              <Cell key={keyValue++} value={rowValue[i]} length={side} />
                        </Pressable >)
            }
            return <View key={keyValue++} style={styles.subContainer}>
                  {element}
            </View >
      }
      let getBoard = () => {
            let element = [];
            for (let i = 0; i < 9; ++i) {
                  if (i % 3 == 0)
                        element.push(<View key={keyValue++} style={{ width: "100%", height: responsiveWidth(1) }} />)
                  element.push(getRow(board[i], i));
            }
            return element;
      }
      const handleSolveClick = () => {
            setModalVisible(true);
            let manual = (timeReq[0] === "E" ? 0 : 1);
            FetchSolvedSudoku(board, navigation, setModalVisible, setStatusText, setShowBackButton, manual);
      }
      return (
            <View style={styles.container}>
                  <BottomSheet isVisible={isVisible}
                        modalProps={{
                              transparent: true, height: "100%",
                              onRequestClose: () => { if (isVisible) { setIsVisible(false); } }
                        }}>
                        {list.map((l, i) => (
                              <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                    <ListItem.Content>
                                          <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                    </ListItem.Content>
                              </ListItem>
                        ))}
                  </BottomSheet>
                  <View style={styles.upper}>
                        <ProcessingAnimation isModalVisible={isModalVisible}
                              showBackButton={showBackButton}
                              statusText={statusText}
                              navigation={navigation}
                              methods={[setModalVisible, setStatusText, setShowBackButton]}
                        />
                        {timeReq != null &&
                              <View style={styles.textView}>
                                    <Text style={styles.textStyle}>
                                          {timeReq}
                                    </Text>
                              </View>
                        }
                        <View style={{}}>
                              {getBoard()}
                        </View>
                  </View>
                  <View style={styles.lower}>
                        {pressActive &&
                              <Button
                                    buttonStyle={styles.buttonStyle}
                                    onPress={() => { handleSolveClick() }}
                                    icon={
                                          <Icon
                                                name="casino"
                                                size={40}
                                                color="black"
                                          />
                                    }
                                    title=" Solve Sudoku"
                                    titleStyle={{ color: "black" }}
                              />
                        }
                        {timeReq !== null && !pressActive &&
                              <Button
                                    buttonStyle={[styles.buttonStyle, { width: 190 }]}
                                    onPress={() => { navigation.navigate("Home"); }}
                                    icon={
                                          <Icon
                                                name="home"
                                                size={40}
                                                color="black"
                                          />
                                    }
                                    title=" Home Screen"
                                    titleStyle={{ color: "black" }}
                              />
                        }
                  </View>
            </View >
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: "column",
      },
      subContainer: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
      },
      textStyle: {
            fontSize: responsiveFontSize(2.2),
            fontFamily: "monospace",
            color: "#000",
            fontWeight: "bold",
            textAlign: "center",
            alignSelf: "center"
      },
      buttonStyle: {
            height: 60,
            width: 190,
            backgroundColor: "transparent",
            borderRadius: 40,
            borderWidth: 5,
            borderColor: "#000",
      },
      lower: {
            flex: 0.35,
            flexDirection: "column",
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: "#F19135",
      },
      upper: {
            flex: 0.65,
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
      }
});
