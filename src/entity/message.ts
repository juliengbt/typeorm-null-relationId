import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { User } from "./user"

@Entity("Message")
export class Message {
  @PrimaryColumn({ type: 'varbinary', length: 16 })
    id!: Buffer

  @ManyToOne(() => User, (user) => user.id, { nullable: false, })
  @JoinColumn({ referencedColumnName: "id" })
  sender!: User

  @Column()
    text!: string
}
