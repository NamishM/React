import React from 'react';
import CartViewUI from '../components/CartViewUI';
import ItemViewUI from '../components/ItemViewUI';

const MainViewUI = ({ itemList }) => (
	<div>
		<CartViewUI />
		<ItemViewUI 
			itemList={itemList}
		/>
	</div>	
);

export default MainViewUI;
