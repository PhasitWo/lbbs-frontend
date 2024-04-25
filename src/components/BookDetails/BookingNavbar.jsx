import Loader from "../Loader/Loader";
import React, { useState, useEffect } from "react";
import "./BookingNavbar.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";
import { api_with_auth } from "../../api";
const URL = "http://127.0.0.1:8000/book/";

const BookingNavbar = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function getBookDetails() {
            try {
                const response = await fetch(URL + id);
                const data = await response.json();

                if (data) {
                    const { available, expected_date, unique_id } = data;
                    const newBook = {
                        expected_date: expected_date,
                        available: available,
                        unique_id: unique_id,
                    };
                    setBook(newBook);
                } else {
                    setBook(null);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getBookDetails();
    }, [id]);

    const handleReserve = async () => {
        try {
            const response = await api_with_auth.post("/member-borrowing/create", { unique_id: book.unique_id });
            console.log(response.status)
            if (response.status === 201) alert("จองสำเร็จ!!!");
            else if (response.status === 400) alert(response.data.error);
        } catch (err) {
            alert(err.response.data.error);
        }
    };

    // สามารถไปยืมที่ห้องสมุดได้เลย
    if (loading) return <Loader />;

    return (
        <section className="booking-navbar">
            <button type="button" className="flex flex-c back-btn" onClick={() => navigate("/book")}>
                <IoIosArrowBack size={25} color="white" />
                <span className="fs-22 fw-6 text-white">Go Back</span>
            </button>

            {/* Button for Full-Screen Webpage */}
            <div class="flex booking-content">
                <span class="fs-22 fw-5 ls-1 text-white">วันที่คาดว่าจะได้ยืม :</span>
                <span class="borrow-date fs-22 fw-8 ls-1 text-italic">
                    {book.available ? "สามารถไปยืมที่ห้องสมุดได้เลย" : book.expected_date}
                </span>
                {!book.available && book.expected_date ? ( // Check for `available` being false
                    <button type="button" className="borrow-button flex flex-c back-btn" onClick={handleReserve}>
                        RESERVED
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
};

export default BookingNavbar;
