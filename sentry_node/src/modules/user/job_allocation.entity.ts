import { Entity, Column, Index, BeforeInsert  } from 'typeorm';
import Model from '../base/model.entity';

@Entity('joballocation')
export class JobAllocation extends Model {
    @Column({ type: 'date' })
    allocation_date: Date;

    @Column('json')
    metadata: any;
    
    @Column('json')
    inspector_metadata: any;

}