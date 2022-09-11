import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';

const CategoryContainer = ({ data, ...props}) => {

  const generateItems = (amount) => {    
    let result = []

    for (let i = 0; i < amount; i++) {
      result.push(<CategoryItem key={i} data={{name: data.subCategories[i]}} />)
    }

    return result
  }

  return (
    <>
      <Wrapper>
        <Link to={`/category/${data.name}`}>{data.name}</Link>
        <ContentWrapper>
          { generateItems(data.amount) }
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default CategoryContainer;

CategoryContainer.propTypes = {
  key: PropTypes.number,
  data: PropTypes.object,
};

const Wrapper = styled.div`
  /* width: 100%; */
  height: auto;
  margin: 1em 0;
  padding: 1em;

  background-color: var(--base);
  border-radius: 1em;

  display: flex;
  flex-direction: column;

  > a {
    color: var(--off-black);

    font-size: larger;
    font-weight: 600;
    text-shadow: 0 2px 3px rgba(18, 18, 18, 0.15);
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
  /* width: 100%; */
  height: auto;
  margin: 1em 0;
  padding: 1em;
  
  background-color: var(--highlight-02);
  border-radius: 0 0 1em 1em;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
