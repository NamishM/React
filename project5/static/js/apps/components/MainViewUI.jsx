import React from 'react';
import CartViewUI from '../components/CartViewUI';
import ItemsViewUI from '../components/ItemsViewUI';
import AddProduct from '../components/AddProduct';

const MainViewUI = ({ 
	itemList, 
	onSetItemAdded, 
	onRemoveItem, 
	onAddProduct,
	itemsAdded,
	incrementItem,
  	decrementItem,
	totalSum 
}) => (
	<div className="container">
		<AddProduct
			onAddProduct={onAddProduct}
		/>
		<CartViewUI
			itemsAdded={itemsAdded}
			totalSum={totalSum}
			onRemoveItem={onRemoveItem}
			incrementItem={incrementItem}
			decrementItem={decrementItem}
		/>
		<ItemsViewUI 
			itemList={itemList}
			onSetItemAdded={onSetItemAdded}
		/>
	</div>	
);

export default MainViewUI;
