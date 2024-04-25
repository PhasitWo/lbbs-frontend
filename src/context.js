import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
/*const URL = "https://openlibrary.org/search.json?title=";*/
const URL = "http://127.0.0.1:8000/";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("The");
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null)

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(`${URL}book?title=${searchTerm}`);
            const data = await response.json();
            const {docs} = data;
            if(docs){
                const newBooks = docs.slice(0, 20).map((bookSingle) => {
                    /*const {key, author_name, cover_i, edition_count, first_publish_year, title} = bookSingle;*/
                    const {book_id, author, cover, genre,title} = bookSingle;

                    return {
                        id:book_id,
                        title:title,
                        genre:genre,
                        author:author,
                        cover_id:cover
                        /*
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title
                        */
                        
                    }
                });
                setBooks(newBooks);
                if(newBooks.length >= 1){
                    setResultTitle("Your Search Result");
                } else{
                    setResultTitle("Not Found");
                }
            }else{
                setBooks([]);
                setResultTitle("Not Found!");
            }
            setLoading(false);
        }catch(error){
            console.log(error);

            setLoading(false);

        }
    }, [searchTerm]);
    //console.log("result title",resultTitle);

    const fetchUser = useCallback(async () => {
        // Assuming user data endpoint is at URL + "/member-data"
        setLoading(true);
        try {
          //const response = await fetch(`${URL}member-data`);
          //const data = await response.json();
          // Update user data based on the response structure
          const data ={
            borrow_count: 0,
            reserve_count: 0,
            fine: 0.00
            }
          // You might need to handle different response formats based on your API
          
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }, [userId]);

    useEffect(() => {
        fetchBooks();
        fetchUser();
    },[searchTerm,fetchUser, fetchBooks]);
    return (
        <AppContext.Provider
            value={{
                loading,
                books,
                setSearchTerm,
                resultTitle,
                setResultTitle,
                userId,
                setUserId,
                username,
                setUsername,
                isAdmin,
                setIsAdmin
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};