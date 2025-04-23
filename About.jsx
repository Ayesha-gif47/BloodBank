import React from 'react';
import About1 from '../images/About1.jpg';
import Card1 from '../images/Card1.png'

const About = () => {
  return (
    <div className="mx-5 sm:mx-10 lg:mx-28 mt-10">
    <div className="flex flex-col lg:flex-col items-center lg:items-start gap-8">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src={About1}
          alt="About1"
          className="rounded-e-[180px] w-full max-w-xl sm:max-w-sm lg:max-w-5xl"
        />
      </div>
  
      {/* Text Section */}
      <section className="text-gray-600 body-font flex-1">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="lg:w-[50%] sm:w-full">
            <div
              className="w-full sm:p-4 text-center sm:text-left"
              id="About"
            >
              <h1 className="title-font font-medium text-3xl sm:text-4xl mb-4 text-gray-900 underline">
                Thalassemia Patient
              </h1>
              <div className="leading-relaxed text-black text-base sm:text-lg px-2 sm:px-0">
                We provide blood to thalassemia patients by assigning donors in
                teams according to the severity of the disease. Every two
                seconds, someone in the world needs blood. Blood is essential to
                help patients survive surgeries, cancer treatments, chronic
                illnesses, and traumatic injuries.
              </div>
            </div>
          </div>
  
          {/* Smaller Image Section */}
          <div className="w-40 sm:w-48 lg:w-60 mx-auto lg:mx-0">
            <img
              className="object-cover object-center w-full h-auto"
              src={Card1}
              alt="stats"
            />
          </div>
        </div>
      </section>
    </div>
  </div>  
  )
}

export default About

