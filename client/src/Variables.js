export class MusicGenre {
    constructor(identifier, name, description, image, playlist_id) {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.image = image;
        this.playlist_id = playlist_id;
    }
}

// This class contains all the supported music genres
export class MusicGenres {
    constructor() {
        this.genres = [];

        // All genres
        this.genres.push(new MusicGenre(
            "all",
            "All Genres",
            "A mix of the most popular genres. This includes pop music, rock, rap...",
            require("assets/images/genres/rap-genre.jpg"),
            "1YGOdujXjPUSizscRxCBv0"
        ));

        // HipHop
        this.genres.push(new MusicGenre(
            "hiphop",
            "Hip Hop",
            "Hip hop also known as rap is a genre of popular music developed in the United States",
            require("assets/images/genres/rap-genre.jpg"),
            "5z0HyrtGeJAlxlsAa0REoP"));

        // Rock
        this.genres.push(new MusicGenre(
            "rock",
            "Rock",
            "Rock music is a broad genre that originated in the United States in the late 1940s and early 1950s",
            require("assets/images/genres/rock-genre.jpg"),
            "6TeyryiZ2UEf3CbLXyztFA"
        ));

        // Pop
        this.genres.push(new MusicGenre(
            "pop",
            "Pop Music",
            "Pop is a genre originated during the mid-1950s. It describes all music that is popular and includes many disparate styles.",
            require("assets/images/genres/pop-music-genre.jpg"),
            "6mtYuOxzl58vSGnEDtZ9uB`"));
    }

    getGenre(identifier) {
        for (let i = 0; i < this.genres.length; i++) {
            if (this.genres[i].identifier === identifier) {
                return this.genres[i];
            }
        }
        return null;
    }

    getGenres() {
        return this.genres;
    }
}