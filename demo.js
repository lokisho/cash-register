'use strict';

const cashRegister = require('./index');
const foundPairs = require('./lib/FoundPairs');


 const transactions = () => {

  const payments = [
    [10, 20],
    [90, 300],
    [1, 1000]
  ];

  cashRegister.initialize();

  payments.forEach((payment) => {
    console.log(cashRegister.getChange(payment[0], payment[1]));
    console.log(cashRegister.triggerPayment(payment[0], payment[1]));
  });

  console.log(cashRegister.getCurrentCash());

  console.log("**** PAIRS FOUND EXCERCISE ****");

  const pairs = [
    [7, 9, 11, 13, 15],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ];
  const targets = [20, 3];
  pairs.forEach((pair, index) => {
      console.log(foundPairs(pair, targets[index]))
  });

}

transactions();
