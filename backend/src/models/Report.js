const mongoose = require("mongoose");

const creditAccountSchema = new mongoose.Schema({
  type: String,
  bank: String,
  accountNumber: String,
  amountOverdue: Number,
  currentBalance: Number
}, { _id: false });

const reportSchema = new mongoose.Schema({
  basicDetails: {
    name: {
      firstName: String,
      lastName: String
    },
    mobilePhone: String,
    pan: String,
    creditScore: Number
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalanceAmount: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysCreditEnquiries: Number
  },
  creditAccounts: [creditAccountSchema],  
  addresses: [{
    line1: String,
    line2: String,
    line3: String,
    city: String,
    state: String,
    pinCode: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);