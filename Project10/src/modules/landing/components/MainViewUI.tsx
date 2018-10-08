import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import ItemViewUI from './ItemViewUI';

interface IMainViewUIProps {
    loginSuccess: boolean;
    items: any;
    getPlanetsData(item: any): void;
    planetsItem: any;
}

export default class MainViewUI extends React.Component<IMainViewUIProps, any> {
  constructor(props: IMainViewUIProps) {
      super(props);
  }

  public render() {
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
