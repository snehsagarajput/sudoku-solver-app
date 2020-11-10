import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { ColorDotsLoader } from 'react-native-indicator';
import {
      responsiveHeight,
      responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProcessingAnimation({ isModalVisible, showBackButton, statusText, navigation, methods }) {

      const randColor = () => {
            let arr = ["#FF6F61", "#88B04B", "#F7CAC9", "#92A8D1", "#B565A7", "#009B77", "#DD4124", "#55B4B0", "#C3447A", "#C3447A"];
            return arr[Math.floor(Math.random() * 10)];
      }
      // <EatBeanLoader size={50} />
      return (
            <Overlay fullScreen isVisible={isModalVisible} overlayStyle={styles.overlay}>
                  <View style={styles.overlayContent}>
                        <View style={styles.bottomSheet}>
                              <ColorDotsLoader betweenSpace={20} size={18} />
                        </View>
                        <View style={styles.textView}>
                              <Text style={[styles.textContent, { color: randColor() }]}>
                                    {statusText}
                              </Text>
                        </View>
                        {showBackButton
                              &&
                              <View style={[styles.buttonView, { marginTop: responsiveHeight(6), }]}>
                                    <Button
                                          buttonStyle={styles.buttonStyle}
                                          onPress={() => {
                                                if (methods === null) {
                                                      navigation.goBack();
                                                }
                                                else {
                                                      methods[0](false);
                                                      methods[2](false);
                                                      methods[1]((methods === null ? "Extracting" : "Solving") + " Sudoku\n(Server 1)");
                                                }
                                          }
                                          }
                                          icon={
                                                <Icon
                                                      name="reply"
                                                      size={30}
                                                      color="white"
                                                />
                                          }
                                          title={methods === null ? " Go Back" : " Close  "}
                                    //title={methods === null ? " Go Back" : " Close  "}
                                    />
                              </View>}
                  </View>
            </Overlay>
      );
}

const styles = StyleSheet.create({
      buttonView: {
            flex: 0.12,
      },
      buttonStyle: {
            height: 40,
            width: 160,
            backgroundColor: "#2288FF",
      },
      overlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.82)'
      },
      overlayContent: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
      },
      bottomSheet: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
      },
      textView: {
            marginTop: responsiveHeight(5),
      },
      textContent: {
            fontSize: responsiveFontSize(2.5),
            fontFamily: "monospace",
            textAlign: "center"
      }
});
