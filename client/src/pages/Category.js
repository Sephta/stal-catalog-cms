import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { SubCategoryInfoBlock } from '../components/CategoryPage';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const Category = (props) => {
  const { name } = useParams();
  const [collection, setCollection] = useState(null);

  return name ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{name}</h1>
        <ContentWrapper>
          <SubCategoryInfoBlock
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
          />
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </>
  ) : (<></>);
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
