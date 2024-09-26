import LocalStorage from "@/app/service/localStorageService.ts";
import { LS_KEY_USER, LS_KEY_USERS } from "@/app/const.ts";
import { UserType } from "@/app/service/httpService/types.ts";

const usersLocalStorage = new LocalStorage(LS_KEY_USERS);
const userLocalStorage = new LocalStorage(LS_KEY_USER);

export default class FakeBackendService {
  users: UserType[];

  constructor() {
    const users = usersLocalStorage.getItems();
    if (users.length) {
      this.users = users;
    } else {
      this.users = [
        {
          name: "admin",
          password: "123456",
          password_confirmation: "123456",
          phone: "123456",
          email: "admin@gmail.com"
        }
      ];
      usersLocalStorage.setItems(this.users);
    }
  }

  getUser() {
    return userLocalStorage.getItems();
  }

  removeUser() {
    userLocalStorage.removeItem();
  }

  async login(payload: UserType) {
    const { name, password, phone, email } = payload;
    const userData = this.users.find((user) => {
      return (
        ((user.name && name && user.name === name) ||
          (user.phone && phone && user.phone === phone) ||
          (user.email && email && user.email === email)) &&
        user.password === password
      );
    });
    if (userData) {
      const preparedData = {
        ...userData,
        token: "fake-token"
      };
      userLocalStorage.setItems(preparedData);
      return preparedData;
    } else {
      throw new Error("These credentials do not match our records.");
    }
  }

  register(payload: UserType) {
    const { email, name } = payload;

    const isUserExist = this.users.find((user) => {
      return user.email === email || user.name === name;
    });

    if (isUserExist) {
      throw new Error("This record is already exists!");
    } else {
      this.users.push(payload);
      usersLocalStorage.setItems(this.users);
      return "User created successfully!";
    }
  }
}
