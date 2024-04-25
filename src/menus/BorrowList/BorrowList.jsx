import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./BorrowList.css";
import { api_with_auth } from "../../api";

const BorrowList = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [borrowingList, setBorrowingList] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api_with_auth.get("/member-borrowing");
            setBorrowingList(response.data.borrowing_list);
            setSearchResults(response.data.borrowing_list);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = async (itemId) => {
        const response = await fetch(`http://127.0.0.1:8000/borrowing/set-status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                borrow_id: itemId,
                status: "cancel",
            }),
        });
        if (response.status === 200) {
            alert("ยกเลิกสำเร็จ");
            window.location.reload();
        } else {
            alert("errorrr")
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        const searchResultsElement = document.querySelector(".search-results");
        if (inputValue) {
            // Simulate API call (replace with your actual API call)
            const mockSearchResults = [
                { borrow_id: 1, user_id: 123, name: "John Doe", title: "The Lord of the Rings", status: "Reserve" },
                { borrow_id: 2, user_id: 456, name: "Jane Smith", title: "Pride and Prejudice", status: "Borrow" },
                { borrow_id: 3, user_id: 789, name: "Alice", title: "Alice in Wonderland", status: "Approved" },
            ];

            // Filter results based on status and matching ID
            const filteredResults = borrowingList.filter((result) => {
                const matchingId =
                    result.borrow_id === parseInt(inputValue) ||
                    result.book_title.toLowerCase().includes(inputValue.toLocaleLowerCase());
                return matchingId;
            });

            setSearchResults(filteredResults);

            if (searchResultsElement) {
                searchResultsElement.style.display = "block";
            }
        } else {
            // Clear search results and hide container
            setSearchResults(borrowingList);
            if (searchResultsElement) {
                searchResultsElement.style.display = "block";
            }
        }
    };

    return (
        <section className="Borrow-detail">
            <button type="button" className="flex flex-c back-btn" onClick={() => navigate("/profile")}>
                <IoIosArrowBack size={25} color="white" />
                <span className="fs-22 fw-6 text-white">Go Back</span>
            </button>
            <section className="section-title text-white ls-2 flex flex-c text-center">
                <h2>รายการยืม</h2>
            </section>
            <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
                <div className="text-blue fs-26 fw-5" style={{ marginTop: "50px", marginBottom: "20px" }}>
                    ค้นหารายการจองและยืมหนังสือที่มีอยู่
                </div>

                <div className="search-bar" style={{ display: "flex" }}>
                    <input
                        type="text"
                        className="search-bar fs-20 fw-4"
                        placeholder="หมายเลขายการยืม / ชื่อหนังสือ"
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                    <div
                        className="search-button text-white fs-20 fw-4"
                        style={{ display: "flex", alignItems: "center", marginLeft: "12px" }}
                        onClick={handleSearch}
                    >
                        ค้นหา
                    </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                    {searchResults.length > 0 ? (
                        <div className="search-results fs-20 fw-4">
                            {searchResults.map((result) => (
                                <div className="search-item" key={result.borrow_id}>
                                    <div style={{ marginTop: "20px" }}>หมายเลขรายการยืม: {result.borrow_id}</div>
                                    <div>สถานะ: {result.borrow_status}</div>
                                    <div>ชื่อหนังสือ: {result.book_title}</div>
                                    ________________________________________
                                    <div>วันที่ยืม: {result.borrow_date} </div>
                                    <div>วันที่ครบกำหนด: {result.due_date} </div>
                                    <div>วันที่คืน: {result.return_date} </div>
                                    ________________________________________
                                    <div>วันที่จอง: {result.reserve_date} </div>
                                    <div>วันที่คาดว่าจะได้ยืม: {result.expected_date} </div>
                                    <div>ค่าปรับ: {result.fine} </div>
                                    {result.borrow_status === "reserve" && (
                                    <div
                                        className="menu-button"
                                        style={{ position: "relative", left: "60%", marginRight: "100px" }}
                                        onClick={() => handleCancel(result.borrow_id)}
                                    >
                                        Cancel
                                    </div>)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="fs-20 fw-4" style={{ textAlign: "center" }}>
                            ไม่พบผลการค้นหา
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BorrowList;
