import React from 'react';
import styled from '@emotion/styled';

import { Button, PrimaryButton } from '../components/shared/Buttons';
import {
  Input,
  Select,
  Submit,
  Textarea
} from '../components/shared/FormElements';
import { FaAlipay, FaWeixin } from 'react-icons/fa';
import { Form, FormField, FormFieldLabel, Boxer } from '@smooth-ui/core-em';

const SubmitButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  height: 'auto';
  width: '100%';
`;

function Example() {
  return (
    <Boxer width={{ sm: 1, md: 0.8 }} m="auto">
      <Form>
        <FormField>
          <FormFieldLabel name="name">Email</FormFieldLabel>
          <Input name="name" type="text" />
        </FormField>
        <FormField>
          <FormFieldLabel name="firstname">手机号</FormFieldLabel>
          <Input name="firstname" />
        </FormField>
        <FormField>
          <FormFieldLabel name="address">收件地址</FormFieldLabel>
          <Textarea scale="xl" placeholder="Extra large" />
        </FormField>
        <FormField>
          <FormFieldLabel name="firstname">支付方式</FormFieldLabel>
          <Select id="variant" value="pay" name="pay">
            <option disabled value="">
              Choose Size <FaAlipay />
            </option>

            <option value="weixin" key="weixin">
              <FaWeixin />
            </option>
            <option value="alipay" key="alipay">
              <FaAlipay />
            </option>
          </Select>
        </FormField>
        <FormField>
          <SubmitButton type="submit">去支付</SubmitButton>
        </FormField>
      </Form>
    </Boxer>
  );
}

export default Example;
