import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LazyFetch from '../components/common/requests/LazyFetch';
import { useState } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ThreeDots } from 'react-loading-icons';

import { SubCollectionContainer } from '../components/CollectionPage';

const Collection = (props) => {
  const { name } = useParams();
  const [collection, setCollection] = useState(null);
  const [subCollections, setSubCollections] = useState(null);

  useEffect(() => {
    if (!collection) {
      LazyFetch({
        type: 'get',
        endpoint: `/api/collection/${name}`,
        onSuccess: (data) => {
          setCollection(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        }
      })
    }
  }, [name]);

  return name ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{name}</h1>
        {/* {subCollections ? (generateNavItems(subCollections)) : (<ThreeDots fill={`var\(--highlight-04\)`} />)} */}
        <SubCollectionContainer 
          data={
            {
              name: "Alpha", 
              amount: 4,
              subCollections: ["sub0", "sub1", "sub2", "sub3"]
            }
          }
        />
        <SubCollectionContainer 
          data={
            {
              name: "Beta", 
              amount: 1,
              subCollections: ["sub0"]
            }
          }
        />
        <SubCollectionContainer 
          data={
            {
              name: "Charlie", 
              amount: 3,
              subCollections: ["sub0", "sub1", "sub2"]
            }
          }
        />
      </Wrapper>
      <Footer />
    </>
  ) : (<></>);
};

export default Collection;

Collection.propTypes = {}

const Wrapper = styled.div`
  /* width: 100%; */
  height: 100%;
  padding: 1em;
`;
