import React from 'react';
import CartViewUI from '../components/CartViewUI';
import ItemsViewUI from '../components/ItemsViewUI';

const MainViewUI = ({ itemList, onSetItemAdded, itemsAdded, totalSum }) => (
	<div>
		<CartViewUI
			itemsAdded={itemsAdded}
			totalSum={totalSum}
		/>
		<ItemsViewUI 
			itemList={itemList}
			onSetItemAdded={onSetItemAdded}
		/>
	</div>	
);

export default MainViewUI;
