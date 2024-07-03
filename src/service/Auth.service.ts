import AppError from "../config/AppError";
import { env } from "../config/validate";
import { wrongCredentials } from "../controller/globalError";
import User from "../model/user.model";
import { ILogin, IUser } from "../model/user.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  login = async (data: ILogin) => {
    const user = await this.checkUser(data.email);
    if (!user) return wrongCredentials();

    const verifyPassword = await this.comparePassword(
      data.password,
      user.password
    );
    if (!verifyPassword) return wrongCredentials();

    const payload = { user: user.id };
    const token = await this.genToken(payload);
    return token;
  };

  register = async (user: IUser) => {
    const existingUSer = await this.checkUser(user.email);
    if (existingUSer) return new AppError("Account exist", 409);

    const hash = await this.encryptPassword(user.password);

    const newUser = new User({ ...user, password: hash });
    const payload = { user: newUser.id };

    const data = await Promise.all([newUser.save(), this.genToken(payload)]);
    return {
      user: { name: newUser.name, email: newUser.email },
      token: data[1],
    };
  };

  private checkUser = async (email: string) => {
    return User.findOne({ email }, "-name");
  };

  private encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  private genToken = async (payload: object, time: string = "10d") => {
    return await jwt.sign(payload, env.JWT_SECRET, { expiresIn: time });
  };

  private comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  };
}

export default new AuthService();
