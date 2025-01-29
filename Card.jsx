import React from 'react'
import Card1 from '../images/Card1.png'
import Card2 from '../images/Card2.png'
import Card3 from '../images/Card3.png'

const Card = () => {
  return (
    <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-5 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {/* Card 1 */}
          <div className="p-4 sm:w-1/2 md:w-1/3">
            <div className="flex flex-col items-center">
              <img
                className="w-36 h-36 object-cover object-center mb-4"
                src={Card1}
                alt="blog"
              />
              <div className="text-center">
                <h1 className="title-font text-xl font-bold text-black mb-2">
                  Thalassemia Patient
                </h1>
                <p className="leading-relaxed text-sm text-gray-700 mb-4">
                  People with thalassemia produce either no or too little
                  hemoglobin, which is used by red blood cells to carry oxygen
                  around the body.
                </p>
                <a
                  className="text-red-500 inline-flex items-center font-semibold"
                  href="#"
                  id="btn1"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
  
          {/* Card 2 */}
          <div className="p-4 sm:w-1/2 md:w-1/3">
            <div className="flex flex-col items-center">
              <img
                className="w-36 h-36 object-cover object-center mb-4"
                src={Card3}
                alt="blog"
              />
              <div className="text-center">
                <h1 className="title-font text-xl font-bold text-black mb-2">
                  Become a Donor
                </h1>
                <p className="leading-relaxed text-sm text-gray-700 mb-4">
                  People with thalassemia produce either no or too little
                  hemoglobin, which is used by red blood cells to carry oxygen
                  around the body.
                </p>
                <a
                  className="text-red-500 inline-flex items-center font-semibold"
                  href="#"
                  id="btn1"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
  
          {/* Card 3 */}
          <div className="p-4 sm:w-1/2 md:w-1/3">
            <div className="flex flex-col items-center">
              <img
                className="w-36 h-36 object-cover object-center mb-4"
                src={Card2}
                alt="blog"
              />
              <div className="text-center">
                <h1 className="title-font text-xl font-bold text-black mb-2">
                  Regular Patient
                </h1>
                <p className="leading-relaxed text-sm text-gray-700 mb-4">
                  People with thalassemia produce either no or too little
                  hemoglobin, which is used by red blood cells to carry oxygen
                  around the body.
                </p>
                <a
                  className="text-red-500 inline-flex items-center font-semibold"
                  href="#"
                  id="btn1"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>  
  )
}

export default Card
