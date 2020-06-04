import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native'
import {
  FlingGestureHandler,
  Directions,
  State
} from 'react-native-gesture-handler'
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import exercises from '../utils/exercises.json'
import API from '../utils/API'

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

  incrementExercise() {
    if (this.state.currentExerciseNumber !== this.state.data.length - 1) {
      this.setState({
        currentExerciseNumber: this.state.currentExerciseNumber + 1,
        currentImageSource: this.imageSources[
          this.state.data[this.state.currentExerciseNumber + 1].exerciseID
        ]
      })
    } else {
      this.navigation.navigate('Home')
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
            style={{ width: 300, height: 320 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            marginTop: 80,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View>
            <TouchableOpacity onPress={() => this.decrementExercise()}>
              {currentExerciseNumber !== 0 ? (
                <Icon name="skip-previous" size={60} color="black" />
              ) : (
                <Icon name="skip-previous" size={60} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.exercises}>
            <Text style={styles.exerciseNameText}>
              {exercises[data[currentExerciseNumber].exerciseID]}
            </Text>
            <Text style={styles.exerciseRepText}>
              Reps: {data[currentExerciseNumber].reps}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.incrementExercise()}>
              {currentExerciseNumber !== data.length - 1 ? (
                <Icon name="skip-next" size={60} color="black" />
              ) : (
                <Icon name="done" size={60} color="green" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.exerciseRepText}>
            Exercise: {currentExerciseNumber + 1} of {data.length}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  exercises: {
    justifyContent: 'center',
    width: '60%',
    alignContent: 'center'
  },
  exerciseRepText: {
    fontSize: 24,
    textAlign: 'center'
  },
  exerciseNameText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    marginTop: '10%',
    width: 300,
    height: 320,
    marginHorizontal: '10%'
  }
})

export default Event
