import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DupOrder extends BaseEntity {
  @Column({ type: 'int', comment: '유저 id' })
  user_id: number;

  @PrimaryColumn({ type: 'int', comment: '방 id' })
  room_id: number;

  @PrimaryColumn({ type: 'date', comment: '체크인' })
  start_date: Date;

  @PrimaryColumn({ type: 'date', comment: '체크아웃' })
  end_date: Date;
}
