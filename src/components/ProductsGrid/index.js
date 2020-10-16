import React from 'react'

import { ProductTile } from '../ProductTile'
import { ProductsGridWrapper } from './styles'

export const ProductsGrid = ({ products }) => {
  console.log(products)

  return (
    <ProductsGridWrapper>
      {products.map(product => (
        <ProductTile
          key={product.shopifyId}
          imageFluid={product.images[0].localFile.childImageSharp.fluid}
          title={product.title}
          description={product.description}
          minPrice={product.priceRange.minVariantPrice.amount}
          handle={product.handle}
        />
      ))}
    </ProductsGridWrapper>
  )
}
