import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProcessImage from "./assests/process-image.js";
import ProcessingAnimation from "./processing-animation.js";
import {
      responsiveHeight,
      responsiveWidth,
      responsiveFontSize
} from "react-native-responsive-dimensions";


export default function SelectedImageScreen({ route, navigation }) {

      const { image } = route.params;
      const [isModalVisible, setModalVisible] = useState(false);
      const [statusText, setStatusText] = useState("Extracting Sudoku\n(Server 1)");
      const [showBackButton, setShowBackButton] = useState(false);


      const handlePress = () => {
            setModalVisible(true);
            ProcessImage(image, navigation, setModalVisible,
                  setStatusText, setShowBackButton);
      }




      return (
            <View style={styles.container}>
                  <ProcessingAnimation isModalVisible={isModalVisible}
                        showBackButton={showBackButton}
                        statusText={statusText}
                        navigation={navigation}
                        methods={null}
                  />

                  <View style={styles.upper}>

                        <Text style={styles.instructions}>Ensure that the Sudoku's border is clearly visible</Text>
                        <Image
                              style={styles.image}
                              source={{ uri: image }}
                        />
                  </View>
                  <View style={styles.lower}>
                        <Button
                              buttonStyle={styles.buttonStyle}
                              onPress={() => { handlePress() }}
                              icon={
                                    <Icon
                                          name="memory"
                                          size={38}
                                          color="black"
                                    />
                              }
                              title=" Extract Sudoku"
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
      image: {
            height: responsiveWidth(90),
            width: responsiveWidth(90),
            borderWidth: 2,
            borderColor: '#fff',
      },
      instructions: {
            fontSize: responsiveFontSize(2.45),
            fontFamily: "monospace",
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            marginBottom: responsiveHeight(1)
      },
      buttonStyle: {
            height: 60,
            width: 195,
            backgroundColor: "transparent",
            borderRadius: 40,
            borderWidth: 5,
            borderColor: "#000",
      },
      upper: {
            flex: 0.65,
            alignItems: "center",
            justifyContent: 'center',
      },
      lower: {
            flex: 0.35,
            flexDirection: "column",
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: "#F19135",
      },
});
