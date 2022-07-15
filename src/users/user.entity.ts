import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { userRole, userSEX, userOauth } from './user.model.enum';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', comment: '프로필URL' })
  profile: string;

  @Column({ type: 'varchar', length: 45, comment: '핸드폰번호' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 20, comment: '유저/관리자 권한' })
  role: userRole;

  @Column({ type: 'tinyint', comment: '추가정보 입력 여부' })
  firstSign: boolean;

  @Column({ type: 'varchar', length: 45, comment: '닉네임' })
  nickName: string;

  @Column({ type: 'varchar', length: 20, comment: '성별' })
  sex: userSEX;

  @Column({ type: 'int', comment: '나이' })
  age: number;

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
