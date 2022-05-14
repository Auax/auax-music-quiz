import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import * as queryString from "query-string";
import {AxiosError} from "axios";
import {Buffer} from "buffer/";

import {Redirect, withRouter} from "react-router-dom";
import {CouldNotGetToken} from "api/exceptions";

export const isLoggedIn = () => Cookies.get("accessToken") !== undefined && Cookies.get("refreshToken") !== undefined;

export const spotifyLogin = (scopes: string = "playlist-read-private") => {
    /* Redirect to the AUTH URL */
    const REQ_URL = process.env.REACT_APP_API_URL + "/api/login?" + queryString.stringify({scopes: scopes});
    axios.get(REQ_URL)
        .then((r) => {
            Cookies.set("authState", r.data["auth_state"], {secure: true, sameSite: "none"});
            window.location.replace(r.data["url"]);
        }).catch((reason: AxiosError) => {
            if (reason.response.status === 400) {
                throw Error(reason);
            }
        }
    );
}
export const assertSpotifyLogin = (redirect_url: string, scopes: string = "user-top-read playlist-read-collaborative playlist-read-private user-read-private user-read-email") => {
    if (!isLoggedIn()) {
        window.localStorage.setItem("loginRedirectURL", redirect_url ?? "/play");
        spotifyLogin(scopes, redirect_url);
    }
}

export const refreshToken = async () => {
    const REQ_URL = process.env.REACT_APP_API_URL + "/api/refresh_token?" + queryString.stringify({refresh_token: Cookies.get("refreshToken")});
    await axios.get(REQ_URL).then(r => {
        Cookies.set("accessToken", r.data, {secure: true, sameSite: "none"});
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

    const sendParams = new URLSearchParams();
    sendParams.append("code", CODE);

    axios.post(`${process.env.REACT_APP_API_URL}/api/login/callback`, null, {
        params: {code: CODE}
    })
        .then((r) => {
            // Set cookies
            let data = r.data;
            let expiresIn = data["expires_in"];
            Cookies.set("accessToken", data["access_token"], {secure: true, sameSite: "none", expires: expiresIn});
            Cookies.set("refreshToken", data["refresh_token"], {secure: true, sameSite: "none", expires: expiresIn});
            Cookies.set("tokenScope", data["token_scope"], {secure: true, sameSite: "none", expires: expiresIn});
        })
        .catch((reason => {
            throw Error(reason);
        }));

    let redirect_url_obj = new URL(window.localStorage.getItem("loginRedirectURL"));
    let redirect_url = redirect_url_obj.pathname + redirect_url_obj.search + redirect_url_obj.hash;
    return <Redirect to={redirect_url}/>
}

export default withRouter(LoginCallback);