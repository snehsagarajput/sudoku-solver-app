import React, { useEffect } from 'react';
import { StyleSheet, Image, View, StatusBar } from 'react-native';

export default function SplashScreen({ setLoading }) {

      const serverOne = "https://sudoku-solver-app.ml";
      const serverTwo = "https://sudoku-solver-android-app.herokuapp.com";
      const serverThree = "https://sudokusolver.pythonanywhere.com";

      let activateServers = (site) => {  //Dummy request to activate servers
            let request = new XMLHttpRequest();
            request.open('GET', site + "/activate", true);
            request.send();
      }

      const splashScreenTime = 4000;

      useEffect(() => {
            activateServers(serverOne);
            activateServers(serverTwo);
            activateServers(serverThree);
            StatusBar.setHidden(true);
            setTimeout(() => { setLoading(false); }, splashScreenTime);
      }, []);


      return (
            <View style={styles.container}>
                  <Image
                        style={styles.image}
                        source={require("./assests/logo_.jpg")}
                  />
            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#8CB0C3"
      },
      image: {
            height: 105,
            width: 170
      }
});
