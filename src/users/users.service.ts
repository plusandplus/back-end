import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { userSEX, userOauth } from './user.model.enum';
import { User } from './user.entity';
import { getConnection } from 'typeorm';
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
    const { profile, nickName, email, oauthName, oauthId } = createUserDto;
    const user = this.userRepository.create({
      profile,
      nickName,
      email,
      oauthName,
      oauthId,
    });
    await this.userRepository.save(user);
    return user;
  }
  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        `해당 유저의 id(${id})가 없습니다. 다시 한 번 확인 해주세요`,
      );
    }
    return found;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
  async getUserByOauthId(oauthId: string): Promise<User> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.oauthId = :oauthId', { oauthId })
      .getOne();
    return user;
  }
  async getUserByProfile(profile: string): Promise<User> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.profile = :profile', { profile })
      .getOne();
    return user;
  }

  async deleteUser(id: number): Promise<number> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`해당 유저의 id(${id})를 찾을 수 없습니다.`);
    }
    return result.affected;
  }
  async benUser(id: number): Promise<User> {
    const user = await this.getUserById(id);
    user.userLevel = 0;
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(
    id: number,
    sex: userSEX,
    nickName: string,
    age: number,
    phoneNumber: string,
    firstSign: boolean,
  ): Promise<User> {
    const user = await this.getUserById(id);
    user.age = age;
    user.sex = sex;
    user.nickName = nickName;
    user.firstSign = firstSign;
    user.phoneNumber = phoneNumber;
    await this.userRepository.save(user);
    return user;
  }
}
