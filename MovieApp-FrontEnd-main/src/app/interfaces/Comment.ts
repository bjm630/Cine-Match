import { User } from "./user";

export interface Comment {
    id: number,
    comment: string,
    movieID: number,
    user: User
}