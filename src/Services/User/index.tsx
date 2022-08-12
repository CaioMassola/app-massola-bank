import axios, { AxiosResponseHeaders } from "axios";
import { Alert } from "react-native";
import { base_url } from "../../global/env";

const prefix = "user";

export type User = {
  username: string;
  email: string;
  cpf: string;
  smartphone: string;
  age: number;
  password: string;
};

class UserService {
  async create(data: User, location: string) {
    const headers: AxiosResponseHeaders = {};

    headers["location"] = `${location}`;

    try {
      const response = await axios.post(`${base_url}/${prefix}/create`, data, {
        headers,
      });
      return response;
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default UserService;
