import axios from 'axios'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const fetchProducts = (shopId, start, rows) => {
  return {
    type: FETCH_PRODUCTS,
    payload: axios.get(`https://ace.tokopedia.com/search/product/v3.1?device=android&source=shop_product&rows=${rows}&shop_id=${shopId}&start=${start}`)
  }
}

export const FETCH_ETALASE = 'FETCH_ETALASE'
export const fetchEtalase = (shopId) => ({
  type: FETCH_ETALASE,
  payload: axios.get(`https://tome.tokopedia.com/v1/web-service/shop/get_etalase?shop_id=${shopId}`)
})

export const PULL_TO_REFRESH = 'PULL_TO_REFRESH'
export const pullToRefresh = () => {
  return {
    type: PULL_TO_REFRESH
  }
}
