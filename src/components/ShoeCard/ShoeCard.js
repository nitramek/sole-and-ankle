import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, pluralize, isNewShoe} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
      ? ['on-sale', 'Sale']
      : isNewShoe(releaseDate)
          ? ['new-release', 'Just released!']
          : ['default', '']

  return (
      <Link href={`/shoe/${slug}`}>
        <Wrapper>
          <ImageWrapper>
            <Image alt="" src={imageSrc}/>
            <Tag className={variant[0]}>
              {variant[1]}
            </Tag>
          </ImageWrapper>
          <Spacer size={12}/>
          <Row>
            <Name>{name}</Name>
            <Price style={{
              '--color': variant[0] === 'on-sale' ? COLORS.gray["700"] : undefined,
              '--decoration': variant[0] === 'on-sale' ? 'line-through' : undefined,
            }}>{formatPrice(price)}</Price>
          </Row>
          <Row>
            <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
            {variant[0] === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : undefined}
          </Row>
        </Wrapper>
      </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
  color: ${COLORS.white};
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};

  &.new-release {
    background-color: ${COLORS.secondary};
  }

  &.on-sale {
    background-color: ${COLORS.primary};
  }
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
