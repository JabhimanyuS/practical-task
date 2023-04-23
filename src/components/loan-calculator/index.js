import React from 'react';
import { get, round } from 'lodash';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import {
  calculateEMI,
  calculateMonthlyInterestAmount,
} from '../../utils/emi-calculator';
import { Link as CLink } from '@chakra-ui/react';
import EMIPlanTable from './emiPlanTable';
import CustomInput from '../shared/CustomInput';
import convertCurrency from '../../utils/currencyConverter';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function LoanCalculator() {
  const [allEMIPlan, setAllEMIPlan] = React.useState([]);
  const [monthlyEMIInUSD, setMonthlyEMIInUSD] = React.useState(0);
  const [isConvertingCurrency, setIsConvertingCurrency] = React.useState(false);

  const validationSchema = values => {
    const errors = {};
    if (!values.loanAmount) {
      errors.loanAmount = 'Required';
    } else if (values.loanAmount < 0) {
      errors.loanAmount = 'Please enter a valid number';
    }
    if (!values.loanTenure) {
      errors.loanAmount = 'Required';
    } else if (values.loanTenure < 0) {
      errors.loanAmount = 'Please enter a valid number';
    }
    if (!values.rateOfInterest) {
      errors.rateOfInterest = 'Required';
    } else if (values.rateOfInterest < 0) {
      errors.loanAmount = 'Please enter a valid number';
    }
    return errors;
  };

  const calculateEMIS = values => {
    let pendingPrincipalAmount = values.loanAmount;

    const monthlyEMI = calculateEMI(
      pendingPrincipalAmount,
      values.rateOfInterest,
      values.loanTenure
    );

    const allEMIPlan = [
      {
        balancePrincipalAmount: values.loanAmount,
        monthlyInterestAmount: round(
          calculateMonthlyInterestAmount(
            values.loanAmount,
            values.rateOfInterest
          ),
          2
        ),
        emi: round(monthlyEMI, 2),
      },
    ];

    while (pendingPrincipalAmount > 1) {
      const monthlyInterestAmount = calculateMonthlyInterestAmount(
        pendingPrincipalAmount,
        values.rateOfInterest
      );
      const principalPaid =
        round(monthlyEMI, 2) - round(monthlyInterestAmount, 2);
      pendingPrincipalAmount = pendingPrincipalAmount - principalPaid;
      allEMIPlan.push({
        balancePrincipalAmount: round(pendingPrincipalAmount, 2),
        monthlyInterestAmount: round(monthlyInterestAmount, 2),
        emi: round(monthlyEMI, 2),
      });
    }
    setAllEMIPlan(allEMIPlan);
  };

  const convertAmount = async values => {
    if (values.loanAmount) {
      setIsConvertingCurrency(true);
      const conversionData = await convertCurrency(
        'INR',
        'USD',
        round(
          calculateEMI(
            values.loanAmount,
            values.rateOfInterest,
            values.loanTenure
          ),
          2
        )
      );
      setMonthlyEMIInUSD(conversionData.data.result);
      setIsConvertingCurrency(false);
    }
  };

  return (
    <>
      <img
        src={'https://d2s30hray1l0uq.cloudfront.net/frontend/logo.png'}
        alt="PixelPhant"
        mb={5}
        px={5}
      />
      <Flex
        direction={'row'}
        alignItems={'start'}
        justifyContent={'space-around'}
        style={{ height: '100vh' }}
        w="100%"
        py={5}
        my={5}
      >
        <div style={{ width: '30%' }}>
          <Text fontSize="2xl" mb={5}>
            Loan Calculator
          </Text>
          <Formik
            initialValues={{
              downPayment: '',
              loanAmount: '',
              loanTenure: 60,
              rateOfInterest: 9,
            }}
            validate={values => validationSchema(values)}
            onSubmit={(values, { setSubmitting }) => {
              calculateEMIS(values);
            }}
          >
            {({ values, handleSubmit }) => (
              <>
                <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <FormControl>
                    <FormLabel>Down Payment</FormLabel>
                    <Input type="number" name="downPayment" my={2} />
                    <FormLabel>Loan Amount</FormLabel>
                    <Field
                      type="number"
                      name="loanAmount"
                      my={2}
                      component={CustomInput}
                    />
                    <FormLabel>Loan Tenure (in months)</FormLabel>
                    <Field
                      type="number"
                      name="loanTenure"
                      my={2}
                      component={CustomInput}
                    />
                    <FormLabel>Rate of interest (in %.)</FormLabel>
                    <Field
                      type="number"
                      name="rateOfInterest"
                      my={2}
                      component={CustomInput}
                    />
                  </FormControl>
                  <Stack direction={'column'}>
                    <Button type="submit" colorScheme="teal" mb={4}>
                      Calculate EMI
                    </Button>
                  </Stack>
                </Form>
                <Text fontSize="1xl" mb={5}>
                  Monthly EMI -{' '}
                  <b>
                    {round(
                      calculateEMI(
                        values.loanAmount,
                        values.rateOfInterest,
                        values.loanTenure
                      ),
                      2
                    )}
                  </b>
                </Text>
                {!isConvertingCurrency ? (
                  <Text fontSize="1xl" mb={5}>
                    Monthly EMI (in USD) - <b>{monthlyEMIInUSD}</b>
                  </Text>
                ) : isConvertingCurrency ? (
                  <Spinner />
                ) : null}

                <div>
                  <CLink onClick={() => convertAmount(values)}>
                    Convert Monthly EMI to USD <ArrowForwardIcon />
                  </CLink>
                </div>
              </>
            )}
          </Formik>
        </div>
        <div style={{ width: '60%' }}>
          <EMIPlanTable data={allEMIPlan} />
        </div>
      </Flex>
    </>
  );
}

export default LoanCalculator;
