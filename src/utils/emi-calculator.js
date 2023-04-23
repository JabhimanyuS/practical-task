const calculateEMI = (principalLoanAmount, interestRate, tenure) => {
  if(principalLoanAmount <= 0) {
    return 0;
  }
  const monthlyInterest = interestRate / 12 / 100;
  return (
    principalLoanAmount *
    monthlyInterest *
    (Math.pow(1 + monthlyInterest, tenure) /
      (Math.pow(1 + monthlyInterest, tenure) - 1))
  );
};

const calculateMonthlyInterestAmount = (pendingLoanAmount, interestRate) => {
  const monthlyInterest = interestRate / 100 / 12;
  return pendingLoanAmount * monthlyInterest;
};

export {
  calculateEMI,
  calculateMonthlyInterestAmount,
};
