import React from 'react';
import { Link } from 'react-router-dom';
import portrait from '../../../images/portrait.png';
import './Admin_main.css';

const Admin_main = () => {
return (
    <div className="container">
        <div className="holder">
            <div className="center">
                <img className="avatar center" src={portrait} style={{ marginBottom: "20px" }} />
            </div>

            <div className="fs-20 fw-4 center">ยินดีต้อนรับ,</div>

            <div className="fs-20 fw-4 center" style={{ marginBottom: "20px" }}>
                คุณครู เจนนิเฟอร์ เมอร์ฟี่
            </div>

            {/* All button link to other pages */}

            {/* อันนี้ให้ลิ้งค์ไปหน้าค้นหาหนังสือของ Borrower */}
            <div>
                <Link to="/" className="center">
                    <div className="menu-button text-white fs-22 fw-4">
                        <div>ค้นหาหนังสือ</div>
                        <div>(Search for Book)</div>
                    </div>
                </Link>
            </div>

            <div>
                <Link to="Book_manage" className="center">
                    <div className="menu-button text-white fs-22 fw-4">
                        <div>จัดการหนังสือ</div>
                        <div>(Book Management)</div>
                    </div>
                </Link>
            </div>

            <div>
                <Link to="Borrow_r_b" className="center">
                    <div className="menu-button text-white fs-22 fw-4">
                        <div>การยืมหนังสือ</div>
                        <div>(Reserve & Borrow)</div>
                    </div>
                </Link>
            </div>

            <div>
                <Link to="Borrow_return" className="center">
                    <div className="menu-button text-white fs-22 fw-4" style={{ marginBottom: "20px" }}>
                        <div>การคืนหนังสือ</div>
                        <div>(Return)</div>
                    </div>
                </Link>
            </div>

            <div>
                <Link to="/logout" className="center">
                    <div className="logout-button text-white fs-18 fw-3">
                        <div>ออกจากระบบ</div>
                        <div>(Log out)</div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
);
};

export default Admin_main;