import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Recipe } from '@/recipe/entities/recipe/recipe';

// Entidade que representa um ingrediente
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Um ingrediente pode estar em várias receitas
  @ManyToMany(() => Recipe, (recipe: Recipe) => recipe.ingredients)
  recipes: Recipe[];
}
