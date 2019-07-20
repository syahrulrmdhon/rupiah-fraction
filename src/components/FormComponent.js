import React, { Component } from 'react';

export default class FormComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        fraction: [
          100000,
          50000,
          20000,
          10000,
          5000,
          2000,
          1000,
          500,
          200,
          100,
          50
        ],
        arrRe: [],
        money: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  solution(money) {
    let { fraction, arrRe } = this.state;
    let index = fraction.findIndex(function(number) {
      return money >= number;
    });
    if(fraction.some(el => el < money)) {
      money = money - fraction[index];
      arrRe.push(fraction[index]);
      return this.solution(money,index);
    } else {
      if (money > 0) {
        arrRe.push(money);
      }
      return arrRe;
    } 
  }

  handleChange(e) {
    this.setState({money: e.target.value, arrRe: []});
  }

  handleSubmit(e) {
    e.preventDefault(); 
    let { money } = this.state;
    let inputMoney;
    if( money.indexOf(',') > -1) {
      let replaceCommmas = money.substr(0, money.lastIndexOf(","));
      inputMoney = replaceCommmas.replace(/[^0-9]/g,'');
    } else {
      inputMoney = money.replace(/[^0-9]/g,'');
    }
    let arrSolution = this.solution(inputMoney);
    this.setState(prevState => ({
      arrRe: arrSolution
    }))
    this.setState({
      money: ''
    })
  }

  renderObject(){
    let counts = {};
    this.state.arrRe.forEach(function(i) {
      counts[i] = (counts[i] || 0) + 1 ;
    })
    
    return Object.entries(counts).reverse().map(([key, value], i) => {
			return (
				<li key={i}>{value} x Rp{key}</li>
			)
		})
	}


  render() {
    return (
      <div className="container" style={{marginTop: '20vh'}}>
        <h1 className="text-center">Rupiah Fraction</h1>
        <form className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
            <div className="form-group mb-2">
                <label className="sr-only">Email</label>
                <input type="text" className="form-control" onChange={this.handleChange} placeholder="Rp." />
            </div>
            <button type="submit" className="btn btn-primary mb-2" style={{marginLeft: '1rem'}}>Submit</button>
        </form>
        <div className="text-center" style={{marginTop: '2rem'}}>
          {
             this.renderObject()
          }
        </div>
      </div>
    )
  }
}
