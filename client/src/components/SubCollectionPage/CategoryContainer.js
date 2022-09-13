import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import { v4 as uuid } from "uuid";

const CategoryContainer = ({ data, ...props }) => {
  const generateItems = (data) =>
    data.subCategories.map((subCategoryId) => (
      <CategoryItem key={uuid()} data={{ name: subCategoryId }} />
    ));

  return (
    <>
      <Wrapper>
        <Link to={`/category/${data.id}`}>{data.name}</Link>
        <ContentWrapper>{generateItems(data)}</ContentWrapper>
      </Wrapper>
    </>
  );
};

export default CategoryContainer;

CategoryContainer.propTypes = {
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
