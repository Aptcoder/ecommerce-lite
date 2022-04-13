import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @Column({
    nullable: false,
  })
  password: string;
}

@Entity()
export class Buyer extends User {}

@Entity()
export class Seller extends User {
  @Column()
  displayName: string;
}
