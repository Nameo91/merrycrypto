import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "@app/user/dto/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { UserResponseInterface } from "@app/user/types/userResponse.interface";

@Injectable()

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

 async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
  
  const userByEmail = await this.userRepository.findOne({
    where: { email: createUserDto.email }
  });

  const userByUsername = await this.userRepository.findOne({
    where: { username: createUserDto.username }
  });

  if (userByEmail || userByUsername) {
    throw new HttpException(
      'Email or username has already been used',
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }

  const newUser = new UserEntity();
  Object.assign(newUser, createUserDto);
  return await this.userRepository.save(newUser);
};


  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user
      }
    };
 };
 
} 