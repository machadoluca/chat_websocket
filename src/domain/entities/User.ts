import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// entidade de usuário (tabela no banco)
@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;
  
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true, default: '/default.png' })
  image?: string;
}

export default User;
