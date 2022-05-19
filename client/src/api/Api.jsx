import axios, {AxiosError} from 'axios';
import Cookies from 'js-cookie';
import * as MetadataFilter from 'metadata-filter';
import * as queryString from "query-string";
import {InvalidPlaylistId, TooManyRequests} from "api/exceptions";
import React from "react";

// TODO CREATE TRACK OBJECT
const filterSet = {
    track: [
        MetadataFilter.removeRemastered,
        MetadataFilter.fixTrackSuffix,
        MetadataFilter.removeLive,
        MetadataFilter.removeCleanExplicit,
        MetadataFilter.removeVersion,
        MetadataFilter.removeFeature,
        MetadataFilter.removeParody,
        MetadataFilter.removeZeroWidth
    ],
};

const metadataCustomFilter = MetadataFilter.createFilter(filterSet);


export const fetchModes = async () => {
    let data = null;
    await axios.get(process.env.REACT_APP_API_URL + "/api/get/modes")
        .then(r => {
            data = r.data;
        })
        .catch();
    return data;
}

export const fetchTracks = async (
    playlist_id: string,
    tracksNo: number = 10): Object => {
    let songs_ = []

    // Craft params
    let params = queryString.stringify({
        token: Cookies.get("accessToken"),
        playlist_id: playlist_id,
        amount: tracksNo
    })

    // Send POST req to server to get a new auth link
    await axios.get(process.env.REACT_APP_API_URL + `/api/get/songs?${params}`)
        .then(response => {
            // Handle success
            if (response.status === 200) {
                // Remove "remastered" and other useless string tags from the song's name
                response.data.forEach(song => {
                    song["title"] = metadataCustomFilter.filterField("track", song["title"]).replace(/ *\([^)]*\) */g, "");
                    songs_.push(song);
                });
            } else {
                throw Error("Error retrieving the songs: " + response.status);
            }
        })
        .catch((reason: AxiosError) => {
            let detail = reason.response.data.detail;
            if (detail === "Invalid playlist ID") throw new InvalidPlaylistId(detail);
            else if (detail === "Too many requests") throw new TooManyRequests(detail);
            throw Error(reason);
        });
    return songs_.length === 0 ? null : songs_;
}