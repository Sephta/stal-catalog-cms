import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SubCollectionItem = ({data, ...props}) => {
  return (
    <>
      <Link to={`/category/${data.name}`}>
        <Wrapper>

        </Wrapper>
      </Link>
    </>
  );
};

export default SubCollectionItem;

SubCollectionItem.propTypes = {
  key: PropTypes.number,
  data: PropTypes.object,
};

const Wrapper = styled.div`
  width: 5em;
  height: 5em;
  margin: 1em;
  padding: 1em;

  background-color: var(--contrast-01);

  border-radius: 50%;

  :hover {
    transform: translateY(-2px);
    box-shadow: 0 0.25em 0.25em rgb(18, 18, 18, 0.15);
  }
`;
