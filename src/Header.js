import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch, FaBookmark } from 'react-icons/fa'
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai'
import { MdOutlineMic, MdOutlineMicOff } from 'react-icons/md'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useStateValue } from './StateProvider';
import { firebaseApp, auth } from './firebase';
import Dropdown from './Dropdown'
import Login from './Login'
import "./Header.css"

function Header({ searchValue, setSearchValue }) {

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };


  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    // lang: 'en-IN',
  });

  const handleVoiceSearch = () => {
    const cleanedTranscript = transcript.replace(/\./g, '');
    setSearchValue(cleanedTranscript);
    resetTranscript();
  };

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      handleVoiceSearch();
    } else {
      SpeechRecognition.startListening();
    }
  };


  const [dropdown, setDropdown, bookFound] = useState(false);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 0) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  const [{ basket, user }] = useStateValue();

  const login = () => {
    if (user) {
      auth.signOut();
    }
  }


  return (
    <nav className="header">
      {/*logo on the left -> img */}
      <Link to="/">
        {/* <img className='header__logo' src="https://www.concreteisbetter.com/wp-content/uploads/2019/10/elibrary2.png" */}
        <img className='header__logo' src="/images/EduZone Logo.png"
          alt=''
        />
      </Link>

      {/* Search box*/}
      <div id="header__search">

        <input id='searchBar' type='text' value={searchValue} onChange={handleSearchChange} placeholder={"Search by book name..."} required />
        {/* <span>Search</span> */}

        <button className='audioIcon' onClick={handleToggleListening}>
          {listening ? <MdOutlineMic size={20} /> : <MdOutlineMicOff size={20} />}
        </button>

        {/* <p className='Voicebtn'>Listening: {listening ? 'on' : 'off'}</p> */}
      </div>


      {/* 3 links */}

      <div className='header__nav'>
        {/* <span className='menu'>MENU</span> */}

        {currentUser && <>
          <div id='imgDiv'>
            <img id='userImg' src={currentUser.photoURL} />
            <p id='greetImg'>Hi!</p>
          </div>

          <p id='userName'>{currentUser.displayName}</p>

        </>}

        <Link to={!user && "/login"} className="header__link">
          <div onClick={login} className="header__option">
            <span className='hdrbtn'>{user ? 'Logout' : 'Login'}</span>
          </div>
        </Link>

        <Link to="/" className='header__link'>
          <div className='header__option'>
            <span className='hdrbtn'>Home</span>
          </div>
        </Link>

        <li
          className='nav-item'
          // onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link
            to='/'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            <b
              className='hdrbtn'
              onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            >Genres</b>
          </Link>
          {dropdown && <Dropdown />}
        </li>

        <Link to="/about" className='header__link'>
          <div className='header__option'>
            <span className='hdrbtn'>About</span>
          </div>
        </Link>

        <Link to="/mybooks" className='header__link'>
          <div className='header__option'>
            <span className='hdrbtn'>MyBooks</span>
          </div>
        </Link>

        <Link to="/mybooks" className='header__link'>
          <span className='header__Bookcount'>{basket?.length}</span>
        </Link>

        {/* <Link to= {!user && "/login"} className="header__link">
              <div onClick={login} className="header__option">
                <span className=''>{user ? <img className="userimg" src='images/UserIcon.png'></img> : <img className="userimg" src='images/UserIcon2.png'></img> }</span>
              </div>
            </Link> */}

        {/* <Link to= {!user && "/login"} className="header__link">
              <div onClick={login} className="header__option">
                <span className='hdrbtn'>{user ? 'Logout' : 'Login'}</span>
              </div>
            </Link> */}


        {/* <Link to="/mybooks" className='header__link'>
            <div className='header__optionBookmark'>
                {/* <FaBookmark/>
                <span className='header__Bookcount'>{basket?.length}</span> 


            </div>
           </Link> */}

      </div>

    </nav>
  )
}

export default Header