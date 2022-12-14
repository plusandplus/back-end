import { Category } from 'src/categories/category.entity';
import { Event } from 'src/events/event.entity';
import { Like } from 'src/likes/like.entity';
import { Order } from 'src/orders/orders.entity';
import { Room } from 'src/rooms/room.entity';
import { Theme } from 'src/themes/theme.entity';
import {
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StationStatus } from './station-status.enum';

@Entity()
export class Station extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '숙소이름' })
  name: string;

  @Column({ type: 'text', comment: '숙소대표이미지' })
  image: string;

  @Column({ type: 'varchar', comment: '숙소설명' })
  content: string;

  @Column({ type: 'int', nullable: true, comment: '최저가격' })
  minprice: number;
  @Column({ type: 'int', nullable: true, comment: '최고가격' })
  maxprice: number;

  @Column({ type: 'varchar', comment: '상세주소' })
  address: string;
  @Column({ type: 'text', comment: '좌표값x' })
  x: string;
  @Column({ type: 'text', comment: '좌표값y' })
  y: string;

  @Column({ type: 'varchar', length: 20, comment: '활성화 상태 여부' })
  status: StationStatus;

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

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'local_id' })
  local: Category;

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'stay_id' })
  stay: Category;

  @ManyToMany(() => Theme)
  @JoinTable({
    name: 'stations_themes',
    joinColumn: { name: 'station_id' },
    inverseJoinColumn: { name: 'theme_id' },
  })
  themes: Theme[];

  @OneToMany(() => Room, (room) => room.station)
  rooms: Room[];

  @OneToMany(() => Like, (like) => like.station)
  likes: Like[];

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Order, (order) => order.station)
  orders: Order[];
}
