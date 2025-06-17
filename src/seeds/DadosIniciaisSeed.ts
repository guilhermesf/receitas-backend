import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../user/entities/user/user';
import { Category } from '../category/entities/category/category';
import { Ingredient } from '../ingredient/entities/ingredient/ingredient';
import { Recipe } from '../recipe/entities/recipe/recipe';
import { Planning } from '../planning/entities/planning/planning';
import * as bcrypt from 'bcrypt'; // Para hashear a senha do usuário

export class DadosIniciaisSeed implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        // Obter repositórios
        const userRepository = dataSource.getRepository(User);
        const categoryRepository = dataSource.getRepository(Category);
        const ingredientRepository = dataSource.getRepository(Ingredient);
        const recipeRepository = dataSource.getRepository(Recipe);
        const planningRepository = dataSource.getRepository(Planning);

        // 1. Criar Usuário Admin
        const hashedPassword = await bcrypt.hash('admin123', 10); // Hash da senha
        const adminUser = userRepository.create({
            name: 'Administrador',
            email: 'admin@receitas.com',
            password: hashedPassword,
        });
        await userRepository.save(adminUser);
        console.log('Usuário Administrador criado.');

        // 2. Criar Categorias
        const category1 = categoryRepository.create({ name: 'Sobremesas' });
        const category2 = categoryRepository.create({ name: 'Pratos Principais' });
        const category3 = categoryRepository.create({ name: 'Acompanhamentos' });
        await categoryRepository.save([category1, category2, category3]);
        console.log('Categorias criadas.');

        // 3. Criar Ingredientes
        const ingredient1 = ingredientRepository.create({ name: 'Açúcar' });
        const ingredient2 = ingredientRepository.create({ name: 'Farinha de Trigo' });
        const ingredient3 = ingredientRepository.create({ name: 'Ovos', });
        const ingredient4 = ingredientRepository.create({ name: 'Leite' });
        const ingredient5 = ingredientRepository.create({ name: 'Frango' });
        const ingredient6 = ingredientRepository.create({ name: 'Arroz' });
        await ingredientRepository.save([ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6]);
        console.log('Ingredientes criados.');

        // 4. Criar Receitas
        const recipe1 = recipeRepository.create({
            title: 'Bolo de Chocolate',
            description: 'Um delicioso bolo de chocolate para todas as ocasiões.',
            user: adminUser,
            category: category1,
            ingredients: [ingredient1, ingredient2, ingredient3, ingredient4], // Relaciona ingredientes
        });
        await recipeRepository.save(recipe1);

        const recipe2 = recipeRepository.create({
            title: 'Frango Xadrez',
            description: 'Tradicional frango xadrez com pimentões.',
            user: adminUser,
            category: category2,
            ingredients: [ingredient5, ingredient6],
        });
        await recipeRepository.save(recipe2);
        console.log('Receitas criadas.');

        // 5. Criar Planejamento
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Para garantir que seja apenas a data

        const planning1 = planningRepository.create({
            user: adminUser,
            recipe: recipe1,
            date: today.toISOString().split('T')[0], // Formato 'YYYY-MM-DD'
        });
        await planningRepository.save(planning1);
        console.log('Planejamento criado.');

        console.log('Seeds iniciais concluídos!');
    }
}
