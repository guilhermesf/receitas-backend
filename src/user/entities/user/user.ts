import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Recipe } from '@/recipe/entities/recipe/recipe';
import { Planning } from '@/planning/entities/planning/planning';

// Entidade que representa o usuário do sistema
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  // Um usuário pode ter várias receitas cadastradas
  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.user)
  recipes: Recipe[];

  // Um usuário pode ter vários planejamentos
  @OneToMany(() => Planning, (planning: Planning) => planning.user)
  plannings: Planning[];
}
