import axios from "axios";

export const ADD = "ADD";
export const REMOVE_ONE = "REMOVE_ONE";
export const REMOVE_ALL = "REMOVE_ALL";
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const ADD_HALF = "ADD_HALF"

export const add = (product) => ({
  type: ADD,
  product: product,
});

export const addHalf = (product) => ({
  type: ADD_HALF,
  product: product
})

export const removeOne = (id) => ({
  type: REMOVE_ONE,
  productId: id,
});

export const removeAll = (id) => ({
  type: REMOVE_ALL,
  productId: id,
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: AUTH_SUCCESS,
  idToken: token,
  userId: userId,
});

export const authFail = (error) => ({
  type: AUTH_FAIL,
  error: error,
});

export const auth = (email, password, isSignedUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = "";
    if (!isSignedUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
    } else
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;

    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        window.location.href = "/";
      })
      .catch((err) => {
        dispatch(authFail(err));
      });

  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if(expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  };
};
