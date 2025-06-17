import { DataSource } from 'typeorm';
import { User } from './src/user/entities/user/user';
import { Recipe } from './src/recipe/entities/recipe/recipe';
import { Ingredient } from './src/ingredient/entities/ingredient/ingredient';
import { Category } from './src/category/entities/category/category';
import { Planning } from './src/planning/entities/planning/planning';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: '2',
  database: 'receitasapi',
  entities: [User, Recipe, Ingredient, Category, Planning],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});