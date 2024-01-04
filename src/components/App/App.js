import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import Menu from '../Menu/Menu';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);


  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }


  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              loggedIn={loggedIn}
              openMenu={handleMenuClick}
              classNames={"header header_main"}
              classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-main"}
            />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        <Route path="/movies" element={
          <>
            <Header
              loggedIn={true}
              openMenu={handleMenuClick}
              classNames={"header header_films"}
              classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-too"}
            />
            <Movies />
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header
              loggedIn={true}
              openMenu={handleMenuClick}
              classNames={"header header_films"}
              classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-too"}
            />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header
              loggedIn={true}
              openMenu={handleMenuClick}
              classNames={"header header_films"}
              classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-too"}
            />
            <Profile />
          </>
        } />

        <Route path="*" element={<Error />} />

      </Routes>

      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

export default App;
