import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button
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
        onPress={() => navigation.navigate('Create Event')}
        style={{ width: 50, height: 50, marginTop: 10, marginLeft: 15 }}
      >
        <AddCircleIcon width={40} height={40} fill="black" />
      </TouchableOpacity>
)}

function PartySettingsButton(props) {
	const navigation = useNavigation()
	return(
		<TouchableOpacity
        onPress={() => navigation.navigate('Party Settings')}
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
		API.getWorkoutParty('5ed4342dcb7fcd3438005670').then((data) => {
			this.setState({
				loading: false,
				members: data.members,
				workouts: data.workouts
			})
		})
	}

	render() {
		const memberList = this.state.members.map((m) => (
			<MemberListItem name={m} /> ))

		const eventList = this.state.workouts.map((w) => (
			<EventListItem name={w} /> ))

 	return (
    <View style={styles.container}>
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

      <View style = {{ justifyContent: 'flex-start', borderWidth: 2, borderColor: '#20232a', margin: 8, marginBottom: 0, padding: 5 }}>
     <Text> { memberList } </Text>
     </View>

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
      <View style = {{ justifyContent: 'flex-start', borderWidth: 2, borderColor: '#20232a', marginLeft: 8, marginRight: 8, padding: 5 }}>
      <Text> { eventList } </Text>
      </View>
      </View>
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
