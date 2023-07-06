import { Entity, Column,BaseEntity, Index, BeforeInsert,PrimaryGeneratedColumn  } from 'typeorm';
import Model from '../base/model.entity';


@Entity('inspector')
export class Inspector extends BaseEntity {
    @PrimaryGeneratedColumn ()
    id: number;

    @Column('text', { nullable: true })
    name : string

    @Column('text', {  nullable: true })
    currentLocation: string[];

    @Column('text', {  nullable: true })
    address : string

    @Column('text', {  nullable: true })
    country : string

    @Column('text', {  nullable: true })
    postal_code : number
}