import React, { useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SubCategoryItemBlock = ({ data, ...props }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <Link to={`/item/${data._id}`}>
        <Wrapper
          onMouseEnter={(event) => {
            setHover(true);
          }}
          onMouseLeave={(event) => {
            setHover(false);
          }}
          img={data.img}
        >
          {hover ? <Tooltip /> : <></>}
        </Wrapper>
      </Link>
    </>
  );
};

export default SubCategoryItemBlock;

SubCategoryItemBlock.propTypes = {
  data: PropTypes.object,
};

const Wrapper = styled.div`
  width: 5em;
  height: 5em;
  margin: 1em;
  padding: 1em;

  background-color: var(--contrast-01);
  border-radius: 2em;
  background-image: ${({ img }) => css`url(${img})`};

  :hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 0.25em 0.25em rgb(18, 18, 18, 0.15);
  }
`;

const Tooltip = styled.div`
  width: 1em;
  height: 1em;

  background-color: var(--highlight-02);
  border-radius: 1em;
`;
