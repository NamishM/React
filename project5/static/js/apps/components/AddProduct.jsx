import React, { Component } from 'react';

class AddProduct extends Component {
	constructor(props) {
		super(props);
	}
	render() {
    	const { onAddProduct } = this.props;
        let name;
        let quantity;
        let price;
    return (
      <form id="AddProduct" className="add-product" onSubmit={(e) => {
        e.preventDefault();
        if (name.value.length > 0 && quantity.value.length > 0 && price.value.length > 0) {
          onAddProduct(name.value, quantity.value, price.value);
          name.value = '';
          quantity.value = '';
          price.value = '';
        }
      }}>
      <input type="text" ref={node => { name = node }} placeholder="Product name..." />
      <input type="number" ref={node => { quantity = node }} placeholder="Quantity..." />
      <input type="number" ref={node => { price = node }} placeholder="Price..." />
      <button type="submit"><i className="fa fa-plus"></i></button>
    </form>
    );
  }
}

export default AddProduct;