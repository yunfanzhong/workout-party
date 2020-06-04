import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native'
import {
  FlingGestureHandler,
  Directions,
  State
} from 'react-native-gesture-handler'
import MoreHorizIcon from '../../assets/images/more_horiz-24px.svg'
import AddCircleIcon from '../../assets/images/add_circle_outline-24px.svg'
import UserContext from '../context/UserContext'
import ListItem from '../components/ListItem.jsx'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import React from 'react'
import API from '../utils/API'

function MemberListItem(props) {
	return(
		// add navigation to profile?
	<Text style = {{ fontFamily: 'Roboto', fontSize: 20, textAlign: 'left' }} >{props.name} {"\n"} </Text>
)}

function EventListItem(props) {
	return(
		// add navigation to workout page?
	<Text style = {{ fontFamily: 'Roboto', fontSize: 20, textAlign: 'left' }} >{props.name} {"\n"} </Text>
)}

function Header(props) {
	const route = useRoute()
	return(
		<Text style={{
          marginTop: 10,
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 40
        }}> { route.params.partyName } </Text>
)}

function AddWorkoutButton(props) {
	const navigation = useNavigation()
	return(
		<TouchableOpacity
        onPress={() => navigation.navigate('Create Event', {
            partyID: props.partyID
          })}
        style={{ width: 50, height: 50, marginTop: 10, marginLeft: 15 }}
      >
        <AddCircleIcon width={40} height={40} fill="black" />
      </TouchableOpacity>
)}

function PartySettingsButton(props) {
	const navigation = useNavigation()
	return(
		 <TouchableOpacity
        onPress={() =>
          navigation.navigate('Party Settings', {
            partyID: props.partyID
          })
        }
        style={{ width: 50, marginTop: 10, marginLeft: 5 }}
      >
        <MoreHorizIcon width={40} height={40} fill="black"/>
      </TouchableOpacity>
)}

class PartyInfoScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			members: [],
			workouts: []
		}
	}

	componentDidMount() {
		const { route } = this.props
		try {
			API.getWorkoutParty(route.params.partyID).then(async (data) => {
				const mIDs = data.members
				const wIDs = data.workouts
				await Promise.all(mIDs.map(async (id) => await API.getUser(id))).then(
					(users) => {
						const members = users.map((user) => {
                			return user.username
              			})
						this.setState({ members: members })
					})
				await Promise.all(wIDs.map(async (id) => await API.getWorkout(id))).then(
					(workouts) => {
						const ws = workouts.map((w) => {
                			return w.name
              			})
						this.setState({ workouts: ws, loading: false })
					})
			})
		}
		catch(error) {
			console.log(error)
		}
	}
	
	render() {
		const memberList = this.state.members.map((m) => (
			<MemberListItem name={m} /> ))

		const eventList = this.state.workouts.map((w) => (
			<EventListItem name={w} /> ))

 	return (
    <ScrollView style={styles.container}>
      <Header />
      <Text
        style={{
          marginTop: 10,
          marginLeft: 15,
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'left',
          fontSize: 25
        }}
      >
        Member List:
      </Text>

      <ScrollView style = {{ borderWidth: 2, borderColor: '#20232a', margin: 8, marginBottom: 0, padding: 5, width: '95%', height: 250}}>
     <Text> { memberList } </Text>
     </ScrollView>

      <View style = {{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <Text
        style={{
          marginTop: 10,
          marginLeft: 15,
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'left',
          fontSize: 25
        }}
      >
        Upcoming Events:
      </Text>
      <AddWorkoutButton />
      <PartySettingsButton />
      </View>
      <ScrollView style = {{ borderWidth: 2, borderColor: '#20232a', marginLeft: 8, marginRight: 8, padding: 5, width: '95%', height: 250 }}>
      <Text> { eventList } </Text>
      </ScrollView>
      </ScrollView>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default PartyInfoScreen
