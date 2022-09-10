import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Container } from '../styles/common/Container.styled';

const NavItem = ({data, ...props}) => {
  return (
    <>
      <Container>
        <Wrapper id="nav-item-wrapper" debug>
          {data.name}
        </Wrapper>
      </Container>
    </>
  );
};

export default NavItem;

NavItem.propTypes = {
  data: PropTypes.object,
}

const Wrapper = styled.div`
  width: 10em;
  height: 2.5em;

  margin: 0 1em;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--highlight-03);

  /* border: ${({debug}) => {debug ? css`1px solid red` : css``}}; */
  /* border: 1px solid red; */
  border-radius: 0.25em;


  :hover {
    transform: translateY(-1px);
    box-shadow: 0em 0.25em 0.5em rgb(18, 18, 18, 0.15);

    cursor: pointer;
  }
`;
