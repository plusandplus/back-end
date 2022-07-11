import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { userRole, userSEX, userOauth } from './user.model.enum';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_idx: Number;
  @Column({ type: 'text', comment: '프로필URL' })
  profile: String;
  @Column({ type: 'varchar', length: 20, comment: '유저/관리자 권한' })
  role: userRole;
  @Column()
  firstSign: Boolean;
  @Column({ type: 'varchar', length: 45, comment: '닉네임' })
  nickName: String;
  @Column({ type: 'varchar', length: 20, comment: '성별' })
  sex: userSEX;
  @Column()
  age: Number;
  @Column({ type: 'varchar', length: 20, comment: 'oauth 정보' })
  oauthName: userOauth;
}
