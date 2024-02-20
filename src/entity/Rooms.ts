import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    name: String

    @Column()
    desc_data: String
}