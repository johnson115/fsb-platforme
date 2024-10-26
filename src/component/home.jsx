



import React from 'react';
import Drawer from './Drawer';
import PostExample from './post';

const Home = () => {
    return (
        <>
        <Drawer/>
        <div className='Home'>
            <div className="content">
            <PostExample/>
            </div>
        </div>
        </>
    );
}

export default Home;
