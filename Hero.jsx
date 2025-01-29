import React from 'react'
import Card from './Card'
import AboutUs from './AboutUs'
import About from './About'

const Hero = () => {
  return (
    <>
     <div className="mt-12" id="home">
  <section className="text-gray-600 body-font">
    <div className="container px-4 py-32 mx-auto flex flex-wrap items-center justify-normal">
      {/* Content Container */}
      <div className="lg:w-1/2 md:w-1/2 w-full text-center px-4">
        <h1 className="title-font font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
          "Be a Hero, Donate Blood-Save Lives"
        </h1>
        <p className="leading-relaxed text-white text-base sm:text-lg">
          We connect blood donors with those in need, offering vital support for
          emergencies and specialized care for thalassemia patients. Together, we save
          lives and bring hope to countless families.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="text-red-400 bg-white border-4 border-red-400 rounded-full py-2 px-6 text-lg font-bold hover:bg-red-50 transition-all duration-300">
            Donate Now
          </button>
          <button className="text-red-400 bg-white border-4 border-red-400 rounded-full py-2 px-6 text-lg font-bold hover:bg-red-50 transition-all duration-300">
            Emergency
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

    <Card/>
    <About/>
    <AboutUs/>
    </>
  )
}

export default Hero
