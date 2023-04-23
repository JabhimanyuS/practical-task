import React from 'react';
import {
  Container,
  Flex,
  Button,
  Stack,
  Tooltip,
  Link as CLink,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import CustomInput from '../shared/CustomInput';
import { InfoIcon } from '@chakra-ui/icons';

function SignUp() {
  const validationSchema = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (
      !/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i.test(
        values.password
      )
    ) {
      errors.password = 'Please choose a strong password';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password didn't match";
    }
    return errors;
  };
  const strongPasswordInfo = (
    <div>
      <p>Ensure string has two uppercase letters.</p>
      <p>Ensure string has one special case letter.</p>
      <p>Ensure string has two digits.</p>
      <p>Ensure string has three lowercase letters.</p>
      <p>Ensure string is of length 8.</p>
    </div>
  );

  return (
    <Container>
      <Flex
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{ height: '100vh' }}
      >
        <img
          src={'https://d2s30hray1l0uq.cloudfront.net/frontend/logo.png'}
          alt="PixelPhant"
          mb={5}
        />
        <br />
        <br />
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={values => validationSchema(values)}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Field
                  type="name"
                  name="name"
                  my={2}
                  component={CustomInput}
                  label={'Name'}
                />
                <Field
                  type="email"
                  name="email"
                  my={2}
                  component={CustomInput}
                  label={'Email address'}
                />
                <Field
                  pr="4.5rem"
                  my={2}
                  type={'password'}
                  placeholder="Enter password"
                  component={CustomInput}
                  name="password"
                  label={'Password'}
                  icon={
                    <Tooltip label={strongPasswordInfo}>
                      <InfoIcon
                        style={{
                          position: 'absolute',
                          top: '50px',
                          right: '-25px',
                        }}
                      />
                    </Tooltip>
                  }
                />

                <Field
                  pr="4.5rem"
                  my={2}
                  type={'password'}
                  placeholder="Confirm password"
                  component={CustomInput}
                  name="confirmPassword"
                  label={'Confirm Password'}
                />

                <Stack direction={'column'}>
                  <Button type="submit" colorScheme="teal" mt={2}>
                    Sign Up <ArrowForwardIcon ml={2}  />
                  </Button>
                  <Link to="/login">
                    <Button colorScheme="teal" variant="outline" w="100%">
                      Back to login
                    </Button>
                  </Link>
                </Stack>
              </Form>
            );
          }}
        </Formik>
        <CLink href="/loan-calculator" isExternal mt={5}>
          Loan Calculator <ExternalLinkIcon mx="2px" />
        </CLink>
      </Flex>
    </Container>
  );
}

export default SignUp;
