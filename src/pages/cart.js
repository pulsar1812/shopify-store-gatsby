import React from 'react'

import { Layout, CartContents, SEO } from 'components'

const Cart = () => (
  <Layout>
    <SEO description="The online store shopping cart" title="Shopping Cart" />
    <CartContents />
  </Layout>
)

export default Cart
