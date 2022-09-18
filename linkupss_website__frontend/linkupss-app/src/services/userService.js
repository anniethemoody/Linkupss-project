import httpService from "../httpService";

export function register(user){
    return httpService.post('http://api.linkupss.com/adminRegister',{
        
    });

}