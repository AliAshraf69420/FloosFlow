import React from 'react';
import { Route } from 'react-router-dom';

const Home = () => {
    return (
        <Route path="/" element={<Home />} />
    );
};

export default Home;