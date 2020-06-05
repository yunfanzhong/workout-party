import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert
} from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import exercises from '../utils/exercises.json'
import API from '../utils/API'
import UserContext from '../context/UserContext'
import Text from '../components/Text'

class Event extends React.Component {
  imageSources = {
    '1': require('../../assets/images/exercise1.png'),
    '2': require('../../assets/images/exercise2.png'),
    '3': require('../../assets/images/exercise3.png'),
    '4': require('../../assets/images/exercise4.png'),
    '5': require('../../assets/images/exercise5.png'),
    '6': require('../../assets/images/exercise6.png'),
    '7': require('../../assets/images/exercise7.png')
  }

  constructor(props) {
    super(props)
    this.state = {
      currentExerciseNumber: 0,
      loading: true,
      data: [],
      currentImageSource: null
    }
    this.props = props
    this.route = props.route
    console.log(props)
    this.navigation = props.navigation
  }

  componentDidMount() {
    try {
      API.getWorkout(this.route.params.id).then((array) => {
        this.setState({
          data: array.exercises,
          loading: false,
          currentImageSource: this.imageSources[array.exercises[0].exerciseID]
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  incrementExercise(context) {
    if (this.state.currentExerciseNumber !== this.state.data.length - 1) {
      this.setState({
        currentExerciseNumber: this.state.currentExerciseNumber + 1,
        currentImageSource: this.imageSources[
          this.state.data[this.state.currentExerciseNumber + 1].exerciseID
        ]
      })
    } else {
      const { id, time } = this.props.route.params
      API.logWorkoutToUser(context.user._id, id, time)
        .then(() =>
          context.update({
            workoutHistory: context.user.workoutHistory.concat({ id, time })
          })
        )
        .then(() =>
          Alert.alert('Yay! 🥳', 'You completed your workout!', [
            {
              text: 'finish',
              onPress: () => this.navigation.navigate('Home')
            }
          ])
        )
        .catch((err) => {
          Alert.alert('Oops!', 'There was an error completing the workout :(')
          console.log(err)
        })
    }
  }

  decrementExercise() {
    if (this.state.currentExerciseNumber !== 0) {
      this.setState({
        currentExerciseNumber: this.state.currentExerciseNumber - 1,
        currentImageSource: this.imageSources[
          this.state.data[this.state.currentExerciseNumber - 1].exerciseID
        ]
      })
    }
  }

  render() {
    const {
      loading,
      data,
      currentImageSource,
      currentExerciseNumber
    } = this.state

    if (loading) {
      return (
        <ActivityIndicator
          style={{ justifyContent: 'center', marginTop: '80%' }}
          size="large"
          color="#ff2559"
        />
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            source={currentImageSource}
            style={{
              width: Math.round(Dimensions.get('window').width * 0.8),
              height: Math.round(Dimensions.get('window').width * 0.8)
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 48,
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 24,
              borderColor: '#ededed',
              borderWidth: 1,
              backgroundColor: 'white',
              padding: 8,
              elevation: currentExerciseNumber ? 8 : 0
            }}
            onPress={() => this.decrementExercise()}
          >
            <Icon
              name="skip-previous"
              size={32}
              color={currentExerciseNumber ? 'black' : 'gray'}
            />
          </TouchableOpacity>
          <View style={styles.exercises}>
            <Text style={styles.exerciseNameText}>
              {exercises[data[currentExerciseNumber].exerciseID]}
            </Text>
            <Text style={styles.exerciseRepText}>
              Reps: {data[currentExerciseNumber].reps}
            </Text>
          </View>
          <UserContext.Consumer>
            {(context) => (
              <TouchableOpacity
                style={{
                  borderRadius: 24,
                  borderColor: '#ededed',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  padding: 8,
                  elevation: 8
                }}
                onPress={() => this.incrementExercise(context)}
              >
                {currentExerciseNumber !== data.length - 1 ? (
                  <Icon name="skip-next" size={32} color="black" />
                ) : (
                  <Icon name="done" size={32} color="green" />
                )}
              </TouchableOpacity>
            )}
          </UserContext.Consumer>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={{ textAlign: 'center', fontSize: 24 }}>
            Exercise {currentExerciseNumber + 1} of {data.length}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  exercises: {
    justifyContent: 'center',
    width: '60%',
    alignContent: 'center',
    height: 96
  },
  exerciseRepText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray'
  },
  exerciseNameText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    borderColor: '#ededed',
    borderWidth: 1,
    marginTop: '7%'
  }
})

export default Event
