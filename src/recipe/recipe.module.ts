import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe/recipe';
import { User } from '../user/entities/user/user';
import { Category } from '../category/entities/category/category';
import { Ingredient } from '../ingredient/entities/ingredient/ingredient';

// Módulo que agrupa controller e service de receitas, além de importar dependências necessárias.
@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, User, Category, Ingredient]),
  ],
  providers: [RecipeService],
  controllers: [RecipeController]
})
export class RecipeModule {}
