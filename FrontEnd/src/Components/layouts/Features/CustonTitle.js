import React from 'react'
import { Helmet } from 'react-helmet';

const Title = ({title}) => {
  return (
          <Helmet>
          <title>{`${title} -NayraniAgroHub`} </title>
          </Helmet>
  )
}

export default Title;
