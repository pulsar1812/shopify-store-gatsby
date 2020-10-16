/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect, useContext, Fragment } from 'react'
import { graphql } from 'gatsby'

import {
  Layout,
  ImageGallery,
  ProductQuantityAdder,
  Button,
  SEO,
} from 'components'
import { Grid, SelectWrapper, Price } from './styles'
import CartContext from 'context/CartContext'
import { navigate, useLocation } from '@reach/router'
import queryString from 'query-string'

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      ...ShopifyProductFields
    }
  }
`

const ProductTemplate = props => {
  const { getProductById } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const { search, origin, pathname } = useLocation()
  // console.log('Search: ', search)
  // console.log('Origin: ', origin)
  // console.log('Pathname: ', pathname)

  // Parse the search term into an object, then use the 'variant' key to get the value
  const variantId = queryString.parse(search).variant

  useEffect(() => {
    getProductById(props.data.shopifyProduct.shopifyId).then(result => {
      // console.log(result)
      setProduct(result)
      setSelectedVariant(
        result.variants.find(({ id }) => id === variantId) || result.variants[0]
      )
    })
  }, [
    getProductById,
    setProduct,
    props.data.shopifyProduct.shopifyId,
    variantId,
  ])

  const handleVariantChange = event => {
    const newVariant = product?.variants.find(v => v.id === event.target.value)
    setSelectedVariant(newVariant)
    navigate(
      `${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`,
      {
        replace: true,
      }
    )
  }

  return (
    <Layout>
      <SEO
        description={props.data.shopifyProduct.description}
        title={props.data.shopifyProduct.title}
      />
      <Button onClick={() => navigate(-1)}>Back to Products</Button>
      <Grid>
        <div>
          <h1>{props.data.shopifyProduct.title}</h1>
          <p>{props.data.shopifyProduct.description}</p>
          {product?.availableForSale && !!selectedVariant && (
            <Fragment>
              {product?.variants.length > 1 && (
                <SelectWrapper>
                  <strong>Variant</strong>
                  <select
                    value={selectedVariant.id}
                    onChange={handleVariantChange}
                  >
                    {product?.variants.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              )}
              {!!selectedVariant && (
                <Fragment>
                  <Price>HK${selectedVariant.price}</Price>
                  <ProductQuantityAdder
                    available={selectedVariant.available}
                    variantId={selectedVariant.id}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
        <div>
          <ImageGallery
            selectedVariantImageId={selectedVariant?.image.id}
            images={props.data.shopifyProduct.images}
          />
        </div>
      </Grid>
    </Layout>
  )
}

export default ProductTemplate
