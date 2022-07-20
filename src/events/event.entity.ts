import { Station } from 'src/stations/station.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '이벤트이름' })
  name: string;

  @Column({ type: 'date', comment: '이벤트 시작날짜' })
  start_date: Date;

  @Column({ type: 'date', comment: '이벤트 마감날짜' })
  end_date: Date;

  @Column({ type: 'int', comment: '할인율' })
  rate: number;

  @OneToMany(() => Station, (station) => station.id)
  stations: Station[];
}
