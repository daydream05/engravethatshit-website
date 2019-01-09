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
  }

  subtractQuantity = (event) => {
    event.preventDefault()

    if(this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 })
    }
  }

  handleQuantityChange = (event) => {
    const target = event.target

    if(target.value >= 0) {
      this.setState({
        quantity: target.value,
      })
    } else {
      this.setState({
        quantity: 1
      })
    }
  }

  render() {
    return (
      <form css={css`
        display: grid;
        grid-template-columns: 40px 60px 40px;
        height: 40px;
        margin: 0;
      `}>
        <SubtractButton onClick={this.subtractQuantity}>-</SubtractButton>
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

            ::-webkit-outer-spin-button { 
              -webkit-appearance: none; 
              margin: 0; 
            }
          `}
        />
        <AddButton onClick={this.addQuantity}>+</AddButton>
      </form>
    )
  }
}

export default QuantitySelector