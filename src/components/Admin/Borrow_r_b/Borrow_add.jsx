import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import './Borrow_r_b.css';

const Borrow_add = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);
    const [member_id, setMemberId] = useState(null);
    const [uid, setUID] = useState(null);

    async function handleCreate() {
        console.log(member_id)
        const response = await fetch(`http://127.0.0.1:8000/borrowing/create`, 
        {
            method: "POST",
		    headers: {
                "Content-Type": "application/json",
            },
		    body: JSON.stringify({
                "member_id": parseInt(member_id),
                "unique_id": parseInt(uid),
            })
        });
        if (response.status === 201) {
            setIsSubmitted(true);
        }
        else {
            let data = await response.json()
            alert(data.error)
        }
    };

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div className="holder">
                <Link to="../Borrow_r_b" style={{ marginLeft: "100px" }}>
                    <back-button className="fs-22 fw-4">&lt; ย้อนกลับ</back-button>
                </Link>

                <div className="text-blue fs-26 fw-5 center" style={{ marginTop: "60px", marginBottom: "20px" }}>
                    สร้างรายการการยืมหนังสือใหม่
                </div>

                <div class="create-box">
                    {/* รหัสสมาชิก */}
                    <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
                        <label style={{ marginRight: "14px" }}>รหัสสมาชิก:</label>
                        <input
                            onChange={(event) => setMemberId(event.target.value)}
                            type="text"
                            className="fs-20 fw-4"
                            placeholder="User ID"
                            style={{
                                padding: "5px 10px" /* Adjust padding as needed */,
                                border: "1px solid #ccc" /* Define border style */,
                                borderRadius: "4px" /* Add rounded corners */,
                            }}
                        />
                    </div>

                    {/* รหัสหนังสือ */}
                    <div style={{ marginLeft: "50px", marginBottom: "20px" }}>
                        <label style={{ marginRight: "12px" }}>รหัสหนังสือ:</label>
                        <input
                            onChange={(event) => setUID(event.target.value)}
                            type="text"
                            className="fs-20 fw-4"
                            placeholder="Book UID"
                            style={{
                                padding: "5px 10px" /* Adjust padding as needed */,
                                border: "1px solid #ccc" /* Define border style */,
                                borderRadius: "4px" /* Add rounded corners */,
                            }}
                        />
                    </div>

                    <div>
                        {isSubmitted ? (
                            <label style={{ marginLeft: "200px" }}>
                                สร้างรายการยืมเรียบร้อยแล้ว กดปุ่มเพื่อย้อนกลับ
                                <Link to="../Borrow_r_b">
                                    <label className="menu-button text-white fs-18 fw-5" style={{ marginLeft: "20px" }}>
                                        ย้อนกลับ
                                    </label>
                                </Link>
                            </label>
                        ) : timerRunning ? (
                            <label className="text-white fs-18 fw-5" style={{ marginLeft: "500px" }}>
                                กรุณารอสักครู่
                            </label>
                        ) : (
                            <label
                                className="menu-button text-white fs-18 fw-5"
                                style={{ marginLeft: "550px" }}
                                onClick={handleCreate}
                            >
                                สร้าง
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Borrow_add;