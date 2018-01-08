## CASH REGISTER & PAIRS FOUND EXCERSISES. 
### CASH REGISTER
#### USAGE
- require the index.js from the path the project is located.
- npm install
- intialize(): Intialize the cash based on the config.default.yml *initial* poperty.
- getChange(price, cash): Gets the change in "Change Due: $" format or "Insufficient Funds".
- triggerPayment(price, cash): Withdraw the change from chash if denominations for change are available.
- getCurrentCash(): Object of state of current cash.
- check the demo.js on usage.
#### VALIDATION
- Quantities are validated before use.
#### DEMO
- You can run `node demo.js`
- You can run other demos changing file demo.js
#### REQUIREMENTS
- node >= 6.12.12
- nvmrc file supplied.

### PAIRS FOUND
Found Pairs of elements in an array that which sum matches a target and returns the sum of indexes of all pairs found.  Each element is used only one, if multiple pairs for an element found, returns the one with lower sum of indexes.
#### USAGE
- require *lib/FoundPairs.js* from the path where the module is located.
- `const foundPairs = require('./lib/FoundPairs');`
- `foundPairs([7, 9, 11, 13, 15], 20)`
#### DEMO
- You can run `node demo.js`
- You can run other demos changing file demo.js
