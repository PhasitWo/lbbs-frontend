import React from 'react'
import { Link } from 'react-router-dom';
import "./BookList.css";
import coverImg from "../../images/cover_not_found.jpg";

const Book = (book) => {
  return (
    <div className='book-item flex flex-column flex-sb'>
      <Link to = {`/book/${book.id}`} {...book}>
        <div className='book-item-img'>
          <img src = {book?.cover_img} alt="Book Cover (Image Not Found)" // Informative alt text for accessibility
          onError={(event) => {
          event.target.src = coverImg; // Set fallback image on error
          }} />
        </div>
        <div className='book-item-info text-center'>
          
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{book.title}</span>
          </div>
          
          <div className='book-item-info-item author fs-15'>
            <span className='text-capitalize fw-7'>Author: </span>
            <span>{book.author && book.author.join(", ")}</span>
          </div>

          
          {book?.available === true  && (
            <div className='book-item-info-item edition-count fs-15'>
            <span className='text-capitalize fw-7'>Available</span>
          </div>
          )}

          <div className='book-item-info-item publish-year fs-15'>
            <span className='text-capitalize fw-7'>Genre: </span>
            <span>{book.genre}</span>
          </div>


        </div>
      </Link>
      
    </div>
  )
}

export default Book