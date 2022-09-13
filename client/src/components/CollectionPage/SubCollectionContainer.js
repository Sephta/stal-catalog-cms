import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SubCollectionItem from './SubCollectionItem';
import { Link } from 'react-router-dom';
import { CollectionContext } from '../common/CollectionProvider';
import { LazyFetch } from '../common/requests';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import { v4 as uuid } from 'uuid';

const SubCollectionContainer = ({data, ...props}) => {
  const collections = useContext(CollectionContext);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (collections) {
      asyncFetchCategories();
    }
  }, []);

  const asyncFetchCategories = async () => {
    for (const categoryId of data.categories) {
      await LazyFetch({
        type: 'get',
        endpoint: `/api/category/${categoryId}`,
        onSuccess: (data) => {
          let newCategory = (<SubCollectionItem 
            key={uuid()} 
            data={data.result} 
          />)

          if (categories) {
            for (const cat of categories) {
              if (!(cat.props.data.id === data.result.id)) {
                setCategories(categories ? [...categories, newCategory] : [newCategory]);
              }
            }
          } else {
            setCategories(categories ? [...categories, newCategory] : [newCategory]);
          }
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  };

  return categories ? (
    <>
      <Wrapper>
        <Link to={`/subcollection/${data.id}`}>{data.name}</Link>
        <ContentWrapper>
          { categories }
        </ContentWrapper>
      </Wrapper>
    </>
  ) : (<ThreeDots fill={`var\(--highlight-04\)`} />);
};

export default SubCollectionContainer;

SubCollectionContainer.propTypes = {
  data: PropTypes.object,
};

const Wrapper = styled.div`
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
  height: auto;
  margin: 1em 0;
  padding: 1em;
  
  background-color: var(--highlight-02);
  border-radius: 0 0 1em 1em;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
