import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { SubCategoryInfoBlock } from '../components/CategoryPage';
import Loading from '../components/common/Loading';
import { useInterval } from '../hooks';
import { LazyFetch } from '../components/common/requests';
import { v4 as uuid } from 'uuid';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const Category = (props) => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);

  useInterval(() => {
    if (!category) {
      LazyFetch({
        type: 'get',
        endpoint: `/api/category/${id}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${data.message}`);
          // data.result.forEach(item => {
          //   console.debug(`[DEBUG] - ${JSON.stringify(item)}`);
          // });
          setCategory(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        }
      })
    }
  }, 1000);

  useEffect(() => {
    if (category) {
      // console.debug(`[DEBUG] - hello world`);
      asyncFetchSubCategories();
    }
  }, [category]);

  const asyncFetchSubCategories = async () => {
    for (const subCategoryId of category.subCategories) {
      await LazyFetch({
        type: `get`,
        endpoint: `/api/subcategory/${subCategoryId}`,
        onSuccess: (data) => {
          // console.debug(`[DEBUG] - ${JSON.stringify(data)}`);
          let newSubCategoryInfoBlock = <SubCategoryInfoBlock key={uuid()} data={data.result} />;
          if (subCategories) {
            for (const subcat of subCategories) {
              if (!(subcat.props.data.id === data.result.id)) {
                setSubCategories(subCategories ? [...subCategories, newSubCategoryInfoBlock] : [newSubCategoryInfoBlock]);
              }
            }
          } else {
            setSubCategories(subCategories ? [...subCategories, newSubCategoryInfoBlock] : [newSubCategoryInfoBlock]);
          }
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err}`);
        },
      });
    }
  };

  return category ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{category.name}</h1>
        <ContentWrapper>
          {subCategories ? subCategories : <></>}
          {/* <SubCategoryInfoBlock
            data={{
              title: "Title",
              subtitle: "Sub-Title",
              blerb: lorem,
              items: ["Item01", "Item02", "Item03"],
            }}
          />
          <SubCategoryInfoBlock
            data={{
              title: "Title",
              subtitle: "Sub-Title",
              blerb: lorem+lorem+lorem+lorem+lorem+lorem+lorem+lorem,
              items: ["Item01", "Item02", "Item03"],
            }}
          /> */}
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </>
  ) : (<Loading />);
};

export default Category;

Category.propTypes = {}

const Wrapper = styled.div`
  height: 100%;
  padding: 1em;
`;

const ContentWrapper = styled.div`
  padding: 1em;
`;
