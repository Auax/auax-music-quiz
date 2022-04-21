import axios from 'axios';
import * as MetadataFilter from 'metadata-filter';

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

const fetchTracks = async (
    searchTerm: string = "hiphop",
    tracksNo: number = 10,
    loadingErrors: number = 0): Object => {

    const handleError = loadingErrors < 3 ? () => fetchTracks(searchTerm, tracksNo, loadingErrors++) : null;
    let songs_ = []

    // Send POST req to server to get a new auth link
    await axios.get(process.env.REACT_APP_API_URL + `/api/get/${searchTerm}/${tracksNo}`)
        .then(response => {
            // Handle success
            if (response.status === 200) {
                // Remove "remastered" and other useless string tags from the song's name
                response.data.forEach(song => {
                    song["name"] = metadataCustomFilter.filterField("track", song["name"]);
                    songs_.push(song);
                });

            } else {
                console.error("Error retrieving the songs. Error code: " + response.status);
                handleError();
                return null;
            }
        })
        .catch(response => {
            // Handle error
            console.error(response);
            handleError();
            return null;
        });
    return songs_.length === 0 ? null : songs_;
}

export default fetchTracks;