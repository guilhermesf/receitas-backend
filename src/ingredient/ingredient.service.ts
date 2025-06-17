import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient/ingredient';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

// Service responsável pela lógica de negócio e manipulação dos dados de ingredientes.
@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({ where: { id } });
    if (!ingredient) {
      throw new NotFoundException(`Ingrediente com ID "${id}" não encontrado.`);
    }
    return ingredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    const ingredient = await this.findOne(id);
    Object.assign(ingredient, updateIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ingredientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ingrediente com ID "${id}" não encontrado para remoção.`);
    }
  }
}
