class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка')
    };

    setToken(token) {
        this._headers['authorization'] = `Bearer ${token}`;
    };

    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._handleResponse);
    };

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._handleResponse);
    };

    editUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                name: data.name
            })
        })
            .then(this._handleResponse);
    };

    addMovies(data) {
        return fetch(`${this._url}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailerLink: data.trailerLink,
                thumbnail: data.thumbnail,
                movieId: data.movieId,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
            .then(this._handleResponse);
    };


    deleteMovie(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._handleResponse);
    };


}

const Api = new Api({
    url: 'https://api.andreymazer.movies.nomoredomainsmonster.ru',
    headers: {
        authorization: '',
        "Content-Type": "application/json",
    },
})

export default Api;
