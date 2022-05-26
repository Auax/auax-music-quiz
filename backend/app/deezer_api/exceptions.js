export class InvalidPlaylistId extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidPlaylistId";
    }
}