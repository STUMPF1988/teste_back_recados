
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { IRecados } from "../../../../features/recados/domain/model/recados";
  
  @Entity()
  export class Recados implements IRecados {
    @PrimaryGeneratedColumn("uuid", {
      name: "uid",
    })
    uid: string;
  
    @Column()
    descricao: string;
  
    @Column({
      nullable: true,
    })
    detalhamento: string;
  
    @CreateDateColumn()
    created_at: Date;
  }