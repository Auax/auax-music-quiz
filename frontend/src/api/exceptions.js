export class InvalidPlaylistId extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidPlaylistId";
    }
}

export class IdDoesNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = "IdDoesNotExist";
    }
}

export class TooManyRequests extends Error {
    constructor(message) {
        super(message);
        this.name = "TooManyRequests";
    }
}