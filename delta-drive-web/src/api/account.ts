import {AccountFormData} from "../types/Account";
import {AccountCredential} from "../types/Account";
import {postRequest} from "./utils";


export async function signUp(data: AccountFormData) {
    return postRequest(`http://localhost:5001/auth/sign-up`, JSON.stringify(data));
}

export async function signIn(data: AccountCredential) {
    return postRequest(`http://localhost:5001/auth/sign-in`, JSON.stringify(data));
}