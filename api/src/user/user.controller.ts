import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthGuard } from "./guards/auth.guard";
import { UserEntity } from "./user.entity";
import { User } from "./decorators/user.decorator";

@Controller()

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('api/users')
  @UsePipes(new ValidationPipe())

  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    delete user.password;
    return this.userService.buildUserResponse(user);
  }

  @Post('api/users/login')
  @UsePipes(new ValidationPipe())

  async loginUser(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('api/user') 
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}