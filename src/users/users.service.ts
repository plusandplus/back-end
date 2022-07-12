import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { userRole, userSEX, userOauth } from './user.model.enum';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { profile, nickName, sex, age, oauthName } = createUserDto;
    const role = userRole.USER;
    const user = this.userRepository.create({
      profile,
      nickName,
      role,
      sex,
      age,
      oauthName,
    });
    await this.userRepository.save(user);
    return user;
  }
  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }
  }
  async updateUser(id: number, sex: userSEX, age: number): Promise<User> {
    const user = await this.getUserById(id);
    user.age = age;
    user.sex = sex;
    user.firstSign = true;
    await this.userRepository.save(user);
    return user;
  }
}