import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LazyFetch from '../common/requests/LazyFetch';
import { UserContext } from '../common/UserProvider';
import { Container } from '../styles/common/Container.styled';
import { StyledNavbar } from '../styles/navbar/Navbar.styled';
import NavItem from './NavItem';
import UserNavbarManager from './UserNavbarManager';
import { ThreeDots } from 'react-loading-icons';

const Navbar = (props) => {
  const user = useContext(UserContext);

  const [collections, setCollections] = useState(null);
 
  useEffect(() => {
    if (!collections) {
      LazyFetch({
        type: 'get',
        endpoint: '/api/collection',
        // headers: { Authorization: `Bearer ${user.token}` },
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${data.message}`);
          // data.result.forEach(item => {
          //   console.debug(`[DEBUG] - ${JSON.stringify(item)}`);
          // });
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
        <Title><Link to={`/`}>Website Title</Link></Title>
          <CollectionWrapper>
            {collections ? (generateNavItems(collections)) : (<ThreeDots fill={`#121212`} />)}
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
