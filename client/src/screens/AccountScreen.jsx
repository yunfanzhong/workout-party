import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { render } from "react-dom";

const UserFriend = (props) => {
  return (
    <TouchableOpacity style={styles.friend}>
      <View style={{ flexDirection: "row", width: "65%" }}>
        <Image
          source={require("../../assets/images/account_circle-24px.svg")}
          style={{
            width: 30,
            height: 32,
            marginRight: 20,
          }}
        />
        <Text style={styles.friendText}>{props.name}</Text>
      </View>
      <View>
        <Image
          source={require("../../assets/images/more_horiz-24px.svg")}
          style={{ width: 30, height: 30, marginLeft: "40%" }}
        />
      </View>
    </TouchableOpacity>
  );
};

function AccountScreen({ navigation }) {
  const [friendButtonColor, setFriendButtonColor] = React.useState("grey");
  const [settingButtonColor, setSettingButtonColor] = React.useState("white");

  const changeButtonColors = () => {
    friendButtonColor === "white"
      ? setFriendButtonColor("grey")
      : setFriendButtonColor("white");
    settingButtonColor === "white"
      ? setSettingButtonColor("grey")
      : setSettingButtonColor("white");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageAndInfo}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/images/account_circle-24px.svg")}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>Jason Jewik</Text>
          <Text style={styles.joinDate}>Joined May 4, 2020</Text>
          <Text style={styles.rank}>Rank: Fitness Junkie</Text>
          <Text style={styles.partiesAttended}>Attended 20 Parties</Text>
        </View>
      </View>
      <View style={styles.buttonPair}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{
              width: "80%",
              backgroundColor: friendButtonColor,
              height: 50,
              marginLeft: "20%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomWidth: 2,
              borderBottomColor: "grey",
              justifyContent: "center",
            }}
            underlayColor="grey"
            onPress={() => {
              changeButtonColors();
            }}
          >
            <View>
              <Text style={styles.buttonText}>Friends List</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{
              width: "80%",
              backgroundColor: settingButtonColor,
              height: 50,
              marginRight: "20%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomWidth: 2,
              borderBottomColor: "grey",
              justifyContent: "center",
            }}
            underlayColor="grey"
            onPress={() => {
              changeButtonColors();
            }}
          >
            <View>
              <Text style={styles.buttonText}>Settings</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View
        style={{
          width: "80%",
          marginLeft: "10%",
          height: "51%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 50,
            width: "80%",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 30, width: 30, marginTop: 15 }}
            source={require("../../assets/images/person_add-24px.svg")}
          />
          <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 15 }}>
            Add Friend
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <UserFriend name="Yunfan Zhong" />
          <UserFriend name="Frank Zheng" />
          <UserFriend name="Ethan Shahbazian" />
          <UserFriend name="Albert Guan" />
          <UserFriend name="Janet Fang" />
          <UserFriend name="Alex Yu" />
          <UserFriend name="Kevin Enemuo" />
          <UserFriend name="David Smallberg" />
          <UserFriend name="Carey Nachenburg" />
          <UserFriend name="Glenn Reinman" />
          <UserFriend name="Paul Eggert" />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  profileImageAndInfo: {
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 30,
  },
  profileInfo: { flexDirection: "column", marginLeft: 30, marginTop: 10 },
  profileImage: { height: 140, width: 140 },
  nameText: { fontSize: 24, fontWeight: "bold" },
  joinDate: { fontSize: 18 },
  rank: { marginTop: 15, fontWeight: "bold", fontSize: 16 },
  partiesAttended: { fontStyle: "italic", fontSize: 16 },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  buttonPair: {
    marginTop: 80,
    height: 50,
    flexDirection: "row",
    width: "100%",
  },
  buttonContainer: {
    width: "50%",
  },
  friendText: {
    fontSize: 18,
    textAlignVertical: "center",
  },
  friend: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginTop: 2,
  },
});

export default AccountScreen;
