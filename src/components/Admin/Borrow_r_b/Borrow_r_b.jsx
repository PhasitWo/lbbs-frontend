import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Borrow_r_b.css";

const Borrow_r_b = () => {
    {
        /* ส่วนของการโชว์ Borrow List */
    }
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]); // Added state for search results
    const handleSearch = async () => {
        const searchResultsElement = document.querySelector(".search-results");
        const response = await fetch(`http://127.0.0.1:8000/borrowing?id=${inputValue}`);
        const data = await response.json();
        const searchResults = data.borrowing_list;

        console.log(searchResults);
        if (searchResults) {
            const filteredResults = searchResults.filter((result) => {
                const validStatus = result.borrow_status === "borrow" || result.borrow_status === "reserve";

                return validStatus;
            });

            console.log("Filtered results:", filteredResults);

            setSearchResults(filteredResults);

            if (searchResultsElement) {
                searchResultsElement.style.display = "block";
            }
        } else {
            if (searchResultsElement) {
                searchResultsElement.style.display = "none";
            }
        }
    };

    async function handleBorrow(itemId) {
        const response = await fetch(`http://127.0.0.1:8000/borrowing/set-status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                borrow_id: itemId,
                status: "borrow",
            }),
        });
        if (response.status === 200) {
            alert("ยืมสำเร็จ");
            window.location.reload();
        } else {
            let data = await response.json();
            alert(data.error);
        }
    }

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div className="holder">
                <Link to="../" style={{ marginLeft: "100px" }}>
                    <back-button className="fs-22 fw-4">&lt; ย้อนกลับ</back-button>
                </Link>

                <div className="text-blue fs-26 fw-5 center" style={{ marginTop: "60px", marginBottom: "20px" }}>
                    การยืมหนังสือ
                </div>

                <div className="center">
                    <Link to="Borrow_add">
                        <div className="menu-button text-white fs-22 fw-4">
                            <div>สร้างรายการการยืมหนังสือใหม่</div>
                            <div>(Add New Borrowing)</div>
                        </div>
                    </Link>
                </div>

                <div className="text-blue fs-26 fw-5 center" style={{ marginTop: "50px", marginBottom: "20px" }}>
                    ค้นหารายการจองและยืมหนังสือที่มีอยู่
                </div>

                <div className="search-bar input center" style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        className="search-bar fs-20 fw-4"
                        placeholder="รหัสผู้ยืม หรือ รหัสการจอง"
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
                        <div>
                            {searchResults.map((result) => (
                                <div
                                    className="search-item"
                                    key={result.borrow_id}
                                    style={{ marginLeft: "50px", marginBottom: "40px" }}
                                >
                                    <div style={{ marginTop: "20px" }}>หมายเลขรายการยืม: {result.borrow_id}</div>
                                    <div>รหัสผู้ยืม: {result.member_id}</div>
                                    <div>ชื่อผู้ยืม: {result.member_name}</div>
                                    <div>UID หนังสือ: {result.unique_id}</div>
                                    <div>ชื่อหนังสือ: {result.book_title}</div>
                                    <div>วันที่ยืม: {result.borrow_date} </div>
                                    <div>วันที่กำหนดคืน: {result.due_date} </div>
                                    <div>วันที่จอง: {result.reserve_date} </div>
                                    <div>วันที่คาดว่าจะได้ยืม: {result.expected_date} </div>
                                    <div>
                                        สถานะ: {result.borrow_status}
                                        {result.borrow_status === "reserve" && (
                                            <div
                                                className="menu-button text-white fs-20 fw-4"
                                                style={{position: 'relative', left: '60%' ,marginRight: "100px" }}
                                                onClick={() => handleBorrow(result.borrow_id)}
                                            >
                                                เริ่มยืม
                                            </div>
                                        )}
                                    </div>
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
        </div>
    );
};

export default Borrow_r_b;
