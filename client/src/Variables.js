export class MusicGenre {
    constructor(identifier, name, image, playlist_id) {
        this.identifier = identifier;
        this.name = name;
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
            "Mix",
            require("assets/images/genres/mix.jpg"),
            "1YGOdujXjPUSizscRxCBv0"
        ));

        // HipHop
        this.genres.push(new MusicGenre(
            "hiphop",
            "Hip Hop",
            require("assets/images/genres/rap.jpg"),
            "5z0HyrtGeJAlxlsAa0REoP"
        ));

        // Rock
        this.genres.push(new MusicGenre(
            "rock",
            "Rock",
            require("assets/images/genres/rock.jpg"),
            "37i9dQZF1DWXRqgorJj26U"
        ));

        // Pop
        this.genres.push(new MusicGenre(
            "pop",
            "Pop",
            require("assets/images/genres/pop.jpg"),
            "6mtYuOxzl58vSGnEDtZ9uB"));

        // Jazz
        this.genres.push(new MusicGenre(
            "jazz",
            "Jazz",
            require("assets/images/genres/jazz.jpg"),
            "37i9dQZF1DXbITWG1ZJKYt"));
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