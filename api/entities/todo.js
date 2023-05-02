import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    id

    @Column({type: 'varchar'})
    task

    @Column({ type: 'boolean', default: false })
    done

    @ManyToOne(() => User, (user) => user.todos)
    user
}