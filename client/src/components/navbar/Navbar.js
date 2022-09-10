import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import LazyFetch from '../common/requests/LazyFetch';
import { UserContext } from '../common/UserProvider';
import { Container } from '../styles/common/Container.styled';
import { StyledNavbar } from '../styles/navbar/Navbar.styled';
import NavItem from './NavItem';
import UserNavbarManager from './UserNavbarManager';

const Navbar = (props) => {
  const user = useContext(UserContext);

  const [collections, setCollections] = useState([]);
 
  useEffect(() => {
    if (user && collections.length === 0) {
      LazyFetch({
        type: 'get',
        endpoint: '/api/collection',
        headers: { Authorization: `Bearer ${user.token}` },
        onSuccess: (data) => {
          console.debug(`[DEBUG] - ${data.message}`);
          data.result.forEach(item => {
            console.debug(`[DEBUG] - ${JSON.stringify(item)}`);
          });
          setCollections(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        }
      })
    }
  });

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
          <Title>Website Title</Title>
          <CollectionWrapper>
            {collections.length >= 0 ? (generateNavItems(collections)) : (<></>)}
          </CollectionWrapper>
          <UserNavbarManager />
        </StyledNavbar>
      </Container>
    </>
  );
};

export default Navbar;

const Title = styled.h1`
  font-size: xx-large;
  margin: 0 2em;
  width: 15em;
  height: 100%;
  text-align: center;
  line-height: 100px;
`;

const CollectionWrapper  = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
