import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../entities/User';

// entidade de sala (tabela no banco)
@Entity()
class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;
  
  @Column({ type: 'int', name: 'user_limit' })
  userLimit: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User
}

export default Room;
