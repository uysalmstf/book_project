import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post("login")
  async loginUser(@Body() loginUserDto: LoginUserDto) {

    return await this.userService.loginUser(loginUserDto);
  }

  @Post("create")
  async createUser(@Body() createUserDto: CreateUserDto) {

    return await this.userService.createUser(createUserDto);
  }
}