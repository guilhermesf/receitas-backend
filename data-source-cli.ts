import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: '2',
  database: 'receitasapi',
  entities: ['dist/src/**/*.entity.js', 'dist/src/**/user.js', 'dist/src/**/category.js', 'dist/src/**/ingredient.js', 'dist/src/**/planning.js', 'dist/src/**/recipe.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  seeds: ['dist/src/seeds/**/*.js'],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(options); 