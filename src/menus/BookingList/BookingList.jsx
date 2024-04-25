import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import "./BookingList.css"
const BookingList = () => {

  const navigate = useNavigate();
  
  return (
    <section className='Booking-detail'>
      <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/profile")}>
        <IoIosArrowBack size = {25} color = 'white'/>
        <span className='fs-22 fw-6 text-white'>Go Back</span>
      </button>
      <section className='section-title text-white ls-2 flex flex-c text-center'>
        <h2>รายการจอง</h2>

      </section>
      
    </section>
  )
}

export default BookingList