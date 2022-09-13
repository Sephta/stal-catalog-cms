import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../styles/common/Container.styled';
import { StyledNavbar } from '../styles/navbar/Navbar.styled';
import NavItem from './NavItem';
import UserNavbarManager from './UserNavbarManager';
import { ThreeDots } from 'react-loading-icons';
import { CollectionContext, CollectionDispatchContext } from '../common/providers';

const Navbar = (props) => {
  const collections = useContext(CollectionContext);
  const setCollections = useContext(CollectionDispatchContext);

  const generateNavItems = (collections) => {
    let collectionComponents = [];

    let key = 0;
    collections.forEach(collection => {
      collectionComponents.push((<NavItem key={key} data={collection} />));
      key++;
    });

    return collectionComponents.length >= 0 ? (collectionComponents) : (<></>);
  };

  return (
    <>
      <Container>
        <StyledNavbar>
        <Title><Link to={`/`}>Website Title</Link></Title>
          <CollectionWrapper>
            {collections ? (generateNavItems(collections)) : (<ThreeDots fill={`var\(--highlight-04\)`} />)}
          </CollectionWrapper>
          <UserNavbarManager setCollections={setCollections} />
        </StyledNavbar>
      </Container>
    </>
  );
};

export default Navbar;

const Title = styled.h1`
  font-size: xx-large;
  width: 15em;
  height: 100%;
  text-align: center;
  line-height: 100px;

  > * {
    text-decoration: none;

    :link {
      color: var(--off-black);
    }

    :visited {
      color: var(--off-black);
    }
  }
`;

const CollectionWrapper  = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
