import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

const SubCategory = (props) => {
  const { name } = useParams();
  const [collection, setCollection] = useState(null);

  return name ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{name}</h1>
      </Wrapper>
      <Footer />
    </>
  ) : (<></>);
};

export default SubCategory;

SubCategory.propTypes = {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
`;
