import { Review } from 'src/reviews/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  year: number;

  @Column()
  duration: number;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
