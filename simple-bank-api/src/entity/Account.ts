import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Account {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("double precision")
    balance: number;
}