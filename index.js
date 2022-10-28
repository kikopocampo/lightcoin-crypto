class Account {

  constructor(userName) {
    this.userName = userName;
    this.transactions = [];
  }

  get balance() {
    const bal = this.transactions.reduce((acc,curr) => acc + curr.amount,0);
    return bal;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    this.time = new Date();
    if (this.value < -this.account.balance) {
      // console.log(this.value,'<', this.account.balance)
      console.log(`Insufficient funds Your current balance is $${this.account.balance}`);
      return;
    }
    this.account.addTransaction({date: this.time.toString().slice(0,-34), amount: this.value });
    console.log(`Transaction complete: Your current balance is $${this.account.balance}`);
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}






// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

//Account Bob Bobbykins:
console.log('-> Bob creating an account...');
const account1 = new Account("Bob Bobbykins");
console.log(account1);
console.log("-> Bob putting $5000 in his account...");
const t1 = new Deposit(5000,account1);
t1.commit();
console.log("-> Bob checking his account info...");
console.log(account1);
console.log("-> Bob using his crypto money to buy groceries that cost $500...");
const t2 = new Withdrawal(500, account1);
t2.commit();
console.log("-> Bob took money again to buy a new phone...");
const t3 = new Withdrawal(2500, account1);
t3.commit();
console.log("-> Bob checks his account and remaining balance to see the transactions...");
console.log(account1);
console.log('Balance:', account1.balance);
console.log("-> Bob deposited his paycheck in this crypto account...");
const t4 = new Deposit(3000, account1);
t4.commit();
console.log("-> Bob needed 6000 to pay for his house renovation. Withdrew without checking his account...");
const t5 = new Withdrawal(6000,account1);
t5.commit();
console.log("-> Bob checks his account...");
console.log(account1);
console.log("-> Bob took $5000 instead");
const t6 = new Withdrawal(5000,account1);
t6.commit();
console.log(account1);
console.log("-> Bob deposited $100 to keep his account from getting closed...");
const t7 = new Deposit(100, account1);
t7.commit();
console.log("-> The end...");
