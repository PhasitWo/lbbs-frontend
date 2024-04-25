import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { useNavigate } from 'react-router-dom';
import BookingNavbar from './BookingNavbar';
const URL = "http://127.0.0.1:8000/book/";


const BookDetails = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  

  useEffect(() => {
    setLoading(true);
    console.log("ID detail book:",id);
    async function getBookDetails(){
      try{
        const response = await fetch(URL+id);
        const data = await response.json();
        console.log("book detail data:",data);

        if(data){
          const {author,cover,detail,genre, title } = data;
          const newBook = {
            description: detail ? detail : "No description found",
            title: title,
            genre: genre ? genre : "No genre found",
            cover_img: cover ? cover : coverImg,
            author_name: author ? author : "No subject places found",
            
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if(loading) return <Loading />;

  return (
    <section className='book-details'>
      
      <BookingNavbar/>


      <div className='book-details-content grid'>

        <div className='book-details-img'> 
          <img src = {book?.cover_img} alt="Book Cover (Image Not Found)" // Informative alt text for accessibility
          onError={(event) => {
          event.target.src = coverImg; // Set fallback image on error
          }} />
        </div>

        <div className='book-details-info'>

          <div className='book-details-item title'>
            <span className='fw-6 fs-24'>{book?.title}</span>
          </div>
          <div className='book-details-item description'>
          <span className='fw-6'>Genre: </span>
            <span className='text-italic'>{book?.genre}</span>
          </div>
          <div className='book-details-item description'>
            <span className='fw-6'>Description: </span>
            <span>{book?.description}</span>
          </div>
          <div className='book-details-item'>
            <span className='fw-6'>Author: </span>
            <span className='text-italic'>{book?.author_name}</span>
          </div>
          
        </div>

      </div>

    </section>
  )
}

export default BookDetails