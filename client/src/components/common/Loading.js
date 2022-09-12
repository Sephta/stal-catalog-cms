import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';

const Loading = (props) => {
  return (
    <>
      <Wrapper>
        <ThreeDots fill={`var\(--highlight-04\)`} />
      </Wrapper>
    </>
  );
};

export default Loading;

Loading.propTypes = {}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
