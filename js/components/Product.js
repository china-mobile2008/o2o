import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import PropTypes from 'prop-types'

class Product extends PureComponent {
  render() {
    const product = this.props.product
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL(product.url)}>
          <View>
            <View style={styles.productImageWrapper}>
              <Image source={{ uri: product.image_url }} style={styles.productImage} />
            </View>
            <Text
              style={styles.productName}
              ellipsizeMode='tail'
              numberOfLines={2}>{product.name}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{product.price}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    width: 130,
    backgroundColor: 'white'
  },
  productImageWrapper: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0)',
    padding: 10
  },
  productImage: {
    borderRadius: 3,
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0,0,0,.7)',
    height: 33.8,
    paddingHorizontal: 10
  },
  priceWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 34
  },
  price: {
    color: '#ff5722',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    paddingHorizontal: 10
  },
})

export default Product