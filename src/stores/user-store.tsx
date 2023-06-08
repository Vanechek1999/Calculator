import { action, makeAutoObservable, observable } from 'mobx'

class UserStore {
  storeUser = {
    login: '',
  };

  constructor() {
    makeAutoObservable(this)
  }

  getStoreUser = (userLogin: string) => {
    this.storeUser.login = userLogin;
  }
}

export default new UserStore()