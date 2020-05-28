import React from 'react'
import { View, StyleSheet, Text, Picker, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import FormInput from '../components/FormInput'
import RedButton from '../components/RedButton'
import DayOfTheWeekPicker from '../components/DayOfTheWeekPicker'
import FormLabel from '../components/FormLabel'
import FormPicker from '../components/FormPicker'

// TEMPORARY!!
const exercises = {
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
    showTimePicker: false,
    form: {
      dayOfTheWeek: null,
      time: BASE_TIME,
      name: '',
      exerciseID: null
    }
  }

  handleToggleTimePicker = () => {
    this.setState({ showTimePicker: !this.state.showTimePicker })
  }

  handleTimePickerEvent = (event) => {
    if (event.type === 'set') {
      this.setState({ showTimePicker: false }, () =>
        this.handleChange('time', event.nativeEvent.timestamp)
      )
    } else if (event.type === 'dismissed') {
      this.setState({ showTimePicker: false })
    }
  }

  handleChange = (name, value) => {
    const form = { ...this.state.form, [name]: value }
    this.setState({ form })
  }

  render() {
    const { showTimePicker, form } = this.state
    const exerciseList = Object.entries(exercises).map(([id, name]) => ({
      id,
      name
    }))

    const timeString = moment(form.time).format('h:mm a')

    return (
      <View style={styles.container}>
        <FormLabel>Event Name</FormLabel>
        <FormInput
          value={form.name}
          onChangeText={(value) => this.handleChange('name', value)}
        />

        <FormLabel>Exercise</FormLabel>
        <FormPicker
          selectedValue={form.exerciseID}
          onValueChange={(value) => this.handleChange('exerciseID', value)}
        >
          {exerciseList.map(({ id, name }) => (
            <Picker.Item label={name} value={id} key={id} />
          ))}
        </FormPicker>

        <FormLabel style={{ marginTop: 16 }}>Day</FormLabel>
        <DayOfTheWeekPicker
          selectedDay={form.dayOfTheWeek}
          onSelect={(day) => this.handleChange('dayOfTheWeek', day)}
        />

        <FormLabel style={{ marginTop: 16 }}>Time</FormLabel>
        <TimeField onPress={this.handleToggleTimePicker}>
          {timeString}
        </TimeField>
        {showTimePicker && (
          <DateTimePicker
            value={form.time}
            mode="time"
            onChange={this.handleTimePickerEvent}
          />
        )}

        <View style={styles.buttonContainer}>
          <RedButton text="Create" onPress={() => {}} elevation={4} />
        </View>
      </View>
    )
  }
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
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 12
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
  timeFieldText: { fontSize: 16 }
})

export default CreateEventScreen
