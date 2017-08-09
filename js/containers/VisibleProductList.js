import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import StorefrontPicker from '../components/StorefrontPicker'
import { fetchProducts, fetchEtalase, pullToRefresh, onEtalaseChange, resetProductList } from '../actions/index'
import Product from '../components/Product'

class VisibleProductList extends Component {
  constructor(props) {
    super(props)
  }

  onPickerChange = (value, index) => {
    console.log('onPickerChange called')
    const etalaseId = value
    if (index === 0) {
      return
    }

    this.props.dispatch(onEtalaseChange(etalaseId))
    this.props.dispatch(resetProductList())
    setTimeout(() => {
      this.props.dispatch(fetchProducts(67726, 0, 25, value))
    }, 500)
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { start, rows } = this.props.products.pagination
    dispatch(fetchProducts(67726, start, rows))
    console.log('componentDidMount called')
    dispatch(fetchEtalase(67726))
  }

  renderProduct = ({ item }) => {
    return <Product product={item} key={item.id} />
  }

  loadMore = () => {
    if (this.props.products.isFetching || !this.props.products.canLoadMore) {
      return
    }
    console.log('loadMore called')
    const { start, rows } = this.props.products.pagination
    const etalaseId = this.props.etalases.selected
    this.props.dispatch(fetchProducts(67726, start, rows, etalaseId))
  }

  handleRefresh = () => {
    const { dispatch } = this.props
    const selectedEtalase = this.props.etalases.selected

    dispatch(pullToRefresh())
    dispatch(fetchProducts(67726, 0, 25, selectedEtalase))
    dispatch(fetchEtalase(67726))
  }

  render() {
    const products = this.props.products.items
    const fetchInProgress = this.props.products.isFetching
    const etalases = this.props.etalases.items
    const refreshing = this.props.products.refreshing
    const selectedEtalase = this.props.etalases.selected

    return (
      <View>
        <StorefrontPicker
          value={selectedEtalase}
          onChange={this.onPickerChange}
          options={etalases} />
        {products.length > 0 && <FlatList
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
        />}
        {(fetchInProgress && !refreshing) && <ActivityIndicator size='large' />}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const products = state.products
  const etalases = state.etalase

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