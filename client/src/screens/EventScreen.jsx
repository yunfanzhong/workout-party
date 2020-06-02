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
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import exercises from '../utils/exercises.json'

function Event({ navigation, route }) {
  const [currentExerciseNumber, setCurrentExerciseNumber] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [currentImageSource, setCurrentImageSource] = React.useState(null)

  React.useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = () => {
    const array = [
      { reps: 10, exerciseID: '2' },
      { reps: 20, exerciseID: '4' }
    ]
    setData(array)
    setLoading(false)
    setCurrentImageSource(imageSources[array[0].exerciseID])
  }

  const exerciseArrayValues = []
  const exercisesArray = []
  if (!loading) {
    for (let i = 0; i < data.length; i++) {
      exerciseArrayValues[i] = data[i].exerciseID
      exercisesArray[i] = exercises[exerciseArrayValues[i]]
    }
  }

  const imageSources = {
    '1': require('../../assets/images/exercise1.png'),
    '2': require('../../assets/images/exercise2.png'),
    '3': require('../../assets/images/exercise3.png'),
    '4': require('../../assets/images/exercise4.png'),
    '5': require('../../assets/images/exercise5.png'),
    '6': require('../../assets/images/exercise6.png'),
    '7': require('../../assets/images/exercise7.png')
  }

  const incrementExercise = () => {
    if (currentExerciseNumber !== exercisesArray.length - 1) {
      setCurrentExerciseNumber(currentExerciseNumber + 1)
      setCurrentImageSource(
        imageSources[exerciseArrayValues[currentExerciseNumber + 1]]
      )
    } else {
      navigation.navigate('Home')
    }
  }

  const decrementExercise = () => {
    if (currentExerciseNumber !== 0) {
      setCurrentExerciseNumber(currentExerciseNumber - 1)
      setCurrentImageSource(
        imageSources[exerciseArrayValues[currentExerciseNumber - 1]]
      )
    }
  }

  return loading ? (
    <Text>Hello</Text>
  ) : (
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
          <TouchableOpacity onPress={() => decrementExercise()}>
            {currentExerciseNumber !== 0 ? (
              <Icon name="skip-previous" size={60} color="black" />
            ) : (
              <Icon name="skip-previous" size={60} color="grey" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.exercises}>
          <Text style={styles.exerciseNameText}>
            {exercisesArray[currentExerciseNumber]}
          </Text>
          <Text style={styles.exerciseRepText}>
            Reps: {data[currentExerciseNumber].reps}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => incrementExercise()}>
            {currentExerciseNumber !== exercisesArray.length - 1 ? (
              <Icon name="skip-next" size={60} color="black" />
            ) : (
              <Icon name="done" size={60} color="green" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.exerciseRepText}>
          Exercise: {currentExerciseNumber + 1} of {exercisesArray.length}
        </Text>
      </View>
    </View>
  )
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
