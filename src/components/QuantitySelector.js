import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const SubtractButton = styled.button`
  background-color: none;
  border: none;
  border-left: 2px solid #4A4A4A;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 2px solid #4A4A4A;
  border-bottom: 2px solid #4A4A4A;
  cursor: pointer;
`

const AddButton = styled.button`
  background-color: none;
  border: none;
  border-right: 2px solid #4A4A4A;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 2px solid #4A4A4A;
  border-bottom: 2px solid #4A4A4A;
  cursor: pointer;
`

const QuantitySelector = (props) => {
  const [quantity, setQuantity] = useState(1)

  const addQuantity = (e) => {
    e.preventDefault()
    setQuantity(quantity + 1)

    if(props.onQuantityChange) {
      props.onQuantityChange(quantity + 1)
    }
  }

  const subtractQuantity = (e) => {
    e.preventDefault()

    // prevent quantity from going to 0 or less
    if(quantity > 1) {
      setQuantity(quantity - 1)
      if (props.onQuantityChange) {
        props.onQuantityChange(quantity - 1)
      }
    }
  }

  const handleQuantityChange = (e) => {
    const { value } = e.target
    const newValue = parseInt(value, 10)

    // prevent quantty from to 0 or less
    if(newValue > 1) {
      setQuantity(newValue)
      props.onQuantityChange(newValue)
    } else {
      // if 0 or less, set it to 1
      setQuantity(1)
      props.onQuantityChange(1)
    }
  }

  return (
    <form css={css`
      display: grid;
      grid-template-columns: 40px 60px 40px;
      height: 40px;
      margin: 0;

      input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }
    `}>
      <SubtractButton
        aria-label="subract"
        onClick={subtractQuantity}>-</SubtractButton>
      <input
        name="quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        css={css`
          text-align: center;
          border: 2px solid #4A4A4A;
          padding: 0;
          background-color: #EDEDED;

          ::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button { 
            -webkit-appearance: none; 
            margin: 3rem; 
          }
        `}
      />
      <AddButton
        aria-label="add"
        onClick={addQuantity}>+</AddButton>
    </form>
  )
}

export default QuantitySelector