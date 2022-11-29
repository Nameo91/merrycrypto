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
import { DeleteHoldingDto } from './dto/deleteHolding';

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
    const holding = user.portfolio.filter(holding => holding.name == coin['name'])
    console.log(holding)

    if (holding.length == 0) {
      user.portfolio.push(coin);
    } else if (holding.length == 1) {
      const totalHolding = ((holding[0].priceBought) * (holding[0].amountBought)) + (coin['priceBought'] * coin['amountBought'])
      const totalCoins = parseInt(holding[0].amountBought) + parseInt(coin['amountBought'])
      const avgPrice = totalHolding / totalCoins

      console.log(totalHolding)
      console.log(totalCoins)
      console.log(avgPrice)

      user.portfolio = user.portfolio.filter((e) => e.name !== coin['name']);
      
      const updatedHolding = {
        name: coin['name'],
        imgURL: coin['imgURL'],
        priceBought: avgPrice,
        amountBought: totalCoins
      }
      user.portfolio.push(updatedHolding);
    }
  
    return this.userRepository.save(user);
  }  

  async getPortfolio(id: number) {
    const user = await this.findById(id);
    return user.portfolio;
  }

  async removeHolding(coin: DeleteHoldingDto, id: number) {
    const user = await this.findById(id);

    const holding = user.portfolio.filter(holding => holding.name == coin.coin)

    if (holding.length == 1) {
      user.portfolio = user.portfolio.filter((e) => e.name !== coin.coin);
      return this.userRepository.save(user);
    }
    return user.portfolio;
  }
}
