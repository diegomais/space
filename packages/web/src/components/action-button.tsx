import { useReactiveVar } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { cartItemsVar } from '../lib/apollo/cache'
import * as LaunchDetailTypes from '../lib/apollo/__generated__/LaunchDetails'

const ToggleTripButton: React.FC<LaunchDetailTypes.LaunchDetails_launch> = ({
  id
}) => {
  const cartItems = useReactiveVar(cartItemsVar)

  const isInCart = useMemo(() => {
    return id ? cartItems.includes(id) : false
  }, [cartItems, id])

  const handleToggleTrip = useCallback(() => {
    if (id) {
      cartItemsVar(
        isInCart
          ? cartItems.filter(itemId => itemId !== id)
          : [...cartItems, id]
      )
    }
  }, [cartItems, id, isInCart])

  return (
    <button onClick={handleToggleTrip}>
      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  )
}
export default ToggleTripButton
