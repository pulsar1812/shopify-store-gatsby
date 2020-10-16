import React from 'react'
import Img from 'gatsby-image'

import { StyledLink } from '../StyledLink'
import { ProductTileWrapper, Title, Description, Price } from './styles'

export const ProductTile = ({
  title,
  imageFluid,
  description,
  minPrice,
  handle,
}) => {
  return (
    <ProductTileWrapper>
      <Img fluid={imageFluid} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>from HK${parseFloat(minPrice).toFixed(2)}</Price>
      <StyledLink to={`/products/${handle}`}>View Product</StyledLink>
    </ProductTileWrapper>
  )
}
