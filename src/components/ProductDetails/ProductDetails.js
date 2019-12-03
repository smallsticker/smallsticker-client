import React from 'react';
import styled from '@emotion/styled';
import SizeChartTable from './SizeChartTable';
import BackButton from './BackButton';

import {
  Heading as BaseHeading,
  TextContainer,
  UnorderedList
} from '../shared/Typography';
import { colors, spacing, dimensions, breakpoints } from '../../utils/styles';

const Heading = styled(BaseHeading)`
  margin-bottom: -${spacing.sm}px;
`;

const ProductTextContainer = styled(TextContainer)`
  padding: ${spacing.xl}px;
`;

const Section = styled(`section`)`
  padding-top: calc(${dimensions.headerHeight} + ${spacing.sm}px);
`;

const SectionHeading = styled(Heading.withComponent(`h2`))`
  font-size: 1.8rem;
  letter-spacing: -0.01em;
  margin-bottom: ${spacing.sm}px;
`;

const SubHeading = styled(Heading.withComponent(`h3`))`
  color: ${colors.text};
  font-size: 1.2rem;
  margin: ${spacing.lg}px 0 ${spacing.xs}px;
`;

const NestedUnorderedList = styled(UnorderedList)`
  list-style-type: disc;
  margin-top: 0;
`;

const UnitWrapper = styled('div')`
  align-items: center;
  display: flex;
  float: right;
  font-size: 0.75rem;
  margin: ${-1 * spacing.lg}px 0 ${spacing.md}px 0;
`;

const UnitOption = styled('div')`
  background: ${props => props.active && colors.brand};
  border-radius: 1em;
  color: ${props => props.active && colors.lightest};
  cursor: pointer;
  margin-right: 0.5em;
  padding: 0.2em 0.5em;

  &:hover {
    background: ${props => !props.active && colors.brandLight};
  }
`;

const UnitsLabel = styled('div')`
  margin-right: 1em;
`;

const UnitSelector = ({ setUnits, unit }) => {
  const handleClick = event => {
    setUnits(event.target.getAttribute('value'));
  };

  return (
    <UnitWrapper>
      <UnitsLabel>单位:</UnitsLabel>
      <UnitOption value="in" active={unit === 'in'} onClick={handleClick}>
        英寸
      </UnitOption>
      <UnitOption value="cm" active={unit === 'cm'} onClick={handleClick}>
        厘米
      </UnitOption>
    </UnitWrapper>
  );
};

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      units: 'in'
    };
    this.changeUnits = this.changeUnits.bind(this);
  }

  changeUnits(units) {
    this.setState({ units });
  }

  render() {
    const { units } = this.state;

    return (
      <ProductTextContainer>
        <Heading>产品详情</Heading>
        <BackButton>回到产品</BackButton>
        <Section id="size-chart">
          <SectionHeading>规格表</SectionHeading>
          <UnitSelector unit={units} setUnits={this.changeUnits} />
          <SizeChartTable unit={units} />
          <p>
            <strong style={{ color: colors.brand }}>
              没有看到您想要的大小？
            </strong>{' '}
            发邮件到 team@gatsbyjs.com，如果合理，我们会添加该规格！
          </p>
        </Section>
        <Section id="materials-fit">
          <SectionHeading>贴纸材料和规格说明</SectionHeading>
          <p>
            To help you find the right size and fit, here are some additional
            details about our t-shirts.
          </p>
          <SubHeading>Dark Deploy Tee</SubHeading>
          <UnorderedList>
            <li>Material: 50% polyester, 25% cotton, 25% rayon</li>
            <li>Fit:</li>
            <NestedUnorderedList>
              <li>Unisex sizes: regular/retail fit</li>
              <li>Women’s sizes: semi-relaxed fit</li>
            </NestedUnorderedList>
          </UnorderedList>
          <SubHeading>Purple Logo Tee</SubHeading>
          <UnorderedList>
            <li>Material: 100% cotton</li>
            <li>Fit:</li>
            <NestedUnorderedList>
              <li>All sizes: regular/retail fit</li>
            </NestedUnorderedList>
          </UnorderedList>
        </Section>

        <Section id="care-instructions">
          <SectionHeading>注意事项</SectionHeading>
          <SubHeading>Socks</SubHeading>
          <p>
            Keep those socks comfy on your feet and looking bright by washing
            them in cold water with darker colors. Tumble dry on low so they
            don’t shrink!
          </p>
          <SubHeading>T-Shirts</SubHeading>
          <p>
            Machine wash cold and tumble dry only. These shirts can’t take the
            heat (literally)! We want to make sure you’re happy with our shirts,
            but they require a little TLC.
          </p>
        </Section>
      </ProductTextContainer>
    );
  }
}

export default ProductDetails;
