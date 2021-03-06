import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity("User")
export class User {
  @PrimaryColumn({ type: 'varbinary', length: 16 })
    id!: Buffer

  @Column()
    name?: string
}
