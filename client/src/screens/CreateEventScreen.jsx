import React from 'react'
import { View, StyleSheet, Text, Picker, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'

import FormInput from '../components/FormInput'
import RedButton from '../components/RedButton'
import DayOfTheWeekPicker from '../components/DayOfTheWeekPicker'
import FormLabel from '../components/FormLabel'
import FormPicker from '../components/FormPicker'
import ErrorText from '../components/ErrorText'
import BlankModal from '../components/BlankModal'
import { H3 } from '../components/Header'
import OutlinedButton from '../components/OutlinedButton'
import API from '../utils/API'

// TEMPORARY!!
const EXERCISES = {
  '1': 'Push ups',
  '2': 'Squats',
  '3': 'Lunges',
  '4': 'Leg raises',
  '5': 'Calf raises',
  '6': 'Burpees',
  '7': 'Mountain climbers'
}

const BASE_TIME = 3600000 * 8 // The first 12 AM of all time

class CreateEventScreen extends React.Component {
  state = {
    timePickerVisible: false,
    exerciseModalVisible: false,
    form: {
      days: [],
      time: null,
      name: '',
      exercises: []
    },
    error: null
  }

  handleToggleTimePicker = () => {
    this.setState({ timePickerVisible: !this.state.timePickerVisible })
  }

  setExerciseModalVisible = (visible) => {
    this.setState({
      exerciseModalVisible:
        visible === undefined ? !this.state.exerciseModalVisible : visible
    })
  }

  handleTimePickerEvent = (event) => {
    if (event.type === 'set') {
      this.setState({ timePickerVisible: false }, () =>
        this.handleFormChange('time', event.nativeEvent.timestamp)
      )
    } else if (event.type === 'dismissed') {
      this.setState({ timePickerVisible: false })
    }
  }

  handleFormChange = (name, value) => {
    const form = { ...this.state.form, [name]: value }
    this.setState({ form })
  }

  handleSubmit = () => {
    const { days, time, name, exercises } = this.state.form
    // Validate form
    if (name.length === 0 || name.length > 20) {
      this.setState({
        error: 'Please enter a valid workout name.'
      })
    } else if (days.length === 0) {
      this.setState({ error: 'Please choose a day.' })
    } else if (time === null) {
      this.setState({ error: 'Please choose a time.' })
    } else if (exercises.length === 0) {
      this.setState({ error: 'Please select an exercise.' })
    } else {
      this.setState({ error: null }, async () => {
        const minute = moment(time).minute()
        const hour = moment(time).hour()
        await API.createWorkoutEvent({ name, minute, hour, days, exercises })
        this.props.navigation.navigate('Home')
      })
    }
  }

  handleAddExercise = ({ id, reps }) => {
    const exercises = this.state.form.exercises.concat({
      id,
      reps
    })
    this.setState(
      {
        exerciseModalVisible: false
      },
      () => this.handleFormChange('exercises', exercises)
    )
  }

  removeExercise = (index) => {
    const exercises = this.state.form.exercises
      .slice(0, index)
      .concat(this.state.form.exercises.slice(index + 1))
    this.handleFormChange('exercises', exercises)
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={{
            marginRight: 12
          }}
        >
          <Icon name="done" size={32} color="white" />
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { timePickerVisible, exerciseModalVisible, form } = this.state

    const timeString = form.time ? moment(form.time).format('h:mm a') : 'N/A'

    return (
      <>
        <AddExerciseModal
          visible={exerciseModalVisible}
          setVisible={this.setExerciseModalVisible}
          onSubmit={this.handleAddExercise}
        />
        <View style={styles.container}>
          {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
          <FormLabel>Event Name</FormLabel>
          <FormInput
            value={form.name}
            onChangeText={(value) => this.handleFormChange('name', value)}
          />
          <FormLabel>Day</FormLabel>
          <DayOfTheWeekPicker
            selectedDays={form.days}
            onSelect={(days) => this.handleFormChange('days', days)}
          />
          <FormLabel style={{ marginTop: 16 }}>Time</FormLabel>
          <TimeField onPress={this.handleToggleTimePicker}>
            {timeString}
          </TimeField>
          {timePickerVisible && (
            <DateTimePicker
              value={form.time || BASE_TIME}
              mode="time"
              onChange={this.handleTimePickerEvent}
            />
          )}

          <FormLabel>Exercises</FormLabel>
          {form.exercises.length ? (
            form.exercises.map(({ id, reps }, index) => (
              <ExerciseListItem
                key={index}
                name={EXERCISES[id]}
                reps={reps}
                onDelete={() => this.removeExercise(index)}
              />
            ))
          ) : (
            <View
              style={{ alignItems: 'center', width: '100%', marginBottom: 8 }}
            >
              <Text style={{ fontSize: 16, color: '#ababab' }}>
                No exercises added yet
              </Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <OutlinedButton
              icon="add"
              text="Add Exercise"
              onPress={() => this.setExerciseModalVisible(true)}
            />
          </View>
        </View>
      </>
    )
  }
}

class AddExerciseModal extends React.Component {
  state = {
    exerciseID: '1',
    reps: '',
    error: null
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const { reps, exerciseID } = this.state
    if (Number.isNaN(parseInt(reps))) {
      this.setState({
        error: 'Please enter a valid number of reps.'
      })
    } else {
      this.setState(
        {
          exerciseID: '1',
          reps: '',
          error: null
        },
        () => this.props.onSubmit({ id: exerciseID, reps: reps })
      )
    }
  }

  render() {
    const { exerciseID, reps, error } = this.state
    const { visible, setVisible } = this.props
    const exerciseList = Object.entries(EXERCISES).map(([id, name]) => ({
      id,
      name
    }))
    return (
      <BlankModal visible={visible}>
        <H3>Add Exercise</H3>
        {error && <ErrorText>{error}</ErrorText>}
        <FormLabel>Exercise</FormLabel>
        <FormPicker
          selectedValue={exerciseID}
          onValueChange={(value) => this.handleChange('exerciseID', value)}
        >
          {exerciseList.map(({ id, name }) => (
            <Picker.Item label={name} value={id} key={id} />
          ))}
        </FormPicker>

        <FormLabel style={{ marginTop: 16 }} placeholder="i.e. 30">
          Repetitions
        </FormLabel>
        <FormInput
          value={reps}
          onChangeText={(value) => this.handleChange('reps', value)}
        />
        <View style={styles.modalButtonContainer}>
          <OutlinedButton
            text="Cancel"
            onPress={() => setVisible(false)}
            style={{ marginRight: 8 }}
          />
          <RedButton text="Save" onPress={this.handleSubmit} elevation={4} />
        </View>
      </BlankModal>
    )
  }
}

function ExerciseListItem({ name, reps, onDelete }) {
  return (
    <View style={styles.exerciseListItem}>
      <Text style={styles.exerciseListItemText}>
        {name} - {reps}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="remove" size={24} color="red" />
      </TouchableOpacity>
    </View>
  )
}

function TimeField({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.timeField} onPress={onPress}>
      <Text style={styles.timeFieldText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 24,
    backgroundColor: '#f7f7f7'
  },
  modalButtonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 12,
    flexDirection: 'row'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center'
  },
  exerciseListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 8
  },
  exerciseListItemText: {
    fontSize: 16
  },
  timeField: {
    backgroundColor: 'white',
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  timeFieldText: {
    fontSize: 16
  }
})

export default CreateEventScreen
