import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

export enum AddressType {
  HOME = 'home',
  WORK = 'work',
}

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  city: string;

  @Column({ length: 300 })
  street: string;

  @Column()
  houseNumber: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: AddressType,
    default: AddressType.WORK,
  })
  address_type: AddressType;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
