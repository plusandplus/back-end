import { Room } from 'src/rooms/room.entity';
import { Event } from 'src/events/event.entity';
import { Station } from 'src/stations/station.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from 'src/reviews/review.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', comment: '체크인' })
  start_date: Date;

  @Column({ type: 'date', comment: '체크아웃' })
  end_date: Date;

  @Column({ type: 'int', comment: '결제 최종 가격(이벤트적용)' })
  price: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '결제 최종 가격(이벤트적용)',
  })
  SpecialRequest: string;

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

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Station, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Event, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToOne(() => Review, (review) => review.order)
  review: Review;
}
