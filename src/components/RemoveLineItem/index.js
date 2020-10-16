import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

import CartContext from 'context/CartContext'
import { Icon } from './styles'

export const RemoveLineItem = ({ lineItemId }) => {
  const { removeLineItem } = useContext(CartContext)

  const handleClick = () => {
    removeLineItem(lineItemId)
  }

  return (
    <Icon onClick={handleClick}>
      <FaTrashAlt />
    </Icon>
  )
}
