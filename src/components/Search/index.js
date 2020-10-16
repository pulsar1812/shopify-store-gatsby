import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { navigate, useLocation } from '@reach/router'
import queryString from 'query-string'

import { Input } from '../Input'
import { Button } from '../Button'
import { SearchForm } from './styles'

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { search } = useLocation()
  const c = queryString.parse(search)?.c || ''

  const handleSubmit = event => {
    event.preventDefault()

    if (c) {
      navigate(
        `/all-products?s=${encodeURIComponent(
          searchTerm
        )}&c=${encodeURIComponent(c)}`
      )
    } else {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        placeholder="Search"
        value={searchTerm}
        onChange={event => setSearchTerm(event.currentTarget.value)}
      />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  )
}
