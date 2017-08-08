import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import VisibleProductList from '../containers/VisibleProductList'

export default class POS extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VisibleProductList />
        <Text>Here will be the product list</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})