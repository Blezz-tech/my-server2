import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Admins {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    username: String

    @Column()
    password: String
}
