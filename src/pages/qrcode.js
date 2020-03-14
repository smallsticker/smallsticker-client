import React from 'react';
import QRCode from 'qrcode.react';
import { client } from '../context/ApolloContext';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { Boxer } from '@smooth-ui/core-em';
import { colors } from '../utils/styles';
import {
  TextContainer,
  Text as BaseText
} from '../components/shared/Typography';

const Tips = styled(`span`)`
  align-items: center;
  color: ${colors.brandDark};
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  justify-content: center;
`;

const Text = styled(BaseText)`
  text-align: center;
`;

export default class QR extends React.Component {
  componentDidMount() {
    this.timeID = setInterval(() => this.getStatus(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeID);
  }
  getStatus() {
    client
      .getEntry('orders', this.props.location.state.outTradeNo)
      .then(res => {
        if (res.status !== '未支付') {
          navigate(
            `/pay-return?out_trade_no=${this.props.location.state.outTradeNo}`
          );
        }
      });
  }

  render() {
    if (this.props.location.state) {
      return (
        <Boxer width={{ xs: 1, sm: 0.8, md: 0.6, lg: 0.5 }} m="auto">
          <TextContainer>
            <Tips>请使用微信扫码完成支付</Tips>
            <Text>
              {/* <QRCode value={this.props.location.state.qrcode} /> */}
            </Text>
          </TextContainer>
        </Boxer>
      );
    }
    return null;
  }
}
