import { BaseEntity } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Station extends BaseEntity {
  @PrimaryGeneratedColumn()
  station_idx: number;

  @Column({ type: 'varchar', length: 100, comment: '숙소이름' })
  firstName: string;

  @Column({ type: 'text', comment: '숙소대표이미지' })
  image: string;

  @Column({ type: 'varchar', length: 255, comment: '숙소설명' })
  content: string;

  @Column({ type: 'int', comment: '최저가격' })
  price: string;

  @Column({ type: 'text', comment: '좌표값x' })
  x: string;

  @Column({ type: 'text', comment: '좌표값y' })
  y: string;

  @Column({ type: 'tinyint', comment: '활성화 여부' })
  active: string;
}
