import React from 'react';
import CartViewUI from '../components/CartViewUI';
import ItemsViewUI from '../components/ItemsViewUI';

const MainViewUI = ({ itemList, onItemAdded }) => (
	<div>
		<CartViewUI />
		<ItemsViewUI 
			itemList={itemList}
			onItemAdded ={onItemAdded}
		/>
	</div>	
);

export default MainViewUI;
