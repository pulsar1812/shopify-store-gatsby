import React, { useContext } from 'react'
import { navigate } from '@reach/router'

import CartContext from 'context/CartContext'
import { QuantityAdjuster } from '../QuantityAdjuster'
import { RemoveLineItem } from '../RemoveLineItem'
import { Button } from '../Button'
import { CartItem, CartHeader, CartFooter, Footer } from './styles'

export const CartContents = () => {
  const { checkout, updateLineItem } = useContext(CartContext)
  // console.log(checkout.lineItems)

  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId })
  }

  return (
    <section>
      <h1>Your Cart</h1>
      {!!checkout?.lineItems && (
        <CartHeader>
          <div>Product</div>
          <div>Unit Price</div>
          <div>Quantity</div>
          <div>Amount</div>
        </CartHeader>
      )}
      {checkout?.lineItems?.map(item => (
        <CartItem key={item.variant.id}>
          <div>
            <div>{item.title}</div>
            <div>
              {item.variant.title === 'Default Title' ? '' : item.variant.title}
            </div>
          </div>
          <div>HK${item.variant.price}</div>
          <div>
            <QuantityAdjuster item={item} onAdjust={handleAdjustQuantity} />
          </div>
          <div>HK${(item.quantity * item.variant.price).toFixed(2)}</div>
          <div>
            <RemoveLineItem lineItemId={item.id} />
          </div>
        </CartItem>
      ))}
      {!!checkout?.lineItems && (
        <CartFooter>
          <div>
            <strong>Total: </strong>
          </div>
          <div>
            <span>HK${checkout?.totalPrice}</span>
          </div>
        </CartFooter>
      )}
      {!checkout?.lineItems && <h4>Your cart is empty.</h4>}
      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>Continue Shopping</Button>
        </div>
        <div>
          {!!checkout?.webUrl && (
            <Button
              onClick={() => {
                window.location.href = checkout.webUrl
              }}
            >
              Checkout
            </Button>
          )}
        </div>
      </Footer>
    </section>
  )
}
