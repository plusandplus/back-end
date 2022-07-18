import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { userSEX, userOauth } from './user.model.enum';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: 'oauth 구별 Id' })
  oauthId: string;

  @Column({ type: 'varchar', comment: '유저이메일' })
  email: string;

  @Column({ type: 'smallint', default: 10, comment: '유저 권한 레벨' })
  userLevel: number;

  @Column({ type: 'text', comment: '프로필URL' })
  profile: string;

  @Column({ type: 'varchar', length: 45, comment: '핸드폰번호' })
  phoneNumber: string;

  @Column({ type: 'tinyint', comment: '추가정보 입력 여부' })
  firstSign: boolean;

  @Column({ type: 'varchar', length: 45, comment: '닉네임' })
  nickName: string;

  @Column({ type: 'varchar', length: 20, comment: '성별' })
  sex: userSEX;

  @Column({ type: 'int', comment: '나이' })
  age: number;

  @Column({
    type: 'varchar',
    comment: 'refreshToken',
    nullable: true,
  })
  userRefreshToken: string;

  @Column({ type: 'varchar', length: 20, comment: 'oauth 정보' })
  oauthName: userOauth;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
