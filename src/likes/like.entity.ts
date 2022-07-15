import { Station } from 'src/stations/station.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Station, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'station_id' })
  station_id: Station;

  @Column({ type: 'int', comment: '유저아이디' })
  user_id: number;
  //   @ManyToOne(() => User, {
  //     onDelete: 'CASCADE',
  //     nullable: false,
  //   })
  //   @JoinColumn({ name: 'user_id' })
  //   user_id: Station;
}
