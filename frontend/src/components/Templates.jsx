import React from 'react'
import Template from './Template';
import t1 from '../assets/t1.png';
import t2 from '../assets/t2.png';
import t3 from '../assets/t3.png';
const Templates = () => {
  const template = [{
    id:1,
    name: 'Template 1',
    image: t1,
    description: 'A simple yet professional resume template',
    features: ['Clean design', 'Customizable sections', 'Multiple fonts']
  }, {
    id:2,
    name: 'Template 2',
    image: t2,
    description: 'A simple yet professional resume template',
    features: ['Clean design', 'Customizable sections', 'Multiple fonts']
  }, {
    id:3,
    name: 'Template 3',
    image: t3,
    description: 'A simple yet professional resume template',
    features: ['Clean design', 'Customizable sections', 'Multiple fonts']
  }];
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="flex gap-4">
        {
          template.map((item) =>{
            return (
              <Template key={item.id} name={item.name} image={item.image}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Templates
