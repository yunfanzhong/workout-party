import React from 'react'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

function BlankModal({ visible, setVisible, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.darkenBackground}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>{children}</View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  darkenBackground: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%',
    alignItems: 'flex-start'
  }
})

export default BlankModal
