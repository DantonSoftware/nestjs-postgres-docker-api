import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './modules/posts/posts.module';
import envConfig from './config/env.config';
import { typeOrmConfigAsync } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),

    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule, 
    HealthModule, 
    PostsModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
