import { Order } from 'src/orders/orders.entity';
import { Station } from 'src/stations/station.entity';
import {
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '방이름' })
  name: string;

  @Column({ type: 'text', comment: '방이미지' })
  image: string;

  @Column({ type: 'varchar', comment: '방설명' })
  content: string;

  @Column({ type: 'int', comment: '방이미지' })
  price: number;

  @Column({ type: 'int', comment: '방의 최대개수' })
  max_cnt: number;

  @Column({ type: 'varchar', length: 50, comment: '결제상태값' })
  status: string;

  @Column({ type: 'varchar', length: 30, comment: '체크인시간' })
  checkin_time: string;

  @Column({ type: 'varchar', length: 30, comment: '체크아웃시간' })
  checkout_time: string;

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

  @ManyToOne(() => Station, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @OneToMany(() => Order, (order) => order.room)
  orders: Order[];
}
