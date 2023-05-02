import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ToDo } from './todo';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id

    @Column({ type: 'varchar', unique: true })
    email

    @Column({ type: 'varchar', nullable: false })
    password

    @OneToMany(() => ToDo, (todo) => todo.user) 
    todos
}