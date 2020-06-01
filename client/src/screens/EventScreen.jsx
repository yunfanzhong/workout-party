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
  // const [loading, setLoading] = React.useState(true)
  // const [data, setData] = React.useState(null)
  // React.useEffect(() => {
  //   fetchData
  // }, [])
  const reps = [10, 20, 30, 40, 50, 60, 70]

  const exercisesArray = Object.values(exercises)

  const imageSources = [
    require('../../assets/images/squats.png'),
    require('../../assets/images/plank.png'),
    require('../../assets/images/mountain-climbers.png'),
    require('../../assets/images/push-ups.png'),
    require('../../assets/images/sit-ups.png'),
    require('../../assets/images/leg-raises.png'),
    require('../../assets/images/lunges.png')
  ]
  const [currentImageSource, setCurrentImageSource] = React.useState(
    imageSources[currentExerciseNumber]
  )

  const incrementExercise = () => {
    if (currentExerciseNumber !== exercisesArray.length - 1) {
      setCurrentExerciseNumber(currentExerciseNumber + 1)
      setCurrentImageSource(imageSources[currentExerciseNumber + 1])
    } else {
      navigation.navigate('Home')
    }
  }

  const decrementExercise = () => {
    if (currentExerciseNumber !== 0) {
      setCurrentExerciseNumber(currentExerciseNumber - 1)
      setCurrentImageSource(imageSources[currentExerciseNumber - 1])
    }
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
            Reps: {reps[currentExerciseNumber]}
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
