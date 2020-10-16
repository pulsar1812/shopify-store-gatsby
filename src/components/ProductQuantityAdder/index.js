import React, { useContext, useState } from 'react'

import { Input, Button } from 'components'
import CartContext from 'context/CartContext'
import { ProductQuantityAdderWrapper } from './styles'

export const ProductQuantityAdder = ({ variantId, available }) => {
  const [quantity, setQuantity] = useState(1)
  const { updateLineItem } = useContext(CartContext)

  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateLineItem({ variantId, quantity: parseInt(quantity, 10) })
  }

  return (
    <ProductQuantityAdderWrapper>
      <strong>Quantity</strong>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={!available}
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Button disabled={!available} type="submit" fullWidth>
          Add To Cart
        </Button>
      </form>
    </ProductQuantityAdderWrapper>
  )
}
