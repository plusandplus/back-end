import { Station } from 'src/stations/station.entity';
import { BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  room_idx: number;

  @Column({ type: 'varchar', length: 100, comment: '방이름' })
  name: string;

  @Column({ type: 'text', comment: '방이미지' })
  image: string;

  @Column({ type: 'varchar', length: 255, comment: '방설명' })
  content: string;

  @Column({ type: 'int', comment: '방이미지' })
  price: number;

  @Column({ type: 'int', comment: '방의 최대개수' })
  max_cnt: number;

  @ManyToOne(() => Station, (station) => station.room, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'station_idx' })
  station_idx: Station;
}
