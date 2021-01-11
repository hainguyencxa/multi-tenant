import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({database:'tenant2'})
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

}