import { combineReducers } from 'redux'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { FETCH_PRODUCTS, FETCH_ETALASE, PULL_TO_REFRESH } from '../actions/index'

const products = (state = {
  items: [],
  pagination: {
    start: 0,
    rows: 25,
  },
  isFetching: false,
  refreshing: false,
}, action) => {
  switch (action.type) {
    case `${FETCH_PRODUCTS}_${PENDING}`:
      return {
        ...state,
        isFetching: true,
      }
    case `${FETCH_PRODUCTS}_${FULFILLED}`:
      const products = action.payload.data.data.products || []
      const items = [ ...state.items, ...products]

      const pagination = {
        ...state.pagination,
        start: items.length
      }
      return {
        items,
        pagination,
        isFetching: false,
        refreshing: false,
      }
    case `${FETCH_PRODUCTS}_${REJECTED}`:
      return {
        ...state,
        isFetching: false,
        refreshing: false,
      }
    case 'PULL_TO_REFRESH':
    console.log('PULL_TO_REFRESH called')
    return Object.assign({}, state, {
      items: [],
      pagination: {
        start: 0,
        rows: 25,
      },
      isFetching: false,
      refreshing: true
    })
      // return {
      //   items: [],
      //   pagination: {
      //     start: 0,
      //     rows: 25,
      //   },
      //   isFetching: false,
      //   refreshing: true
      // }
    default:
      return state
  }
}

const etalase = (state = {
  items: [{
    id: '0',
    name: 'All Products',
    alias: 'all_products'
  }]
}, action) => {
  switch (action.type) {
    case `${FETCH_ETALASE}_${PENDING}`:
      return state
    case `${FETCH_ETALASE}_${FULFILLED}`:
      const etalases = action.payload.data.data.map(e => ({
        id: e.menu_id,
        name: e.menu_name,
        alias: e.menu_alias
      }))

      return {
        items: [...state.items, ...etalases]
      }
    case `${FETCH_ETALASE}_${REJECTED}`:
    default:
      return state
  }
}

const rootReducer = combineReducers({
  products,
  etalase
})

export default rootReducer