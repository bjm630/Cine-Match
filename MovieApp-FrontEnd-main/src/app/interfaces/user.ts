import { UserInterface } from "./user-interface"; 
export class User implements UserInterface{
    id: number = 0;
    username: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";

    constructor(
        id?: number, 
        username?: string, 
        password?: string, 
        firstName?: string, 
        lastName?: string
    ) {
        if(id)
            this.id=id; 
        if(username)
            this.username = username; 
        if(password)
            this.password = password; 
        if(firstName)
            this.firstName = firstName; 
        if(lastName)
            this.lastName = lastName; 
    }




}
