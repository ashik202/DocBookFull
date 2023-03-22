import React from 'react';
import firstimg from "../../Images/undraw_medicine_b1ol.png"
import './landing.css'

const Landing = () => {
  
  return (
    <div className='landingpage'>
      <section className=" first-section ">
        <div className="container  mx-auto bg-white">
          <div className="lg:flex lg:items-center lg:-mx-6 bg-white">
            <div className="lg:w-1/2 lg:mx-6 bg-white">
              <h1 className="text-center text-4xl mt-5 font-black">Welcome To<p className="text-indigo-500">DOCBOOK</p> </h1>
              <p className=''>Book Your Apointment From Anywere</p>
            </div>
            
            <div className="mt-8 lg:w-1/2 lg:mx-6">
              <img src={firstimg} alt=""/>
                
              
               
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
