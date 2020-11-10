import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
      responsiveHeight,
      responsiveFontSize
} from "react-native-responsive-dimensions";


export default function Cell({ value, length }) {
      return (
            <View style={[styles.cellDimensions,
            { height: length, width: length, backgroundColor: value == 0 ? '#4E8090' : "#2879FF" }]}>
                  <Text style={styles.text}>{value == 0 ? " " : value}</Text>
            </View>
      );
}

const styles = StyleSheet.create({
      cellDimensions: {
            borderColor: "#acf",
            borderWidth: 1,
      },
      text: {
            textAlign: "center",
            fontSize: responsiveFontSize(2.6),
            color: "white",
            paddingTop: responsiveHeight(0.25),
            fontFamily: "monospace",
      }
});
