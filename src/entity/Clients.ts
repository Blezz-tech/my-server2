import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["fio", "email", "phone", "birth_date"])
export class Clients {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    id_rooms: Number

    @Column()
    fio: String

    @Column()
    email: String

    @Column()
    phone: String

    @Column()
    birth_date: String
    
}
