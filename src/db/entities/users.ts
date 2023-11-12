import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  role: string;
}
