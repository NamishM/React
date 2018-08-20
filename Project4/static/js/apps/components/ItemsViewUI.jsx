import React, { Component } from 'react';
import ItemUI from '../components/ItemUI';

class ItemsViewUI extends Component {
	constructor(props) {
		super(props);
	}
	render() {
    	const {
      		itemList,
          onSetItemAdded
    	} = this.props;
    return (
      <div className="item-viewer">
         <div className="list-heading">Product List</div>
         <div className="item-container-wrap">
           {(itemList.length === 0) ?
              <div className="groupTasks" data-auto="noTaskMsg">
                <h4 className="text-info">
                  <br />
                  You donot have any items to select.
                </h4>
              </div> :
              itemList.map((item, index) => {
                return (
                  <ItemUI
                    key={index}
                    item={item}
                    view={'ItemView'}
                    onSetItemAdded={onSetItemAdded}
                  />
                );
              })
           }
        </div>    
      </div>
    );
  }
}

export default ItemsViewUI;