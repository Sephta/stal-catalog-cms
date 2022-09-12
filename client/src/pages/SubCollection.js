import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { CategoryContainer } from '../components/SubCollectionPage';
import { CollectionContext } from '../components/common/CollectionProvider';
import { v4 as uuid } from 'uuid';
import { useInterval } from '../hooks';
import { LazyFetch } from '../components/common/requests';
import Loading from '../components/common/Loading';

const SubCollection = (props) => {
  const { id } = useParams();
  const [subCollection, setSubCollection] = useState(null);
  const [categories, setCategories] = useState(null);

  useInterval(() => {
    if (!subCollection) {
      LazyFetch({
        type: 'get',
        endpoint: `/api/subcollection/${id}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${data.message}`);
          // data.result.forEach(item => {
          //   console.debug(`[DEBUG] - ${JSON.stringify(item)}`);
          // });
          setSubCollection(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        }
      })
    }
  }, 1000);

  useEffect(() => {
    if (subCollection) {
      // console.debug(`[DEBUG] - hello world`);
      asyncFetchCategories();
    }
  }, [subCollection]);

  const asyncFetchCategories = async () => {
    for (const categoryId of subCollection.categories) {
      await LazyFetch({
        type: `get`,
        endpoint: `/api/category/${categoryId}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${JSON.stringify(data)}`);
          let newCategoryContainer = <CategoryContainer key={uuid()} data={data.result} />;
          if (categories) {
            for (const cat of categories) {
              if (!(cat.props.data.name === data.result.name)) {
                setCategories(categories ? [...categories, newCategoryContainer] : [newCategoryContainer]);
              }
            }
          } else {
            setCategories(categories ? [...categories, newCategoryContainer] : [newCategoryContainer]);
          }
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      })
    }
  };

  return subCollection ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{subCollection.name}</h1>
        { categories ? categories : <></>}
        {/* <CategoryContainer
          data={
            {
              name: "sub0", 
              amount: 4,
              subCategories: ["Item0", "Item0", "Item0", "Item0"]
            }
          }
        /> */}
      </Wrapper>
      <Footer />
    </>
  ) : (<Loading />);
};

export default SubCollection;

SubCollection.propTypes = {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
`;
