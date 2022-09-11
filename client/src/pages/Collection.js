import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import LazyFetch from '../components/common/requests/LazyFetch';
import { useState } from 'react';

const Collection = (props) => {
  const { name } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    if (!collection) {
      LazyFetch({
        type: 'get',
        endpoint: `/api/collection/${name}`,
        onSuccess: (data) => {
          setCollection(data.result);
        },
        onFailure: (err) => {
          console.error(`[ERROR] - ${err?.message}`);
        }
      })
    }
  }, [name]);

  return name ? (
    <>
      <h1>{name}</h1>
      <Link to={`/`}>Return</Link>
    </>
  ) : (<></>);
};

export default Collection;

Collection.propTypes = {}
