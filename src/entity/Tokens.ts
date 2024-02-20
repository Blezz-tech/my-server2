import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Tokens {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    admins_id: Number

    @Column()
    token: String
}
