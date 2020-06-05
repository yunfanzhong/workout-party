import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Text from '../components/Text'

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

function DayOfTheWeekPicker({ selectedDays, onSelect }) {
  const handleSelect = (day) => {
    if (selectedDays.includes(day)) {
      return onSelect(selectedDays.filter((selectedDay) => selectedDay !== day))
    }
    return onSelect(selectedDays.concat(day))
  }
  return (
    <View style={styles.container}>
      {days.map((day) => (
        <DayButton
          day={day}
          selected={selectedDays.includes(day)}
          key={day}
          onPress={() => handleSelect(day)}
        />
      ))}
    </View>
  )
}

function DayButton({ day, selected, onPress }) {
  return (
    <TouchableOpacity
      style={selected ? styles.dayButtonSelected : styles.dayButton}
      onPress={onPress}
    >
      <View style={styles.centerText}>
        <Text
          style={selected ? styles.dayButtonTextSelected : styles.dayButtonText}
        >
          {day[0].toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayButton: {
    borderRadius: 18,
    backgroundColor: '#efefef',
    height: 36,
    width: 36
  },
  dayButtonSelected: {
    borderRadius: 18,
    backgroundColor: '#ff2559',
    height: 36,
    width: 36
  },
  dayButtonText: {
    fontSize: 18
  },
  dayButtonTextSelected: {
    color: 'white',
    fontSize: 18
  }
})

export default DayOfTheWeekPicker
