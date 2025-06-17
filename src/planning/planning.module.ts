import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './entities/planning/planning';
import { User } from '../user/entities/user/user';
import { Recipe } from '../recipe/entities/recipe/recipe';

// Módulo que agrupa controller e service de planejamentos, além de importar dependências necessárias.
@Module({
  imports: [TypeOrmModule.forFeature([Planning, User, Recipe])],
  providers: [PlanningService],
  controllers: [PlanningController]
})
export class PlanningModule {}
