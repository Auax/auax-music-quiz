export class CouldNotGetToken extends Error {
    constructor(message) {
        super(message);
        this.name = "CouldNotGetToken";
    }
}

export class InvalidPlaylistId extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidPlaylistId";
    }
}

export class TooManyRequests extends Error {
    constructor(message) {
        super(message);
        this.name = "TooManyRequests";
    }
}