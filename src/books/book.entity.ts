// import { EntitySchema } from 'typeorm';
// // import { Book } from './book.entity.interface';
// export interface Book {
//   id: number;
//   title: string;
// }

// export const BookEntity = (databaseName,connection?)=> {
  
//   return new EntitySchema<Book>({
//     name: 'book',
//     columns: {
//       id: {
//         type: Number,
//         primary: true,
//         generated: true,
//       },
//       title: {
//         type: String,
//       },
//     },
//     tableName: 'book',
//     database: databaseName,
//   });
// };

// export const BookEntity1 = new EntitySchema<Book>({
//   name: 'book',
//   columns: {
//     id: {
//       type: Number,
//       primary: true,
//       generated: true,
//     },
//     title: {
//       type: String,
//     },
//   },
//   tableName: 'book',
//   // schema: databaseName,
//   // database: 'tenant3',
// });

// export const BookEntity2 = new EntitySchema<Book>({
//   name: 'book',
//   columns: {
//     id: {
//       type: Number,
//       primary: true,
//       generated: true,
//     },
//     title: {
//       type: String,
//     },
//   },
//   tableName: 'book',
//   // schema: databaseName,
//   database: 'tenant3',
// });
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

}

