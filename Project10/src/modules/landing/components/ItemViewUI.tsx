import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface ItemViewUIProps {
    items: any;
    planetsItem: any;
    getPlanetsData(item: any): void;
}

export default class ItemViewUI extends React.Component<ItemViewUIProps, any> {
  constructor(props: ItemViewUIProps) {
      super(props);
  }

  render() {
    return (
      <div className="itemContainer">
        <span className="ItemTitle">Galaxy Name:</span>
        <ul>
          {
            this.props.items && this.props.items.length > 0 ? this.props.items.map((item: any, index: number) =>
              <li key={index}>
                <Button inverted color='purple'
                  onClick={(e: any) => {
                    e.preventDefault();
                    this.props.getPlanetsData(item.homeworld);
                  }}
                >
                  {item.name}
                </Button>
              </li>,
            ) : <li>Please wait or see console for API error...</li>
          }
        </ul>
        <hr />
        {
          this.props.planetsItem ?
            <div>
              <span className="ItemTitle">Galaxy Details:</span>
              <ul style={{ color: '#b9b6b6' }}>
                <li>Planet Name: {this.props.planetsItem.name}</li>
                <li>Planet Population: {this.props.planetsItem.population}</li>
                <li>Planet Terrain: {this.props.planetsItem.terrain}</li>
              </ul>
            </div>: 'No Valid Data present, Click on ablove options to see data and be patient while data loads!'
        }
      </div>
    );
  }
}
