export class CreateRecipeDto {
  title: string;
  description: string;
  userId: number; // ID do usuário criador da receita
  categoryId: number; // ID da categoria da receita
  ingredientIds: number[]; // Lista de IDs de ingredientes
} 