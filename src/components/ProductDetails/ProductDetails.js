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
      <UnitOption value="cm" active={unit === 'cm'} onClick={handleClick}>
        厘米
      </UnitOption>
      <UnitOption value="in" active={unit === 'in'} onClick={handleClick}>
        英寸
      </UnitOption>
    </UnitWrapper>
  );
};

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      units: 'cm'
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
            发邮件到
            <a href="mailto:team@smallsticker.com">team@smallsticker.com</a>
            ，如果合理，我们会添加该规格
          </p>
        </Section>
        <Section id="materials-fit">
          <SectionHeading>贴纸材料和规格说明</SectionHeading>
          <p>
            精选进口3M材料、艺术品保护级Avery
            Dennison（艾利丹尼森）保护膜，爱普生绿色环保原装墨水
          </p>
          <SubHeading>模切贴纸</SubHeading>
          <UnorderedList>
            <li>印刷设备: Epson(爱普生) SureColor S80680</li>
            <li>切割设备: Roland(罗兰) CAMM-1 GS-24</li>

            <li>材料:</li>
            <NestedUnorderedList>
              <li>
                墨水：通过GREENGUARD
                室内空气质量认证的Epson(爱普生)“活的色彩GS3”/“活的色彩GS3
                RED”溶剂墨水
              </li>
              <li>背胶：Avery Dennison(艾利丹尼森) MP2-3004延压级三年可移除</li>
              <li>
                保护膜：Avery
                Dennison（艾利丹尼森）DOL3100哑面冷裱膜防紫外线延压级
              </li>
            </NestedUnorderedList>
          </UnorderedList>
        </Section>

        <Section id="care-instructions">
          <SectionHeading>注意事项</SectionHeading>
          <SubHeading>模切贴纸</SubHeading>
          <p>
            第一步，拭去设备上的灰尘等污物，拿产品放在要贴的地方，大概确定黏贴的位置
          </p>
          <p>
            第二步，撕去底纸，轻轻放在要贴的位置，慢慢推贴纸，调整方向，完全确定黏贴位置
          </p>
          <p>第三步，从任意一侧，慢慢推平贴纸，防止气泡产生，黏贴完毕</p>
        </Section>
      </ProductTextContainer>
    );
  }
}

export default ProductDetails;
