import { Packages } from "./packages.model";
import { UserExperience } from "./userexperience.model";

export interface User {
    _id?:string,
    email: string,
    password:string,
    userType: string,
    dateCreated: string,
    firstName: string,
    lastName: string,
    profession: string,
    companyName: string,
    industry: string,
    imagePath: string,
    country: string,
    summary: string,
    skills: string[],
    experience: UserExperience[],
    packages: Packages[],
    billingAddress: string,
    rating: string[],
    emailConfirmation: string,
    logIns:string[],
}
