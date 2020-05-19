import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";

import AccountIcon from "../../assets/images/account_circle-24px.svg";
import AddFriend from "../../assets/images/person_add-24px.svg";
import DeleteIcon from "../../assets/images/highlight_off_24px.svg";

const UserFriend = (props) => {
  return (
    <TouchableOpacity
      style={styles.friend}
      onPress={() => {
        createDeleteFriendAlert(`${props.name}`);
      }}
    >
      <View style={{ flexDirection: "row", width: "65%" }}>
        <AccountIcon width={30} height={30} fill="black" marginRight={20} />
        <Text style={styles.friendText}>{props.name}</Text>
      </View>
      <View>
        <DeleteIcon width={30} height={30} marginLeft={"40%"} fill="black" />
      </View>
    </TouchableOpacity>
  );
};

const createDeleteFriendAlert = (name) => {
  Alert.alert(
    "",
    `Are you sure you want to delete ${name} from your friend list?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => deleteFriend(name),
      },
    ],
    { cancelable: true }
  );
};

const deleteFriend = (props) => {};

const FriendMenu = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          width: "80%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <AddFriend height={30} width={30} marginTop={15} fill="black" />
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
  );
};

const SettingsMenu = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 100,
          width: "80%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 50, width: 50, marginTop: 15, marginLeft: 40 }}
          source={require("../../assets/images/spotify.png")}
        />
        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 15 }}>
          Connect your Spotify account!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function AccountScreen({ navigation }) {
  const [friendButtonColor, setFriendButtonColor] = React.useState("grey");
  const [settingButtonColor, setSettingButtonColor] = React.useState("white");
  const [showFriendMenu, setShowFriendMenu] = React.useState(true);

  const changeButtonColors = () => {
    friendButtonColor === "white"
      ? setFriendButtonColor("grey")
      : (setFriendButtonColor("white"), setShowFriendMenu(false));
    settingButtonColor === "white"
      ? setSettingButtonColor("grey")
      : (setSettingButtonColor("white"), setShowFriendMenu(true));
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
              backgroundColor: friendButtonColor,
              height: 50,
              marginLeft: "20%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
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
              backgroundColor: settingButtonColor,
              height: 50,
              marginRight: "20%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
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
        {showFriendMenu ? <FriendMenu /> : <SettingsMenu />}
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
    marginBottom: 2,
  },
  friend: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginTop: 2,
  },
});

export default AccountScreen;
