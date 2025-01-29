import React from 'react';

const AboutUs = () => {
  return (
<div id="AboutUs" className="px-4 sm:px-6 lg:px-20 py-16">
  <section className="text-gray-600 body-font">
    <div className="container mx-auto">
      {/* Flex Container */}
      <div className="flex flex-wrap justify-normal text-center">
        {/* Content Section */}
        <div className="w-full sm:w-4/5 lg:w-1/2 px-4 py-20">
          <h2 className="title-font text-3xl sm:text-4xl font-bold underline text-gray-900 mb-6">
            About Us
          </h2>
          <p className="leading-relaxed text-base sm:text-lg lg:text-xl text-black">
            We provide blood to thalassemia patients by assigning donors in teams according to the severity of the disease. 
            Every two seconds, someone in the world needs blood. Blood is essential to help patients survive surgeries, 
            cancer treatments, chronic illnesses, and traumatic injuries.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
  )
}

export default AboutUs


