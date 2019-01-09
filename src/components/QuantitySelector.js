import React, { Component} from 'react'
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

class QuantitySelector extends Component {
  state = {
    quantity: 1,
  }

  addQuantity = (event) => {
    event.preventDefault()
    this.setState({ quantity: this.state.quantity + 1 })

    if (this.props.onQuantityChange) {
      this.props.onQuantityChange(this.state.quantity + 1)
    }
  }

  subtractQuantity = (event) => {
    event.preventDefault()

    if(this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 })

      if (this.props.onQuantityChange) {
        this.props.onQuantityChange(this.state.quantity - 1)
      }
    }
  }

  handleQuantityChange = event => {
    const target = event.target
    let quantity

    if (target.value >= 0) {
      quantity = target.value
      this.setState({
        quantity,
      })
    } else {
      quantity = 1
      this.setState({
        quantity
      })
    }

    if (this.props.onQuantityChange) {
      this.props.onQuantityChange(quantity)
    }
  }

  

  render() {
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
          onClick={this.subtractQuantity}>-</SubtractButton>
        <input
          name="quantity"
          type="number"
          value={this.state.quantity}
          onChange={this.handleQuantityChange}
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
          onClick={this.addQuantity}>+</AddButton>
      </form>
    )
  }
}

export default QuantitySelector