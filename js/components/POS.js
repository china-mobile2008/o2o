import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Dimensions,
  TextInput
} from 'react-native'
import VisibleProductList from '../containers/VisibleProductList'

export default class POS extends Component {
  onActionSelected = (position) => {
    console.log(position)
  }

  onIconClick = () => {
    this.drawerPane.openDrawer()
  }

  render() {
    const navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
      </View>)

    return (
      <DrawerLayoutAndroid
        drawerWidth={Dimensions.get('window').width/2}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(drawer) => { this.drawerPane = drawer; }}
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <ToolbarAndroid style={{ width: Dimensions.get('window').width, height: 60, backgroundColor: '#42b549' }}
            navIcon={require('./img/icon-burgermenu.png')}
            onIconClicked={this.onIconClick}
            actions={[
              {
                title: 'Credit Card',
                icon: require('./img/icon-CreditCards-Info.png'),
                show: 'always'
              },
              { title: 'Add To Cart',
                icon: require('./img/icon-Cart.png'),
                show: 'always'
              },]}
            onActionSelected={this.onActionSelected}>
            <TextInput
              style={{
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 3,
                width: 350,
                borderColor: 'white'
              }}
              tintColor='red'
              caretHidden={false}
              placeholder='tokopedia                                                                    '
              underlineColorAndroid='transparent'
            />
          </ToolbarAndroid>
          <VisibleProductList />
        </View>
      </DrawerLayoutAndroid>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.05)',
    alignItems: 'center',
  },
})