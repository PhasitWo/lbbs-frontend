import React, { useState } from "react";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";
import { api_with_auth } from "../../api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { userId, username } = useGlobalContext();
    const [borrowCount, setBorrowCount] = useState(null);
    const [fine, setFine] = useState(null);
    const [reserveCount, setReserveCount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        const res = await api_with_auth("/member-data");
        setBorrowCount(res.data.borrow_count);
        setFine(parseFloat(res.data.fine));
        setReserveCount(res.data.reserve_count);
    };

    return (
        <section className="profile">
            <div className="container">
                <div className="profile-pic text-center">
                    <CgProfile size={220} color="white" />
                </div>
                <div className="profile-title text-center ">
                    <div className="fs-24 text-white">ID : {userId}</div>
                    <div className="fs-24 text-white">{username}</div>
                    <div className="fs-20 text-red">ค่าปรับหนังสือ {fine}</div>
                </div>

                <div className="menu-info fs-22 text-center">
                    <div className="menu-info-item">รายการยืม {borrowCount}/10</div>

                    <div className="menu-info-item">รายการจอง {reserveCount}/6</div>

                    <Link to="borrowList">
                        <div className="menu-info-item">สถานะยืม-คืน</div>
                    </Link>
                </div>
                <div className="button-container">
                    <button
                        type="submit"
                        className="log-out flex flex-c"
                        onClick={() => {
                            navigate("/logout");
                        }}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
