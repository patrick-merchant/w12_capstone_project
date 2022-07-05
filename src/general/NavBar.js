import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useModal from "../hooks/useModal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Modal from "react-modal";
import Avatar from "react-avatar";
import NavBarDropdown from "./NavBarDropdown"
import "../styles/Navbar.css"


const NavBar = ({ user, setUser, isLoggedIn, setIsLoggedIn, users, setUsers,  setSessionStart}) => {
    // const {isShowing, toggle} = useModal();
    //const {isSignUpShowing, hideSignUp} = useModal();

    const [isModalShowing, setIsModalShowing] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleClickSignIn = () => {
        console.log("sign in");
        setIsModalShowing(true);
        setIsLogin(true)
    }

    const toggle = () => {
        setIsLogin((prev) => {
            return (!prev)
        })
    }

    const closeModal = () => {
        setIsModalShowing(false);
    }

    const handleClickLogOut = () => {
      setIsLogin(false)
    }

    const handleSessionEnd = () => {
        setSessionStart(false)
        console.log('session end');
        fetch('http://localhost:8080/users/' + user.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
    }


    return (
        // <Router>
        <>
            <div id="navbar">
                <Link to="/" onClick={handleSessionEnd}>Home</Link>
                <NavBarDropdown user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleClickSignIn={handleClickSignIn} handleClickLogOut={handleClickLogOut}/>
            </div>

            <Modal isOpen={isModalShowing} onRequestClose={closeModal} ariaHideApp={false} data-backdrop="static" >
                {isLogin ?
                    <LoginForm toggle={toggle} user={user} setUser={setUser}
                        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
                        users={users} setUsers={setUsers} closeModal={closeModal} />
                    : <SignUpForm toggle={toggle} user={user} setUser={setUser}
                        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
                        users={users} setUsers={setUsers} closeModal={closeModal} />}
                <button onClick={closeModal}>X</button>

            </Modal>
            {/* <LogInModal isShowing={isShowing} toggle={toggle} /> */}
        {/* // </Router> */}
        </>
    )
}

export default NavBar;