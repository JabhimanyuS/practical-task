import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const CustomInput = ({ field, form, ...props }) => {
  return (
    <FormControl isInvalid={form.errors[field.name] && form.touched[field.name]}>
      <FormLabel>{props.label}</FormLabel>
      <Input {...field} {...props} />
      {props.icon && props.icon}
      <FormErrorMessage mb={2} {...props}>{form.errors[field.name]}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
