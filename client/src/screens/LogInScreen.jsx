import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

function LogInScreen({ navigation }) {
  const handleLogIn = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/bicep.png")}
      />
      <View>
        <Text style={styles.homeText}>Workout{"\n"}Party</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogIn}>
          <Image
            style={styles.fbLogo}
            source={require("../../assets/images/f_logo_RGB-Hex-Blue_512.png")}
          />
          <Text style={styles.fbButtonText}>Get Started with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ff2559",
    alignContent: "center",
  },
  logo: { alignContent: "center", width: 400, height: 400 },
  button: {
    backgroundColor: "#f6e8ea",
    alignItems: "center",
    height: 70,
    width: "80%",
    alignSelf: "center",
    marginTop: 30,
    color: "#f6e8ea",
    flexDirection: "row",
    borderRadius: 20,
  },
  homeText: {
    fontSize: 64,
    textAlign: "center",
    color: "white",
    //fontFamily: "OpenSans-Regular",
    marginBottom: 10,
  },
  fbButtonText: {
    fontSize: 19,
    color: "#22181c",
    marginLeft: 12,
  },
  fbLogo: {
    height: 44,
    width: 44,
    marginTop: 1.2,
    marginLeft: 15,
  },
});

export default LogInScreen;
