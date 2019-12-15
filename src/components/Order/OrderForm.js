import React, { Component } from 'react';
import styled from '@emotion/styled';
import StoreContext from '../../context/StoreContext';
import { colors, spacing, radius } from '../../utils/styles';
import { Input, Select, Submit, Textarea } from '../shared/FormElements';
import { MdErrorOutline } from 'react-icons/md';
import { Form, FormField, FormFieldLabel, Boxer } from '@smooth-ui/core-em';

import * as districtService from './districtService';
const SubmitButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  height: 'auto';
  width: '100%';
`;

const Errors = styled(`div`)`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${spacing.xs}px;
  width: 100%;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  background: ${colors.error};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  color: ${colors.lightest};
  display: flex;
  flex-basis: 40px;
  justify-content: center;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const ErrorMsgs = styled(`ul`)`
  border: 1px dashed ${colors.error};
  border-left: none;
  border-radius: 0 ${radius.default}px ${radius.default}px 0;
  color: ${colors.error};
  flex-grow: 1;
  margin: 0;
  padding: ${spacing.xs}px;
  padding-left: ${spacing.xl}px;
`;

class OrderForm extends Component {
  state = {
    email: '',
    phone: '',
    payMethod: '',
    province: '',
    provinces: [],
    city: '',
    cities: [],
    district: '',
    districts: [],
    address: '',
    errors: []
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      provinces: districtService.getProvinces()
    });
  }

  handleProvinceChange = event => {
    event.preventDefault;
    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }
    const value = event.target.value;
    this.setState({
      ...this.state,
      province: value,
      city: '',
      district: '',
      cities: districtService.getCities(districtService.getCodeByRegion(value)),
      districts: []
    });
  };
  handleCityChange = event => {
    event.preventDefault;
    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }
    const value = event.target.value;

    this.setState({
      ...this.state,
      [event.target.name]: value,
      district: '',
      districts: districtService.getDistricts(
        districtService.getCodeByRegion(value)
      )
    });
  };

  handleChange = event => {
    event.preventDefault();

    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = callback => event => {
    event.preventDefault();

    const errors = [];
    const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRE = /^\d{11}$/;

    if (this.state.email === '') {
      errors.push({
        field: '电子邮箱',
        msg: '必须填写'
      });
    }

    if (this.state.email && !emailRE.test(this.state.email.toLowerCase())) {
      errors.push({
        field: '电子邮箱',
        msg: '格式错误'
      });
    }

    if (this.state.phone === '') {
      errors.push({
        field: '手机号码',
        msg: '必须填写'
      });
    }

    if (this.state.phone && !phoneRE.test(this.state.phone)) {
      errors.push({
        field: '手机号码',
        msg: '格式错误'
      });
    }

    if (this.state.address === '') {
      errors.push({
        field: '详细地址',
        msg: '必须填写'
      });
    }

    if (this.state.province === '') {
      errors.push({
        field: '省份',
        msg: '必须选择'
      });
    }

    if (this.state.city === '') {
      errors.push({
        field: '城市',
        msg: '必须选择'
      });
    }

    if (this.state.district === '') {
      errors.push({
        field: '区县',
        msg: '必须选择'
      });
    }

    if (this.state.payMethod === '') {
      errors.push({
        field: '支付方式',
        msg: '必须选择'
      });
    }

    if (errors.length) {
      this.setState({ errors: errors });
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      return;
    }

    callback(
      this.state.email,
      this.state.phone,
      this.state.province +
        this.state.city +
        this.state.district +
        this.state.address,
      this.state.payMethod
    );
  };

  render() {
    const { provinces, cities, districts, errors } = this.state;
    return (
      <StoreContext.Consumer>
        {({ submitOrder }) => (
          <Boxer
            width={{ xs: 0.88, sm: 0.8, md: 0.6, lg: 0.5 }}
            pt={spacing.md}
            m="auto"
          >
            <Form onSubmit={this.handleSubmit(submitOrder)} noValidate>
              <Errors show={errors.length}>
                <ErrorSign>
                  <MdErrorOutline />
                </ErrorSign>
                <ErrorMsgs>
                  {errors.map(error => (
                    <li
                      key={error.field}
                      dangerouslySetInnerHTML={{
                        __html: `${error.field}: ${error.msg}`
                      }}
                    />
                  ))}
                </ErrorMsgs>
              </Errors>
              <FormField>
                <FormFieldLabel name="email">电子邮箱</FormFieldLabel>
                <Input
                  placeholder="请输入GitHub关联的邮箱"
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField>
                <FormFieldLabel name="phone">手机号码</FormFieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField>
                <FormFieldLabel name="address">收件地址</FormFieldLabel>
                <Select
                  id="province"
                  name="province"
                  value={this.state.province}
                  onChange={this.handleProvinceChange}
                >
                  <option disabled value="">
                    选择省份
                  </option>
                  {Object.keys(this.state.provinces).map((p, index) => (
                    <option key={index}>{this.state.provinces[p]}</option>
                  ))}
                </Select>
              </FormField>
              <FormField>
                <Select
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleCityChange}
                >
                  <option disabled value="">
                    选择城市
                  </option>
                  {Object.keys(this.state.cities).map((p, index) => (
                    <option key={index}>{this.state.cities[p]}</option>
                  ))}
                </Select>
              </FormField>
              <FormField>
                <Select
                  id="district"
                  name="district"
                  value={this.state.district}
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    选择区县
                  </option>
                  {Object.keys(this.state.districts).map((p, index) => (
                    <option key={index}>{this.state.districts[p]}</option>
                  ))}
                </Select>
              </FormField>
              <FormField>
                <Textarea
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </FormField>

              <FormField>
                <FormFieldLabel name="payMethod">支付方式</FormFieldLabel>
                <Select
                  id="payMethod"
                  name="payMethod"
                  value={this.state.payMethod}
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    选择支付方式
                  </option>
                  <option value="alipay" key="alipay">
                    支付宝
                  </option>
                  <option value="weixinpay" key="weixinpay">
                    微信支付
                  </option>
                </Select>
              </FormField>
              <FormField>
                <SubmitButton type="submit">去支付</SubmitButton>
              </FormField>
            </Form>
          </Boxer>
        )}
      </StoreContext.Consumer>
    );
  }
}

export default OrderForm;
