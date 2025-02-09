const xml2js = require("xml2js");

class XMLParser {
  static async parseXMLData(xmlString) {
    const parser = new xml2js.Parser({ explicitArray: false });
    
    try {
      const result = await parser.parseStringPromise(xmlString);
      const response = result.INProfileResponse;
      
      return {
        basicDetails: this.extractBasicDetails(response),
        reportSummary: this.extractReportSummary(response),
        creditAccounts: this.extractCreditAccounts(response),
        addresses: this.extractAddresses(response)
      };
    } catch (error) {
      throw new Error(`XML parsing failed: ${error.message}`);
    }
  }

  static extractBasicDetails(data) {
    const applicant = data.Current_Application.Current_Application_Details.Current_Applicant_Details;
    return {
      name: {
        firstName: applicant.First_Name,
        lastName: applicant.Last_Name
      },
      mobilePhone: applicant.MobilePhoneNumber,
      pan: applicant.IncomeTaxPan,
      creditScore: parseInt(data.SCORE?.BureauScore) || null
    };
  }

  static extractReportSummary(data) {
    const summary = data.CAIS_Account.CAIS_Summary;
    return {
      totalAccounts: parseInt(summary.Credit_Account.CreditAccountTotal),
      activeAccounts: parseInt(summary.Credit_Account.CreditAccountActive),
      closedAccounts: parseInt(summary.Credit_Account.CreditAccountClosed),
      currentBalanceAmount: parseFloat(summary.Total_Outstanding_Balance.Outstanding_Balance_All),
      securedAccountsAmount: parseFloat(summary.Total_Outstanding_Balance.Outstanding_Balance_Secured),
      unsecuredAccountsAmount: parseFloat(summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured),
      last7DaysCreditEnquiries: parseInt(data.TotalCAPS_Summary.TotalCAPSLast7Days)
    };
  }

  static extractCreditAccounts(data) {
    const accounts = Array.isArray(data.CAIS_Account.CAIS_Account_DETAILS) 
      ? data.CAIS_Account.CAIS_Account_DETAILS 
      : [data.CAIS_Account.CAIS_Account_DETAILS];

    return accounts.map(account => ({
      type: account.Portfolio_Type,
      bank: account.Subscriber_Name.trim(),
      accountNumber: account.Account_Number,
      amountOverdue: parseFloat(account.Amount_Past_Due) || 0,
      currentBalance: parseFloat(account.Current_Balance) || 0
    }));
  }

  static extractAddresses(data) {
    const accounts = Array.isArray(data.CAIS_Account.CAIS_Account_DETAILS) 
      ? data.CAIS_Account.CAIS_Account_DETAILS 
      : [data.CAIS_Account.CAIS_Account_DETAILS];

    const uniqueAddresses = new Set();
    
    accounts.forEach(account => {
      const address = account.CAIS_Holder_Address_Details;
      const addressString = JSON.stringify({
        line1: address.First_Line_Of_Address_non_normalized,
        line2: address.Second_Line_Of_Address_non_normalized,
        line3: address.Third_Line_Of_Address_non_normalized,
        city: address.City_non_normalized,
        state: address.State_non_normalized,
        pinCode: address.ZIP_Postal_Code_non_normalized
      });
      
      uniqueAddresses.add(addressString);
    });

    return Array.from(uniqueAddresses).map(addr => JSON.parse(addr));
  }
}

module.exports = XMLParser;
