import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
      return (
            <View style={styles.container}>
                  <View style={styles.upper}>
                        <Text style={styles.heading}>Sudoku Solver</Text>
                        <Text style={styles.subheading}>solve any sudoku</Text>
                  </View>
                  <View style={styles.lower}>
                        <Button
                              buttonStyle={styles.buttonStyle}
                              onPress={() => { navigation.push("Upload") }}
                              icon={
                                    <Icon
                                          name="wallpaper"
                                          size={30}
                                          color="black"
                                    />
                              }
                              title="  Scan/Upload"
                              titleStyle={{ color: "black" }}
                        />
                        <Button
                              buttonStyle={styles.buttonStyle}
                              onPress={() => {
                                    let board = [];
                                    for (let i = 0; i < 9; ++i) {
                                          board.push(new Array(9).fill(0));
                                    }
                                    navigation.push("SudokuScreen", { board: board, pressActive: true, timeReq: "Tap required cell\nto enter values" })
                              }
                              }
                              icon={
                                    <Icon
                                          name="keyboard"
                                          size={30}
                                          color="black"
                                    />
                              }
                              title=" Enter Manually"
                              titleStyle={{ color: "black" }}
                        />
                  </View>
            </View >
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: "column",
      },
      heading: {
            fontSize: responsiveFontSize(4.2),
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold"
      },
      subheading: {
            fontSize: responsiveFontSize(2.2),
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
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
