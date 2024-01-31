import React from 'react';
import { useCallback } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import api from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { register, authorize, checkToken } from '../../utils/Authorization';
import moviesApi from '../../utils/MoviesApi';
import { moviesApiArray } from '../../utils/MoviesApiArray';
import Preloader from '../Preloader/Preloader';


function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [message, setMessage] = React.useState(false);
  const [succesInfoToolTip, setSuccesInfoToolTip] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const cleanErrorMessage = useCallback(() => {
    setErrorMessage("");
  },
    [setErrorMessage],
  );

  
  React.useEffect(() => {
    cleanErrorMessage()
  }, [cleanErrorMessage, navigate]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), api.getMovies()])
        .then(([resUser, resMovie]) => {
          setCurrentUser(resUser);
          setSavedMovies(resMovie);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          api.setToken(token);
          setCurrentUser({ name: res.name, email: res.email, _id: res._id });
          setLoggedIn(true);
        })
        .catch((err) => console.log(err))
    }
  }, [navigate]);

  React.useEffect(() => {
    const filteredMovies = localStorage.getItem('filteredMovies');
    if (filteredMovies) {
      setFilteredMovies(JSON.parse(filteredMovies));
    } else {
      handleGetMovies();
    }
}, []);


  
  function handleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        setInfoTooltipOpen(true);
        if (res) {
          setMessage(true);
          setSuccesInfoToolTip('Вы успешно зарегестрировались!')
          handleLogin(email, password)
        }
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltipOpen(true);
        if (err === 409) {
          setErrorMessage('Пользователь с таким email уже существует.');
        }
        else {
          setErrorMessage('При регистрации пользователя произошла ошибка.');
        }
      });
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          api.setToken(res.token);
          setLoggedIn(true);
          setCurrentUser({ name: res.name, email: res.email });
          localStorage.setItem('loggedIn', true);
          navigate('/movies', { replace: true })
        }
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltipOpen(true);
        if (err === 401) {
          setErrorMessage('Вы ввели неправильный логин или пароль.');
        }
        if (err === 400) {
          setErrorMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        }
        else {
          setErrorMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        }
      });
  }

  function handleUpdateUser(data) {
    api.editUser(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        if (newUser) {
          setInfoTooltipOpen(true);
          setMessage(true);
          setSuccesInfoToolTip('Вы успешно обновили данные!')
        }
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltipOpen(true);
        if (err === 409) {
          setErrorMessage('Пользователь с таким email уже существует.');
        }
        else {
          setErrorMessage('При обновлении пользователя произошла ошибка.');
        }
      });
  }

  function handleGetMovies() {
    moviesApi.getMovies()
        .then((res) => {
            const resultMovies = moviesApiArray(res);
            localStorage.setItem('filteredMovies', JSON.stringify(resultMovies));
            setFilteredMovies(resultMovies);
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem('filteredMovies');
            setFilteredMovies([]);
        });
}

  function handleSaveMovie(data) {
    api.addMovies(data)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies])
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleDeleteMovie(movieId) {
    api.deleteMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== movieId))
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closePopups() {
    setMenuOpen(false);
    setInfoTooltipOpen(false);
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('filteredMovies')
    localStorage.removeItem('isActiveCheckBox');
    localStorage.removeItem('isSearchText');
    localStorage.removeItem('resultMovies');
    localStorage.removeItem('previousText');
    localStorage.removeItem('previousMovies');
    localStorage.removeItem('previousCheckbox');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          {!loggedIn ? (<Route path="/signup" element={<Register onRegister={handleRegister} errorMessage={errorMessage} />} />) : (<Route path="/signup" element={<Navigate to="/" />} />)}
          {!loggedIn ? (<Route path="/signin" element={<Login onLogin={handleLogin} errorMessage={errorMessage} />} />) : (<Route path="/signin" element={<Navigate to="/" />} />)}<Route path="/movies" element={<>
            <ProtectedRoute
              component={Header}
              loggedIn={loggedIn}
              openMenu={handleMenuClick}
              classNames={"header header_films"}
              classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-too"} />
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              filteredMovies={filteredMovies}
              onDeleteCard={handleDeleteMovie}
              onSaveCard={handleSaveMovie}
              savedMovies={savedMovies}
            />
            <ProtectedRoute
              component={Footer}
              loggedIn={loggedIn}
            />
          </>
          } />
          <Route path="/saved-movies" element={
            <>
              <ProtectedRoute
                component={Header}
                loggedIn={loggedIn}
                openMenu={handleMenuClick}
                classNames={"header header_films"}
                classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-too"} />
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                filteredMovies={savedMovies}
                onDeleteCard={handleDeleteMovie}
                onSaveCard={handleSaveMovie}
                savedMovies={savedMovies}
              />
              <ProtectedRoute
                component={Footer}
                loggedIn={loggedIn}
              />
            </>
          } />
          <Route path="/profile" element={
            <>
              <ProtectedRoute
                component={Header}
                loggedIn={loggedIn}
                openMenu={handleMenuClick}
                classNames={"header header_films"}
                classNameAccountLogo={"navigation__accountlogo navigation__accountlogo-too"} />
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                onSignOut={onSignOut}
                onProfile={handleUpdateUser}
                errorMessage={errorMessage}
              />
            </>
          } />
          <Route path="*" element={<Error />} />
        </Routes>
        <Menu isOpen={isMenuOpen} onClose={closePopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopups}
          status={message}
          succes={succesInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;