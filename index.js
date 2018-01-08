'use strict';

const CashRegister = require('./lib/CashRegister');
const config = require('config');
const _ = require('lodash')

module.exports = {
  initialize: () => {
    const cashRegister = new CashRegister();
    cashRegister.initializeCash(config.get('initial'));
  },
  getChange: (price, cash) => {
    const cashRegister = new CashRegister();
    const change = cashRegister.caculateChange(price,cash);
    return change ? `Change Due: $ ${change}` : 'Insufficient Funds';
  },
  triggerPayment: (price, cash) => {
    const cashRegister = new CashRegister();
    const change = cashRegister.withdraw(cashRegister.caculateChange(price,cash));
    if ((change)) {
        return 'Closed';
    }
    else {
        throw new Error('Insufficient Funds')
    }
  },
  getCurrentCash: () => {
    const cashRegister = new CashRegister();
    return cashRegister.getCash();
  }
}
