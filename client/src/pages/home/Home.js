import React from 'react'
import Landing from './Landing'
import Categories from './Categories'
import About from './About'
import Contact from './contact/Contact'
import CourseworksSugg from './CourseworksSugg'
import WhyUs from './why/WhyUs'

const Home = () => {
return (
    <>
        <Landing />
        <Categories />
        <CourseworksSugg />
        <About />
        <WhyUs />
        <Contact />
    </>
)
}

export default Home