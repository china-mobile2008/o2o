import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ProgressBarAndroid, FlatList, StyleSheet } from 'react-native'
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
    // if (this.props.products.isFetching) {
    //   return
    // }
    console.log('loadMore called')
    const { start, rows } = this.props.products.pagination
    this.props.dispatch(fetchProducts(67726, start, rows))
  }

  handleRefresh = () => {
    this.props.dispatch(pullToRefresh())
    const pagination = this.props.products.pagination
    // console.log(start, rows)
    this.props.dispatch(fetchProducts(67726, pagination.start, pagination.rows))
  }

  render() {
    const products = this.props.products.items
    const fetchInProgress = this.props.products.isFetching
    const etalases = this.props.etalases.items

    return (
      <View>
        {/* <StorefrontPicker
          value='abc'
          onChange={this.onPickerChange}
          options={etalases} /> */}

        <FlatList
          contentContainerStyle={styles.container}
          data={products}
          keyExtractor={item => item.id}
          renderItem={this.renderProduct}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0}
          onRefresh={this.handleRefresh}
          refreshing={false}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps called')
  const products = state.products
  const etalases = state.etalase
  return {
    products,
    etalases
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
})

export default connect(mapStateToProps)(VisibleProductList)