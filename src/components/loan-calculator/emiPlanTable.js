import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { get, map } from 'lodash';

function EMIPlanTable(props) {
  const data = get(props, 'data');
  return (
    <TableContainer style={{ height: '100vh', overflowY: 'scroll' }}>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Repayment Details</TableCaption>
        <Thead>
          <Tr>
            <Th>Month</Th>
            <Th>Balance Principal Amount</Th>
            <Th>Monthly EMI</Th>
            <Th>Monthly Interest</Th>
          </Tr>
        </Thead>
        <Tbody>
          {map(data, (el, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{get(el, 'balancePrincipalAmount')}</Td>
              <Td>{get(el, 'emi')}</Td>
              <Td>{get(el, 'monthlyInterestAmount')}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default EMIPlanTable;
