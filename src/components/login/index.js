import React from 'react';
import {
  Container,
  InputGroup,
  InputRightElement,
  Flex,
  Button,
  Stack,
  Link as CLink,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import CustomInput from '../shared/CustomInput';

function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const encryptPasswordAndSave = values => {
    var encryptedPassword = CryptoJS.AES.encrypt(
      values.password,
      'secret key'
    ).toString();
    localStorage.setItem('encryptedPassword', encryptedPassword);
    alert('Password Encrypted and stored successfully');
  };

  const validationSchema = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  return (
    <>
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
            pb={5}
          />
          <br />
          <br />
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => validationSchema(values)}
            onSubmit={(values, { setSubmitting }) => {
              encryptPasswordAndSave(values);
            }}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Field
                    my={2}
                    type="email"
                    name="email"
                    component={CustomInput}
                    label={'Email address'}
                  />
                  <InputGroup size="md">
                    <Field
                      my={2}
                      type={show ? 'text' : 'password'}
                      placeholder="Enter password"
                      component={CustomInput}
                      name="password"
                      label={'Password'}
                    />
                    <InputRightElement
                      width="4.5rem"
                      style={{ position: 'absolute', top: '40px' }}
                    >
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Stack direction={'column'}>
                    <Button type="submit" colorScheme="teal" mt={5}>
                      Login <ArrowForwardIcon ml={2} />
                    </Button>
                    <Link to="/signup">
                      <Button colorScheme="teal" variant="outline" w="100%">
                        Sign Up
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
    </>
  );
}

export default Login;
