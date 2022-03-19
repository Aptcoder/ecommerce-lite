import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: false,
  })
  email: string;
}

@Entity()
export class Buyer {
  @Column(() => User)
  user: User;
}

@Entity()
export class Seller {
  @Column(() => User)
  user: User;

  @Column()
  displayName: string;
}
