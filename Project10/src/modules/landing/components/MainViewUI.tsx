import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import ItemViewUI from './ItemViewUI';
// import { Responsive } from 'semantic-ui-react';

interface MainViewUIProps {
    loginSuccess: boolean;
    items: any;
    planetsItem: any;
    getPlanetsData(item: any): void;
}

export default class MainViewUI extends React.Component<MainViewUIProps, any> {
  constructor(props: MainViewUIProps) {
      super(props);
  }

  render() {
    return (
      <div className="mainContainer">
        {
          this.props.loginSuccess ?
            <div className="mainView">
              <Header />
              <ItemViewUI
                items={this.props.items}
                getPlanetsData={this.props.getPlanetsData}
                planetsItem={this.props.planetsItem}
              />
              <Footer />
            </div> :
            <div>You are not authorized! Please do a valid login.</div>
        }
      </div>
    );
  }
}
