import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Address } from '../addreses/addresses.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  @Index()
  firstName: string;

  @Column({ length: 300 })
  @Index()
  lastName: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];
}
