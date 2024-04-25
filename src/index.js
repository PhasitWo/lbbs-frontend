import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./components/Profile/Profile";
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import BookingList from "./menus/BookingList/BookingList";
import BorrowList from "./menus/BorrowList/BorrowList";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout"
import { AppProvider } from "./context";
import ProtectedRoute from "./ProtectedRoute";
import Admin_main from "./components/Admin/Admin_main/Admin_main";
import Book_manage from "./components/Admin/Book_manage/Book_manage";
import Borrow_r_b from "./components/Admin/Borrow_r_b/Borrow_r_b";
import Borrow_add from "./components/Admin/Borrow_r_b/Borrow_add";
import Borrow_return from "./components/Admin/Borrow_return/Borrow_return";
import AddBookPage from "./components/Admin/CreatePg/AddPg"
import EditPg from "./components/Admin/Book_manage/EditPg/EditPg";
import EditBook from "./components/Admin/Book_manage/EditPg/Tablev.0Mana";
// permission_list={["member", "librarian"]}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute permission_list={["member", "librarian"]}>
                            <Home />
                        </ProtectedRoute>
                    }
                >
                    <Route path="" element={<BookList />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/profile/booking" element={<BookingList />} />{" "}
                    {/* Render Home as the header for BookingList */}
                    <Route path="/profile/borrowList" element={<BorrowList />} />
                    <Route path="about" element={<About />} />
                    <Route path="book" element={<BookList />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                </Route>
                <Route path="admin">
                    <Route
                        path=""
                        element={
                            <ProtectedRoute permission_list={["librarian"]}>
                                <Admin_main />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="Book_manage" element={<Book_manage />} />
                    <Route path="Book_manage/AddBookPage" element={<AddBookPage />} />
                    <Route path="Book_manage/EditPg" element={<EditPg />} />
                    <Route path="Book_manage/fidUnique/0" element={<EditBook />} />
                    <Route path="Borrow_r_b" element={<Borrow_r_b />} />
                    <Route path="Borrow_r_b/Borrow_add" element={<Borrow_add />} />
                    <Route path="Borrow_return" element={<Borrow_return />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    </AppProvider>
);
