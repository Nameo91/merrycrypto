import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';

@Entity({ name: 'watchlists' })
export class WatchlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coinname: string;

  @ManyToOne(() => UserEntity, (user) => user.watchlists)
  user: UserEntity;
}
