export class MusicGenre {
    constructor(identifier, name, image, playlist_id, category) {
        this.identifier = identifier;
        this.name = name;
        this.image = image;
        this.playlist_id = playlist_id;
        this.category = category;
    }
}

export const categories = {

    rock: {
        rock: {
            name: "Rock",
            img: require("assets/images/genres/rock.jpg"),
            id: "37i9dQZF1DWXRqgorJj26U"
        }
    },
    pop: {
        pop: {
            name: "Pop",
            img: require("assets/images/genres/pop.jpg"),
            id: "6mtYuOxzl58vSGnEDtZ9uB"
        }
    },
    jazz: {
        jazz: {
            name: "Jazz",
            img: require("assets/images/genres/jazz.jpg"),
            id: "37i9dQZF1DXbITWG1ZJKYt"
        }
    },
    country: {
        country: {
            name: "Country",
            img: require("assets/images/genres/country.jpg"),
            id: "1mJhSx6aYQmINsZ8dG4gzU"
        }
    }
}

// This class contains all the supported music genres
export class MusicGenres {
    constructor() {
        this.categories = categories
    }


    getGenreByIdentifier(identifier) {
        for (let category in this.categories)
            for (let genre in this.categories[category])
                if (genre === identifier) return {genre: this.categories[category][genre]};
        return null;
    }

    getGenresByCategory(category) {
        // for (let categoryName in this.categories)
        return this.categories[category];
    }
}