import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';

const NotFound = () => {

  return (
    <div className="">
      <h3>Not Found</h3>
      <Link to={"/"}><Button>Go back</Button></Link>
    </div>
  );
};

export default NotFound;