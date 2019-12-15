import React from 'react';
import styled from '@emotion/styled';
import withProps from 'recompose/withProps';
import { colors } from '../../utils/styles';

const ResponsiveTable = styled('div')`
  display: block;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  overflow-x: auto;
  width: 100%;
`;

const Table = styled('table')`
  border-collapse: collapse;
  max-width: 100%;
  min-width: 600px;
  width: 100%;
`;

const ThLeft = styled('th')`
  padding: 4px 8px 4px 0;
  text-align: left;
`;

const ThBrand = styled('th')`
  background: ${colors.brand};
  border-left: 1px solid #9d7cbf;
  color: ${colors.lightest};
  -webkit-font-smoothing: antialiased;
  padding: 8px 0;
`;

const Tr = styled('tr')`
  border-bottom: ${props => (props.last ? 0 : '1px solid #e0d6eb')};
`;

const Td = styled('td')`
  border-left: 1px solid #f5f3f7;
  padding: 8px 4px;
  text-align: center;
  vertical-align: top;
`;

const TdLeft = withProps({
  colSpan: '2'
})(styled('td')`
  padding: 4px 8px 4px 0;
`);

const SizeChartTable = ({ unit }) => {
  const multiplier = unit === 'cm' ? 2.54 : 1;
  const Size = ({ children: value }) => (
    <span>{Math.round(value * multiplier * 10) / 10}</span>
  );

  return (
    <ResponsiveTable>
      <Table>
        <tbody>
          <tr>
            <ThLeft>规格</ThLeft>
            <ThBrand>大小</ThBrand>
            <ThBrand>均码</ThBrand>
          </tr>
          <Tr>
            <TdLeft>白边模切贴纸</TdLeft>
            <Td>
              <Size>2.2</Size>–<Size>2.4</Size>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </ResponsiveTable>
  );
};

export default SizeChartTable;
