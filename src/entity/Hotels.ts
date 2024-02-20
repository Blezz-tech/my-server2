import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Hotels {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    name: String

    @Column()
    number: Number
}