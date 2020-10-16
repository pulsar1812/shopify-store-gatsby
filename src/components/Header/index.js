import React from 'react'
import { Link } from 'gatsby'

import { HeaderWrapper } from './styles'
import { Cart } from '../Cart'
import { Search } from '../Search'
import { Logo } from '../Logo'

export const Header = () => {
  return (
    <HeaderWrapper>
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Search />
      <Cart />
    </HeaderWrapper>
  )
}
