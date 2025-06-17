import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@/user/entities/user/user';
import { Recipe } from '@/recipe/entities/recipe/recipe';

// Entidade que representa o planejamento de uma receita para um usuário em uma data específica
@Entity()
export class Planning {
  @PrimaryGeneratedColumn()
  id: number;

  // Data planejada para a receita
  @Column({ type: 'date' })
  date: string;

  // Muitos planejamentos pertencem a um usuário
  @ManyToOne(() => User, (user: User) => user.plannings)
  user: User;

  // Muitos planejamentos pertencem a uma receita
  @ManyToOne(() => Recipe, (recipe: Recipe) => recipe.plannings)
  recipe: Recipe;
}
