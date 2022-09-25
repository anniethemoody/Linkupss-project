import { getCurrentUser } from "./authService";
import httpService from "./httpService";

export function register(user){
    return httpService.post('http://api.linkupss.com/adminRegister',{

    });

}
export function getAdmins(user){
    return httpService.get('http://api.linkupss.com/adminRegister',{

    })
}