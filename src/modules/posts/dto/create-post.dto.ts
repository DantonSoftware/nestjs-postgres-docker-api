import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'El título debe ser texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title!: string;

  @IsString({ message: 'El contenido debe ser texto' })
  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  @MinLength(5, { message: 'El contenido debe tener al menos 5 caracteres' })
  content!: string;

  @IsInt({ message: 'userId debe ser un número entero' })
  userId!: number;
}