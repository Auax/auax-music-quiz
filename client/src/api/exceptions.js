export class AccessTokenExpired extends Error {
    constructor(message) {
        super(message);
        this.name = "AccessTokenExpired";
    }
}

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