import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planning } from './entities/planning/planning';
import { User } from '../user/entities/user/user';
import { Recipe } from '../recipe/entities/recipe/recipe';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';

// Service responsável pela lógica de negócio e manipulação dos dados de planejamentos.
@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Planning)
    private planningRepository: Repository<Planning>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(createPlanningDto: CreatePlanningDto): Promise<Planning> {
    const user = await this.userRepository.findOne({ where: { id: createPlanningDto.userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${createPlanningDto.userId}" não encontrado.`);
    }

    const recipe = await this.recipeRepository.findOne({ where: { id: createPlanningDto.recipeId } });
    if (!recipe) {
      throw new NotFoundException(`Receita com ID "${createPlanningDto.recipeId}" não encontrada.`);
    }

    const planning = this.planningRepository.create({
      date: createPlanningDto.date,
      user: user,
      recipe: recipe,
    });
    return this.planningRepository.save(planning);
  }

  findAll(): Promise<Planning[]> {
    return this.planningRepository.find({ relations: ['user', 'recipe'] });
  }

  async findOne(id: number): Promise<Planning> {
    const planning = await this.planningRepository.findOne({ where: { id }, relations: ['user', 'recipe'] });
    if (!planning) {
      throw new NotFoundException(`Planejamento com ID "${id}" não encontrado.`);
    }
    return planning;
  }

  async update(id: number, updatePlanningDto: UpdatePlanningDto): Promise<Planning> {
    const planning = await this.findOne(id);

    if (updatePlanningDto.userId) {
      const user = await this.userRepository.findOne({ where: { id: updatePlanningDto.userId } });
      if (!user) {
        throw new NotFoundException(`Usuário com ID "${updatePlanningDto.userId}" não encontrado.`);
      }
      planning.user = user;
    }

    if (updatePlanningDto.recipeId) {
      const recipe = await this.recipeRepository.findOne({ where: { id: updatePlanningDto.recipeId } });
      if (!recipe) {
        throw new NotFoundException(`Receita com ID "${updatePlanningDto.recipeId}" não encontrada.`);
      }
      planning.recipe = recipe;
    }

    // Update other properties from DTO
    if (updatePlanningDto.date) {
      planning.date = updatePlanningDto.date;
    }

    return this.planningRepository.save(planning);
  }

  async remove(id: number): Promise<void> {
    const result = await this.planningRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Planejamento com ID "${id}" não encontrado para remoção.`);
    }
  }
}
