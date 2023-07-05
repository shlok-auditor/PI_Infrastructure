import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import Model from '../base/model.entity';
import { User } from '../user/user.entity';

@Entity('organization')
export class Organization extends Model {
    @Index('org_index')
    @Column()
    name: string;

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    user_id: User;
}
