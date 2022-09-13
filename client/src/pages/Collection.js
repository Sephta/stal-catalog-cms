import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyFetch, AsyncFetch } from '../components/common/requests';
import { useState } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ThreeDots } from 'react-loading-icons';
import { SubCollectionContainer } from '../components/CollectionPage';
import { CollectionContext } from '../components/common/providers';
import { v4 as uuid } from 'uuid';
import Loading from '../components/common/Loading';

const Collection = (props) => {
  const { id } = useParams();
  const collections = useContext(CollectionContext);
  const [subCollections, setSubCollections] = useState(null);

  useEffect(() => {
    if (collections) {
      asyncFetchSubCollections();
    }
  }, []);

  const asyncFetchSubCollections = async () => {
    for (const collection of collections) {
      if (collection._id == id) {
        for (const subCollection of collection.subCollections) {
          await LazyFetch({
            type: 'get',
            endpoint: `/api/subcollection/${subCollection}`,
            onSuccess: (data) => {
              // console.debug(`[DEBUG] - data.result => ${JSON.stringify(data.result)}`);
              let newSubCollection = (<SubCollectionContainer
                key={uuid()}
                data={data.result}
              />)

              if (subCollections) {
                for (const col of subCollections) {
                  if (!(col.props.data.id === data.result.id)) {
                    setSubCollections(subCollections ? [...subCollections, newSubCollection] : [newSubCollection]);
                  }
                }
              } else {
                setSubCollections(subCollections ? [...subCollections, newSubCollection] : [newSubCollection]);
              }
            },
            onFailure: (err) => {
              console.error(`[ERROR] - ${err?.message}`);
            }
          });
        }
      }
    }
  }

  return subCollections ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{collections.find(collection => collection._id == id).name}</h1>
        {subCollections ? (subCollections) : (<ThreeDots fill={`var\(--highlight-04\)`} />)}
        {/* <SubCollectionContainer 
          data={
            {
              name: "Alpha", 
              amount: 4,
              subCollections: ["sub0", "sub1", "sub2", "sub3"]
            }
          }
        /> */}
      </Wrapper>
      <Footer />
    </>
  ) : (<Loading />);
};

export default Collection;

Collection.propTypes = {}

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;
