import React from 'react';
import CartViewUI from '../components/CartViewUI';
import ItemsViewUI from '../components/ItemsViewUI';

const MainViewUI = ({ 
	itemList, 
	onSetItemAdded, 
	onRemoveItem, 
	itemsAdded, 
	totalSum 
}) => (
	<div>
		<CartViewUI
			itemsAdded={itemsAdded}
			totalSum={totalSum}
			onRemoveItem={onRemoveItem}
		/>
		<ItemsViewUI 
			itemList={itemList}
			onSetItemAdded={onSetItemAdded}
		/>
	</div>	
);

export default MainViewUI;
