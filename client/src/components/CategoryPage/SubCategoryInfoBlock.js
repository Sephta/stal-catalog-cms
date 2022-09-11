import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SubCategoryItemBlock from './SubCategoryItemBlock';

const SubCategoryInfoBlock = ({data, ...props}) => {

  const generateItems = (amount) => {
    let result = []

    for (let i = 0; i < amount; i++) {
      result.push(
        (<SubCategoryItemBlock key={i} data={{name: data.items[i]}} />)
      );
    };

    return result;
  }

  return (
    <>
      <Wrapper>
        <Title>
          <Link to={`/`}>{data.title}</Link>
        </Title>
        <ContentWrapper>
          <Link to={`/`}>{data.subtitle}</Link>
          <ContentBlerb>
            {data.blerb}
          </ContentBlerb>
        </ContentWrapper>
        <ItemWrapper>
          { generateItems(3) }
        </ItemWrapper>
      </Wrapper>
    </>
  );
};

export default SubCategoryInfoBlock;

SubCategoryInfoBlock.propTypes = {
  data: PropTypes.object,
}

const Wrapper = styled.div`
  height: auto;
  margin: 1em 0;
  padding: 1em;

  background-color: var(--base);
  border-radius: 1em;
`;

const Title = styled.div`
  width: 100%;
  height: 2em;

  border-bottom: 1px solid var(--off-black);

  // Title
  > a {
    margin: 0;
    padding: 0;
    height: 2em;
    color: var(--off-black);

    font-size: x-large;
    font-weight: 400;
    /* text-shadow: 0 2px 3px rgba(18, 18, 18, 0.15); */
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }

    :link {
      color: var(--off-black);
    }

    :visited {
      color: var(--off-black);
    }
  }
`;

const ContentWrapper = styled.div`
  margin-top: 1em;

  display: flex;
  flex-direction: column;
  
  // Sub-Title
  > a {
    color: var(--off-black);

    font-size: medium;
    font-weight: 300;
    /* text-shadow: 0 2px 3px rgba(18, 18, 18, 0.15); */
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }

    :link {
      color: var(--off-black);
    }

    :visited {
      color: var(--off-black);
    }
  }
`;

const ContentBlerb = styled.div`
  margin-top: 0.5em;

  font-size: small;
  font-weight: 300;
`;

const ItemWrapper = styled.div`
  margin-top: 1em;
  height: 200px;

  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;

  border-radius: 0 0 1em 1em;

  background-color: var(--highlight-02);
`;
