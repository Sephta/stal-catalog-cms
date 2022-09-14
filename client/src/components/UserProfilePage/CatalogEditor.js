import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CatalogEditor = ({ ...props }) => {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

export default CatalogEditor;

CatalogEditor.propTypes = {};

const Wrapper = styled.div`
  height: 500px;
  margin: 1em;
  padding: 1em;

  border: 1px solid red;
  border-radius: 1em;
`;
