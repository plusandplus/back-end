import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '카테고리이름' })
  name: string;

  @Column({ type: 'varchar', length: 50, comment: '분류' })
  classification: string;
}
