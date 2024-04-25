import React from "react";
import { Link } from "react-router-dom";
import "./Book_manage.css";

const Book_manage = () => {
    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div className="holder">
                <Link to="../" style={{ marginLeft: "100px" }}>
                    <back-button classname="fs-22 fw-4">&lt; ย้อนกลับ</back-button>
                </Link>

                <div className="text-blue fs-26 fw-5 center" style={{ marginTop: "60px", marginBottom: "20px" }}>
                    จัดการหนังสือ
                </div>

                <div className="center">
                    <Link to="AddBookPage">
                        <div className="menu-button text-white fs-22 fw-4">
                            <div>เพิ่มหนังสือเล่มใหม่</div>
                            <div>(Add New Book)</div>
                        </div>
                    </Link>
                </div>

                <div className="center">
                    <Link to="EditPg">
                        <div className="menu-button text-white fs-22 fw-4">
                            <div>แก้ไขหนังสือที่มีอยู่</div>
                            <div>(Edit Books)</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Book_manage;
