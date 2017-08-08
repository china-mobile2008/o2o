import React, { Component } from 'react'
import { Picker, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class StorefrontPicker extends Component {
  render() {
    const { value, onChange, options } = this.props
    return (
      <Picker
        style={styles.container}
        selectedValue={value}>
        {
          options.map(e => <Picker.Item label={e.name} value={e.alias} key={e.id}/>)
        }
      </Picker>
    )
  }
}

StorefrontPicker.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100
  }
})