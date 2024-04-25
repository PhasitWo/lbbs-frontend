import React from 'react'
import { useGlobalContext } from '../../context';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg"
import "./BookList.css";
import Header from '../Header/Header';

import Book from "../BookList/Book"

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id),
      cover_img: singleBook.cover_id ? (singleBook.cover_id) : coverImg
      
      // id: (singleBook.id).replace("/works/", ""),
      // cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });


  if(loading) return <Loading/>

  return (
    <div>
      <Header/>
      <section className='booklist'>
        <div className='container'>
          <div className='section-title'>
            <h2 className='text-white'>{resultTitle}</h2>
          </div>
          <div className='booklist-content grid'>
            {
              booksWithCovers.slice(0, 30).map((item, index) => {
                return (
                  <Book key = {index} {...item} />
                )
              })
            }
          </div>
        </div>
      </section>
    </div>
    
  )
}

export default BookList