import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../../../components/title/Title'
import data from './Data'
import './categories.css'

const Categories = () => {
  return (
    <section id='categories'  className='gray-bg' >
        <Title title={'الفئات'} 
        minTitle={'كافة الدورات التدريبية والتعليمية لتطوير قدراتك العملية والعلمية'} />
        <div className="categories-card center container">
          {
            data.map(e =>
              <Link to={`/courseworks/${e.name}`} key={e.name} className="category relative">
                <img src={e.image} alt="" />
                <span className='center relative'>{e.name}</span>
              </Link>
            )
          }
        </div>
    </section>
  )
}

export default Categories