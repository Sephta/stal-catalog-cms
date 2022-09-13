import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Item = (props) => {
  const { id } = useParams();

  return (
    <>
      <Wrapper>
        <h1>{id}</h1>
      </Wrapper>
    </>
  );
};

export default Item;

Item.propTypes = {};

const Wrapper = styled.div``;
