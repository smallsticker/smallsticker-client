import React from 'react';
import styled from '@emotion/styled';
import { Boxer } from '@smooth-ui/core-em';
import Loading from '../components/ContributorArea/Loading';
import { client } from '../context/ApolloContext';
import qs from 'qs';
import StoreContext from '../context/StoreContext';
import {
  TextContainer,
  Text as BaseText
} from '../components/shared/Typography';

const Text = styled(BaseText)`
  text-align: center;
`;

export default class PayReturn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orderState: '',
      isReplaced: false
    };
  }

  componentDidMount() {
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    });
    client.getEntry('orders', params.out_trade_no).then(res => {
      if (res.status) {
        this.setState({
          ...this.status,
          loading: false,
          orderState: res.status
        });
        if (res.status === '支付成功') {
          this.setState({
            ...this.status,
            isReplaced: true
          });
          localStorage.removeItem('shopify_checkout_id');
          this.setState({
            ...this.status,
            isReplaced: false
          });
        }
      }
    });
  }

  render() {
    const { loading, orderState, isReplaced } = this.state;
    const msg =
      orderState === '支付成功'
        ? '支付成功，我们会第一时间安排发货，敬请耐心等待，您也可以登录查询实时订单状态，祝您生活愉快！'
        : orderState;
    return loading ? (
      <Loading />
    ) : (
      <StoreContext.Consumer>
        {({ replaceCart }) => {
          if (isReplaced) {
            replaceCart();
          }
          return (
            <Boxer width={{ sm: 1, md: 0.8 }} m="auto">
              <TextContainer>
                <Text>{msg}</Text>
              </TextContainer>
            </Boxer>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}
