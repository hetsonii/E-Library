import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

// Import Icons
import { BsInfoSquare } from 'react-icons/bs'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line, RiLoginCircleLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart, FiSearch } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";

import { useStateValue } from './StateProvider';
import { firebaseApp, auth } from './firebase';

function Sidebar({ setResultWords, setSearchValue, genre, setGenre, searchBarVisibility, handleSearchBarVisibility }) {


  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
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

  const handleGenreClick = (clickedGenre) => {
    setDrop(true);
    setGenre(clickedGenre);
  }

  const menus = [
    { name: "Search", link: "#", icon: <FiSearch size={20} /> },
    { name: "Home", link: "/", icon: <MdOutlineDashboard size={20} />, margin: true },
    {
      name: currentUser && currentUser.providerData.some(provider => provider.providerId === 'google.com') ?
        currentUser.displayName.split(' ').splice(0, 2).join(' ').toString() :
        "User",
      link: user ? "/user" : "/login",
      icon: currentUser && currentUser.providerData.some(provider => provider.providerId === 'google.com') ? (
        <>
          <div className="relative w-9 h-9">
            <img className='rounded-full -ml-2 h-9 w-9 absolute' src={currentUser.photoURL} alt="usr-img" />
          </div>
        </>
      ) : (
        <AiOutlineUser size={20} />
      )
    },
    {
      name: user ? "Logout" : "Login",
      link: user ? "/" : "/login",
      icon:
        <RiLoginCircleLine
          size={20}
          style={{
            transform: user ? "rotate(180deg)" : "",
            transition: 'transform 500ms ease-in-out',
          }}
        />
    },
    {name: "Admin", link: "/admin", icon: <RiAdminLine size={20}/>, margin: true},
    // { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Cart", link: "/mybooks", icon: <FiShoppingCart size={20} />, margin: true },
    { name: "About", link: "/about", icon: <BsInfoSquare size={20} /> },
    { name: "Genre", link: "/", icon: <AiOutlineHeart size={20} /> },
    // { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];

  const genrelist = [
    { name: "Thriller", icon: <img className="h-7 w-7" src="images/ThrillerIcon.png" alt="" /> },
    { name: "Self-help", icon: <img className="h-7 w-7" src="images/SelfhelpIcon.png" alt="" /> },
    { name: "Fiction", icon: <img className="h-7 w-7" src="images/FictionIcon.png" alt="" /> },
    { name: "Novel", icon: <img className="h-7 w-7" src="images/NovelIcon.png" alt="" /> },
  ]

  return (
    <section className="gap-6 flex fixed top-0 bottom-0 w-200 z-50 left-0">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <AnimatePresence>

            {open &&
              <Link to="/">
                <motion.img
                  transition={{ delay: 0.2 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 10 }}
                  exit={{ opacity: 0, x: -50 }}
                  className={`h-20 absolute left-6 -mt-6 ${!open && "duration-500 -translate-x-5"}`}
                  src="/images/EduZone favicon.png" alt="logo"
                />
              </Link>
            }
          </AnimatePresence>

          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => {
              setOpen(!open)
            }}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              onClick={() => {

                if (menu.name === "Logout") {
                  login();
                }

                if (menu.name === "Genre") {
                  { (drop && !open) ? <></> : setDrop(!drop) }
                  { !open && setOpen(!open) }
                }

                if (menu.name === "Home") {
                  setGenre("");
                  setDrop(false);
                  setSearchValue("");
                  setResultWords([""]);
                }

                if (menu.name === "Search") {

                  if (!searchBarVisibility) {
                    setSearchValue("");
                    setResultWords([""]);
                  }

                  handleSearchBarVisibility();
                }

                
              }
              }
              to={menu?.link}
              key={i}
              className={` ${menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-s-md `}
            >

              <div>
                {menu?.icon}
              </div>

              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <AnimatePresence>

                {menu.name === "Genre" && drop && open &&
                  <div className="container">
                    <div className="dropdown inline-block relative">

                      {(menu.name === "Genre" && genre === "") ? <></> :
                        <>
                          <motion.h2
                            transition={{ delay: 0.3 }}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 10 }}
                            exit={{ opacity: 0, x: 50 }}
                          >
                            <motion.span
                              style={{ fontWeight: 'bold' }}
                            >
                              {genre.toString().charAt(0).toUpperCase() + genre.toString().slice(1).toLowerCase()}
                            </motion.span>
                          </motion.h2>
                        </>
                      }

                      <ul className="dropdown-menu pt-3 whitespace-pre duration-500 absolute left-0 mt-1" >

                        {genrelist?.map((genreItem, genreIndex) =>
                        (
                          <>

                            <motion.li
                              transition={{ delay: 0.1 * genreIndex }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className="group flex items-center text-sm duration-500  gap-3.5 font-medium p-2 pr-10 hover:bg-gray-800 rounded-s-md"
                              onClick={() => handleGenreClick(genreItem?.name.toString().toLowerCase())}
                              key={genreIndex}
                            >
                              {genreItem.icon}
                              {genreItem?.name}
                            </motion.li>

                          </>
                        )
                        )}

                      </ul>
                    </div>
                  </div>
                }

              </AnimatePresence>



              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
