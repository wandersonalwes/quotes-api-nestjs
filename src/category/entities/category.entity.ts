import { Quote } from '../../quote/entities/quote.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Quote, (quote) => quote.category)
  quotes: Quote[];
}
