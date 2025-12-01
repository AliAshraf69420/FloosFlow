import React from 'react';
// import { Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// import {service} from '../components/Home/service';
import Services from '../components/Home/services';
const Home = () => {
    return (
        <div>
            <NavBar />

                <Services />
            <Footer />
        </div>
    );
};

export default Home;