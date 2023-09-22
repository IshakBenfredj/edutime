import React from 'react'
import Landing from './landing/Landing'
import Categories from './categories/Categories'
import About from './about/About'
import Contact from './contact/Contact'
import CourseworksSugg from './sugg/CourseworksSugg'
import CentersSugg from './sugg/CentersSugg'
import WhyUs from './why/WhyUs'

const Home = ({setId}) => {
return (
    <>
        <Landing />
        <Categories />
        <CourseworksSugg />
        <CentersSugg setId={setId} />
        <About />
        <WhyUs />
        <Contact />
    </>
)
}

export default Home