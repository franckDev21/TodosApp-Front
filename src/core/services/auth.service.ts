import { User } from "../model/user.model";
import store from "../store/redux";

class AuthSevice {
  
  static login(){

  }

  isLogin(): boolean{
    
    const token: string = store.getState().token;
    const user: User = store.getState().user;
    if((user && user.email) && token !== '') return true;
    return false;
  }

}

export default new AuthSevice()