import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: config.get<string>('PG_DB_USERNAME'),
      password: config.get<string>('PG_DB_PASSWORD'),
      database: 'ecommerce-lite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
