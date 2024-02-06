import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/modules/users/users.module';
import { CategoryModule } from './app/modules/category/category.module';
import { ProductModule } from './app/modules/product/product.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './app/modules/images/images.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: true }
          : true,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    CategoryModule,
    ProductModule,
    ImagesModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
