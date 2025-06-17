import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from '@/recipe/entities/recipe/recipe';

// Entidade que representa uma categoria de receita
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Uma categoria pode ter várias receitas
  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.category)
  recipes: Recipe[];
}
