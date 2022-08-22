import { Order } from 'src/orders/orders.entity';
import {
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => Order, (order) => order.review, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
