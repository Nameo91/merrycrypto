import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { User } from '@app/user/decorators/user.decorator';
import { CreateStarDto } from '@app/user/dto/createStar.dto';
import { async } from 'rxjs';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('api/users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    delete user.password;
    return this.userService.buildUserResponse(user);
  }

  @Post('api/users/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('api/user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('api/star/:id')
  @UseGuards(AuthGuard)
  async updateWatchlist(@Param('id') id: number, @Body() data: CreateStarDto) {
    return this.userService.updateStarredCoins(data, id);
  }

  @Get('api/:id')
  @UseGuards(AuthGuard)
  async getStarredCoins(@Param('id') id: number) {
    return this.userService.getStarredCoins(id);
  }
}
