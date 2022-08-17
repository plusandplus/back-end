import { Order } from 'src/orders/orders.entity';
import { Room } from 'src/rooms/room.entity';
import { Station } from 'src/stations/station.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, comment: '닉네임' })
  nickname: string;

  @Column({ type: 'int', nullable: true, comment: '평점(별점)' })
  rating: number;

  @Column({ type: 'text', nullable: true, comment: '리뷰 이미지' })
  image: string;

  @Column({ type: 'varchar', nullable: true, comment: '리뷰내용' })
  content: string;

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

  @ManyToOne(() => Review, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => Order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  //   @ManyToOne(() => User, {
  //     onDelete: 'CASCADE',
  //     nullable: false,
  //   })
  //   @JoinColumn({ name: 'user_id' })
  //   user: User;

  //   @ManyToOne(() => Station, {
  //     onDelete: 'CASCADE',
  //     nullable: false,
  //   })
  //   @JoinColumn({ name: 'station_id' })
  //   station: Station;

  //   @ManyToOne(() => Room, {
  //     onDelete: 'CASCADE',
  //     nullable: false,
  //   })
  //   @JoinColumn({ name: 'room_id' })
  //   room: Room;
}
