import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { CategoryContainer } from '../components/SubCollectionPage';


const SubCollection = (props) => {
  const { name } = useParams();
  const [subCollection, setSubCollection] = useState(null);

  return name ? (
    <>
      <Navbar />
      <Wrapper>
        <h1>{name}</h1>
        <CategoryContainer
          data={
            {
              name: "sub0", 
              amount: 4,
              subCategories: ["Item0", "Item0", "Item0", "Item0"]
            }
          }
        />
      </Wrapper>
      <Footer />
    </>
  ) : (<></>);
};

export default SubCollection;

SubCollection.propTypes = {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
`;
