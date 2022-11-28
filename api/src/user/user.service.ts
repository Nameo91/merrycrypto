import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { JWT_SECRET } from '../config';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { compare } from 'bcrypt';
import { CreateStarDto } from './dto/createStar.dto';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username has already been used',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
      select: ['id', 'username', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'Login details are incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Login details are incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async updateStarredCoins(stardto: CreateStarDto, id: number) {
    const user = await this.findById(id);
    const coinname = stardto.starredCoins;

    if (user.starredCoins.includes(coinname)) {
      //if coin name does exist, deletes the name
      user.starredCoins = user.starredCoins.filter((e) => e !== coinname);
      return this.userRepository.save(user);
    } else {
      //if coin name doesn't exist, save the name
      user.starredCoins.push(coinname);
      return this.userRepository.save(user);
    }
  }

  async getStarredCoins(id: number) {
    const user = await this.findById(id);
    return user.starredCoins;
  }

  async updatePortfolio(portfoliodto: CreatePortfolioDto, id: number) {
    const user = await this.findById(id);
    const coin = portfoliodto.coin;

      user.portfolio.push(coin);
      return this.userRepository.save(user);
  }
}
