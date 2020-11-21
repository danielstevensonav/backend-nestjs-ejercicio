import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TareaEstado } from './tarea-status.enum';


@Entity()
export class Tarea extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TareaEstado;
}