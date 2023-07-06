import { Entity, Column, Index,BaseEntity, PrimaryGeneratedColumn,BeforeInsert  } from 'typeorm';
import Model from '../base/model.entity';


@Entity('jobs')
export class Jobs extends BaseEntity {
    @PrimaryGeneratedColumn ()
    id: number;
    
    @Column('text', { array: true, nullable: true })
    job_locations: string[];

    @Column('text', {nullable: true })
    address : string

    @Column({nullable: true })
    country : string

    @Column({nullable: true })
    postal_code : number
}