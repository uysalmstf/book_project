import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { User } from "../schemas/user.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dtos/loginUser.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { username, password } = loginUserDto;

      const user = await this.userRepository.findOne({ where: { username: username, deletedAt: null } });
      if (!user) {
        throw new HttpException("User Not Found", 400);
      }

      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        throw new HttpException("User Pass Does not match", 400);
      }

      return {
        statusCode: HttpStatus.OK,
        user: this.generateUserToken(user)
      };

    } catch (error) {
      console.log(error);
      throw new HttpException("Hata", 500);
    }
  }

  async generateUserToken(user: User) {
    const accessToken = this.jwtService.sign({ id: user._id, username: user.username }, { expiresIn: '1h' });

    return accessToken;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;
      const usernameInUse = await this.userRepository.findOne({ where: { username } });
      if (usernameInUse) {
        throw new HttpException("Username In Use", 400);
      }

      const hashedPass = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create(
        {
          username: createUserDto.username,
          password: hashedPass,
          createdAt: new Date().toISOString(),
          deletedAt: null
        });

      const userNew = await this.userRepository.save(newUser);

      return {
        statusCode: HttpStatus.OK,
        user: userNew,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException("Hata", 500);
    }
  }
}