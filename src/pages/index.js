import React, { useContext } from 'react'

import {
  Layout,
  SEO,
  HomepageCollectionsGrid,
  FeaturedProducts,
} from 'components'
import ProductContext from 'context/ProductContext'

const IndexPage = () => {
  const { collections } = useContext(ProductContext)

  return (
    <Layout>
      <SEO description="The online store homepage" title="Homepage" />
      <HomepageCollectionsGrid
        collections={collections.filter(
          collection => collection.title !== 'Featured Hats'
        )}
      />
      {!!collections.find(
        collection => collection.title === 'Featured Hats'
      ) && <FeaturedProducts />}
    </Layout>
  )
}

export default IndexPage
