import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import * as queryString from "query-string";
import {AxiosError} from "axios";
import {Buffer} from "buffer/";

import {Redirect, withRouter} from "react-router-dom";
import {CouldNotGetToken} from "api/exceptions";


const SPOTIFY_BASE_URL = "https://accounts.spotify.com";


export const isLoggedIn = () => Cookies.get("accessToken") !== undefined && Cookies.get("refreshToken") !== undefined;

export const spotifyLogin = (scopes: string = "playlist-read-private") => {
    /* Redirect to the AUTH URL */
    const REQ_URL = process.env.REACT_APP_API_URL + "/api/login?" + queryString.stringify({scopes: scopes});
    axios.get(REQ_URL, {withCredentials: true})
        .then((r) => {
            window.location.replace(r.data);
        }).catch((reason: AxiosError) => {
            if (reason.response.status === 400) {
                throw Error(reason);
            }
        }
    );
}

export const assertSpotifyLogin = (redirect_url: string, scopes: string = "playlist-read-private") => {
    if (!isLoggedIn()) {
        window.localStorage.setItem("loginRedirectURL", redirect_url ?? "/play");
        spotifyLogin(scopes, redirect_url);
    }
}

export const refreshToken = () => {
    const REQ_URL = process.env.REACT_APP_API_URL + "/api/refresh_token?" + queryString.stringify({refresh_token: Cookies.get("refreshToken")});
    axios.get(REQ_URL).then(r => {
        Cookies.set("accessToken", r.data);
    }).catch((reason: AxiosError) => {
        let detail = reason.response.data.detail;
        if (detail === "Could not get a new token") throw new CouldNotGetToken(detail);
        throw Error(reason);
    });
}

const LoginCallback = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Get parameters from callback URL
    const CODE = params.get("code");
    const ERROR = params.get("error");
    const STATE = params.get("state");
    const COOKIE_STATE = Cookies.get("authState");

    if (ERROR) throw Error(ERROR);
    if (STATE !== COOKIE_STATE) throw Error("State doesn't match or is expired!");

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + (Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString("base64"))
    }

    const sendParams = new URLSearchParams();
    sendParams.append("grant_type", "authorization_code");
    sendParams.append("code", CODE);
    sendParams.append("redirect_uri", process.env.REACT_APP_SPOTIFY_REDIRECT_URI);

    // const ACCESS_TOKEN =
    axios.post(`${SPOTIFY_BASE_URL}/api/token`, sendParams, {headers: headers})
        .then(r => {
            let data = r.data;
            let expiresIn = data["expires_in"]
            Cookies.set("accessToken", data["access_token"], {expires: expiresIn, secure: true});
            Cookies.set("refreshToken", data["refresh_token"], {expires: expiresIn, secure: true});
        })
        .catch((reason => {
            throw Error(reason);
        }));

    let redirect_url_obj = new URL(window.localStorage.getItem("loginRedirectURL"));
    let redirect_url = redirect_url_obj.pathname + redirect_url_obj.search + redirect_url_obj.hash;
    return <Redirect to={redirect_url}/>
}

export default withRouter(LoginCallback);