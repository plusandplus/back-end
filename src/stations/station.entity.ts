import { Room } from 'src/rooms/room.entity';
import {
  BaseEntity,
  CreateDateColumn,
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

  @Column({ type: 'int', comment: '최저가격' })
  price: number;

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

  @OneToMany(() => Room, (room) => room.id)
  room: Room[];
}
