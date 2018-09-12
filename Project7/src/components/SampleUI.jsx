import React, { Component } from 'react';
// import Numbers from  './Numbers';
// import Operations from './Operations';

class SampleUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: '',
      operation: '',
      number1: '',
      number2: '',
    };
  }
  myCallBack = (result, type) => {
    if (this.state.operation !== '' && type !== 'op') {
      this.setState({ number2: this.state.number2+result, output: this.state.number1 + ' ' + this.state.operation + ' ' + this.state.number2+result });
    } else if (this.state.operation === '' && type !== 'op' && this.state.number2 === '') {
      this.setState({number1: this.state.number1+result ,
        output: this.state.number1+result });
    } else if (this.state.operation !== '' && type === 'op' && this.state.number2 !== '') {
      this.setState({ number1: '' });
      this.myCallBack1();
      this.setState({ number2: '' });
      this.setState({ operation: result });
    } else {
      this.setState({ operation: result, output: this.state.number1 + ' ' + result});
    }
  };
  myCallBack1 = () => {
    switch(this.state.operation) {
      case '*':
      this.setState({ output: parseInt(this.state.number1, 10) *  parseInt(this.state.number2, 10), number1: parseInt(this.state.number1, 10) *  parseInt(this.state.number2, 10) });
      break;
      case '-':
      this.setState({ output: parseInt(this.state.number1, 10) -  parseInt(this.state.number2, 10), number1: parseInt(this.state.number1, 10) -  parseInt(this.state.number2, 10) });
      break;
      case '+':
      this.setState({ output: parseInt(this.state.number1, 10) + parseInt(this.state.number2, 10), number1: parseInt(this.state.number1, 10) +  parseInt(this.state.number2, 10) });
      break;
      default :
      this.setState({ output: this.state.output });
      break;
    }
    
  };

  myCallBack2 = () => {
    this.setState({ output: '', number1: '', number2: '', operation: '' });
  }

  myCallBack3 = () => {
    this.setState({ number2: '', operation: '' });
  }
  
  render() {
    return (
      <div className="calc_container">
        <div className="output">
          <span className="output_inside">{this.state.output}</span>
        </div>
        <div className="base_sec">
          <div className="numbers_wrapper">
            <div className="row">
              <button onClick={() => this.myCallBack('7', 'num')}>7</button>
              <button onClick={() => this.myCallBack('8', 'num')}>8</button>
              <button onClick={() => this.myCallBack('9', 'num')}>9</button>
              <button className="op_btn" onClick={() => this.myCallBack('*', 'op')}>x</button>
            </div>
            <div className="row">
              <button onClick={() => this.myCallBack('4', 'num')}>4</button>
              <button onClick={() => this.myCallBack('5', 'num')}>5</button>
              <button onClick={() => this.myCallBack('6', 'num')}>6</button>
              <button className="op_btn" onClick={() => this.myCallBack('-', 'op')}>-</button>
            </div>
            <div className="row">
              <button onClick={() => this.myCallBack('1', 'num')}>1</button>
              <button onClick={() => this.myCallBack('2', 'num')}>2</button>
              <button onClick={() => this.myCallBack('3', 'num')}>3</button>
              <button className="op_btn" onClick={() => this.myCallBack('+', 'op')}>+</button>
            </div>
            <div className="row">
              <button className="zero" onClick={() => this.myCallBack('0', 'num')}>0</button>
              <button onClick={() => this.myCallBack2()}>AC</button>
              <button className="op_btn" onClick={() => {
                this.myCallBack1();
                this.myCallBack3();
              }}>=</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SampleUI;
