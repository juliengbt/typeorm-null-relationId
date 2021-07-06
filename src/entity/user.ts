import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from "typeorm"
import { Message } from "./message"

@Entity("User")
export class User {
  @PrimaryColumn({ type: 'varbinary', length: 16 })
    id!: Buffer

  @Column()
    name?: string
}
