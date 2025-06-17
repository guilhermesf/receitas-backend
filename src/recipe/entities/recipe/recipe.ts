import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '@/user/entities/user/user';
import { Category } from '@/category/entities/category/category';
import { Ingredient } from '@/ingredient/entities/ingredient/ingredient';
import { Planning } from '@/planning/entities/planning/planning';

// Entidade que representa uma receita culinária
@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  // Muitas receitas pertencem a um usuário
  @ManyToOne(() => User, (user: User) => user.recipes)
  user: User;

  // Muitas receitas pertencem a uma categoria
  @ManyToOne(() => Category, (category: Category) => category.recipes)
  category: Category;

  // Muitas receitas possuem muitos ingredientes
  @ManyToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.recipes, { cascade: true })
  @JoinTable()
  ingredients: Ingredient[];

  // Uma receita pode estar em vários planejamentos
  @OneToMany(() => Planning, (planning: Planning) => planning.recipe)
  plannings: Planning[];
}
