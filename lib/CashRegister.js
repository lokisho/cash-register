'use strict';

const _ = require('lodash');
const config = require('config');
const mycash = config.get('cash');

class CashRegister {

  /**
   * Initializes the cash register
   *
   * @param {} cash
   *   an object of denomination:amount keys.
   */
  getCash() {
    return mycash;
  }

  /**
   * Intializes cash available.
   * @param {} cash
   *   Cash with denomination keys: quantity.
   */
  initializeCash(cash) {
    Object.keys(mycash).forEach((denomination) => {
      const qty = this.validateAmount(_.get(cash, denomination, 0), true);
      mycash[denomination].qty = qty;
    }
    );
  }
  /**
   * Helper function to validate is a number >= 0
   * @param int,[] amount.
   *   The amount or array of amounts to validate
   * @returns amount if valid.
   */
  validateAmount(amount, integer = false) {
    if (Array.isArray(amount)) {
      return amount.map((_amount) => this._validateAmount(_amount, integer));
    }
    else {
      return this._validateAmount(amount, integer);
    }
  }

  /**
   * Helper function to validate is a number >= 0
   * @param int amount.
   * @returns amount if valid.
   * @throws Error if not valid
   */
    _validateAmount(amount, integer = false) {
      if (isNaN(amount) || amount < 0) {
        throw new Error(`${amount} is not valid`);
      }
      if (integer && !Number.isInteger(amount)) {
        throw new Error(`${amount} is not an integer`);
      }
      return amount;
    }

  /**
   * Withdraw amount from cash. Can only calculate if can give a change.
   * @param float amount
   *   Amount to withdraw.
   * @param boolean calculate
   *   Calculate only.
   *  @return {}
   *    Object with the denomination: qty for change or false if not available.
   */
  withdraw(amount, calculate = false) {
    let change = {};
    Object.keys(mycash).forEach((denomination) => {
      const originalAmount = amount;
        // for each denomination
      // is it divisible ?.
      if ((amount/mycash[denomination].amount) >= 1) {
        // take the integer part and safe it as part of the result
        const currentDenomination = parseInt(amount/mycash[denomination].amount);
        let remainder = amount%mycash[denomination].amount;
        // do we have enough denomination
        if (mycash[denomination].qty >= currentDenomination) {
          change[mycash[denomination].label] = (currentDenomination * mycash[denomination].amount).toFixed(2);
          if (!calculate) {
            mycash[denomination].qty -= currentDenomination;
          }
          amount -= currentDenomination * mycash[denomination].amount;
        }
        else {
          change[mycash[denomination].label] = 0;
          remainder += (currentDenomination - mycash[denomination].qty) * mycash[denomination].amount
        }
        amount = remainder;
      }
    });
    if (amount > 0) {
      return false;
    }
    return change;
  }

  /**
   * Calculates the amount of change and if there is denomination available for that change.
   * @param float price
   *   Price of item.
   * @param float cash
   *   Cash receive for item.
   * @return float
   *   Amount of change or false if not available.
   */
  caculateChange(price, cash) {
    this.validateAmount([price, cash]);
    if (price > cash) {
      throw new Error('Cash received is less than price');
    }
    const change = this.withdraw((cash - price), true);
    return _.isEmpty(change) ? false :(cash - price);
  }
}
module.exports = CashRegister;
