import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("double precision")
  balance: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}
