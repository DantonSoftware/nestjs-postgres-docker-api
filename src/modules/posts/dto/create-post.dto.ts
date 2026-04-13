import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Mi primer post',
    description: 'Título del post',
  })
  @IsString({ message: 'El título debe ser texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title!: string;

  @ApiProperty({
    example: 'Estoy aprendiendo NestJS con relaciones y migraciones',
    description: 'Contenido del post',
  })
  @IsString({ message: 'El contenido debe ser texto' })
  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  @MinLength(5, { message: 'El contenido debe tener al menos 5 caracteres' })
  content!: string;
}