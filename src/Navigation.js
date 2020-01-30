import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => (<nav>
    <Link to="about">About</Link>
    <Link to="/contacts">Contacts</Link>
    <Link to="/services">Services</Link>
</nav>);

export default Navigation;
