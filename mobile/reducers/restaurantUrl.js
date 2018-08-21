const RESTAURANT_URL = 'RESTAURANT_URL';

const set_RestaurantUrl = (restaurantUrl) => {
    return {
        type: RESTAURANT_URL,
        restaurantUrl: restaurantUrl,
    }
}

export const setRestaurantUrl = (restaurantUrl) => dispatch => {
    dispatch(set_RestaurantUrl(restaurantUrl))
}

export default function(restaurantUrl = '', action) {
    switch (action.type) {
      case RESTAURANT_URL:
        return action.restaurantUrl
      default:
        return restaurantUrl
    }
  }
