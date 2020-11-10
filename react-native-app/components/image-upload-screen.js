import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Button, Icon } from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";

export default function ImageScreen({ navigation }) {
      /*const getCameraPermission = async () => {
            const state = await ImagePicker.requestCameraPermissionsAsync();
            if (state.granted) {
                  return 1;
            }
            else {
                  Alert.alert("Camera Access Required");
                  return 0;
            }
      }
      const getCameraRollPermission = async () => {
            const state = await ImagePicker.requestCameraRollPermissionsAsync();
            if (state.granted) {
                  return 1;
            }
            else {
                  Alert.alert("Gallery Access Required");
                  return 0;
            }
      }*/
      const parameters = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
      };
      const pickCameraImage = async () => {
            let result = await ImagePicker.launchCameraAsync(parameters);
            if (!result.cancelled) {
                  //console.log(result.uri)
                  navigation.navigate("ImageScreen", { image: result.uri })
            }
      };
      const pickCameraRollImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync(parameters);
            if (!result.cancelled) {
                  //console.log(result.uri)
                  navigation.navigate("ImageScreen", { image: result.uri })
            }
      };

      let textToDisplay = "Scan/Pick a non-blurry image containing a Sudoku Puzzle such that Sudoku's" +
            " square borders are clearly visible for best result.\n\nYou can edit an selected image later.\n";

      return (
            <View style={styles.container}>
                  <View style={styles.upper}>
                        <Text style={styles.textStyle}>{textToDisplay}</Text>
                        <Image source={require("./assests/example.jpg")}
                              style={styles.exampleImage} />
                  </View>
                  <View style={styles.lower}>
                        <Button
                              buttonStyle={styles.buttonStyle}
                              onPress={() => {
                                    pickCameraImage();
                                    /*Alert.alert(
                                          "Access Denied",
                                          "Please allow access to Camera and Camera Roll",
                                    );*/
                              }}
                              icon={
                                    <Icon
                                          name='center-focus-strong'
                                          type='material'
                                          color="black"
                                          size={34}
                                    />
                              }
                              title="  Scan"
                              titleStyle={{ color: "black" }}
                        />
                        <Button
                              buttonStyle={styles.buttonStyle}
                              onPress={() => {
                                    pickCameraRollImage();
                              }}
                              icon={
                                    <Icon
                                          name='collections'
                                          type='material'
                                          color="black"
                                          size={30}
                                    />
                              }
                              title=" Choose"
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
      textStyle: {
            fontSize: responsiveFontSize(2.12),
            fontFamily: "monospace",
            color: "#000",
            fontWeight: "bold",
            textAlign: "center",
            alignItems: "center",
      },
      buttonStyle: {
            height: 60,
            width: 190,
            backgroundColor: "transparent",
            borderRadius: 40,
            borderWidth: 5,
            borderColor: "#000",
      },
      exampleImage: {
            height: responsiveWidth(50),
            width: responsiveWidth(50),
            borderWidth: 5,
            borderColor: '#fff',
      },
      upper: {
            flex: 0.65,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: responsiveWidth(12),
            marginRight: responsiveWidth(12),
      },
      lower: {
            flex: 0.35,
            flexDirection: "column",
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: "#F19135",
      },

});
