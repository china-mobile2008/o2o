import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store/Store'
import POS from './components/POS'


class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <POS />
      </Provider>
    )
  }
}
export default Root