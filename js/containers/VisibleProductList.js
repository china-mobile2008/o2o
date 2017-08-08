import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  ProgressBarAndroid,
  FlatList,
  StyleSheet,
  RefreshControl } from 'react-native'
import StorefrontPicker from '../components/StorefrontPicker'
import { fetchProducts, fetchEtalase, pullToRefresh } from '../actions/index'
import Product from '../components/Product'

class VisibleProductList extends Component {
  constructor(props) {
    super(props)
  }

  onPickerChange = () => {

  }

  componentDidMount() {
    const { dispatch } = this.props
    const { start, rows } = this.props.products.pagination
    dispatch(fetchProducts(67726, start, rows))
    dispatch(fetchEtalase(67726))
  }

  renderProduct = ({ item }) => {
    return <Product product={item} key={item.id} />
  }

  loadMore = () => {
    if (this.props.products.isFetching) {
      return
    }
    const { start, rows } = this.props.products.pagination
    this.props.dispatch(fetchProducts(67726, start, rows))
  }

  handleRefresh = () => {
    const { dispatch } = this.props

    dispatch(pullToRefresh())
    dispatch(fetchProducts(67726, 0, 25))
    dispatch(fetchEtalase(67726))
  }

  render() {
    const products = this.props.products.items
    const fetchInProgress = this.props.products.isFetching
    const etalases = this.props.etalases.items
    const refreshing = this.props.products.refreshing

    return (
      <View>
        <StorefrontPicker
          value='abc'
          onChange={this.onPickerChange}
          options={etalases} />

        <FlatList
          contentContainerStyle={styles.container}
          data={products}
          keyExtractor={item => item.id}
          renderItem={this.renderProduct}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
              title="Pull to refresh"
              colors={['#42b549']}
            />
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const products = state.products
  const etalases = state.etalase
  const refreshing = state.products.refreshing
  
  return {
    products,
    etalases
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
})

export default connect(mapStateToProps)(VisibleProductList)