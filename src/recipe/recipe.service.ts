import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe/recipe';
import { User } from '../user/entities/user/user';
import { Category } from '../category/entities/category/category';
import { Ingredient } from '../ingredient/entities/ingredient/ingredient';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

// Service responsável pela lógica de negócio e manipulação dos dados de receitas.
@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const user = await this.userRepository.findOne({ where: { id: createRecipeDto.userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${createRecipeDto.userId}" não encontrado.`);
    }

    const category = await this.categoryRepository.findOne({ where: { id: createRecipeDto.categoryId } });
    if (!category) {
      throw new NotFoundException(`Categoria com ID "${createRecipeDto.categoryId}" não encontrada.`);
    }

    const ingredients = await this.ingredientRepository.findByIds(createRecipeDto.ingredientIds);
    if (ingredients.length !== createRecipeDto.ingredientIds.length) {
      throw new NotFoundException('Um ou mais ingredientes não foram encontrados.');
    }

    const recipe = this.recipeRepository.create({
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      user,
      category,
      ingredients, // Associa os ingredientes
    });

    return this.recipeRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({ relations: ['user', 'category', 'ingredients'] });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id }, relations: ['user', 'category', 'ingredients'] });
    if (!recipe) {
      throw new NotFoundException(`Receita com ID "${id}" não encontrada.`);
    }
    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.findOne(id); // Reutiliza findOne para verificar existência e carregar relações

    if (updateRecipeDto.userId) {
      const user = await this.userRepository.findOne({ where: { id: updateRecipeDto.userId } });
      if (!user) {
        throw new NotFoundException(`Usuário com ID "${updateRecipeDto.userId}" não encontrado.`);
      }
      recipe.user = user;
    }

    if (updateRecipeDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateRecipeDto.categoryId } });
      if (!category) {
        throw new NotFoundException(`Categoria com ID "${updateRecipeDto.categoryId}" não encontrada.`);
      }
      recipe.category = category;
    }

    if (updateRecipeDto.ingredientIds) {
      const ingredients = await this.ingredientRepository.findByIds(updateRecipeDto.ingredientIds);
      if (ingredients.length !== updateRecipeDto.ingredientIds.length) {
        throw new NotFoundException('Um ou mais ingredientes para atualização não foram encontrados.');
      }
      recipe.ingredients = ingredients;
    }

    // Atualiza outras propriedades
    Object.assign(recipe, { ...updateRecipeDto, userId: undefined, categoryId: undefined, ingredientIds: undefined });

    return this.recipeRepository.save(recipe);
  }

  async remove(id: number): Promise<void> {
    const result = await this.recipeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Receita com ID "${id}" não encontrada para remoção.`);
    }
  }
}
