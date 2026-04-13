import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    example: false,
    description: 'Estado activo del usuario',
  })
  @IsBoolean({ message: 'isActive debe ser booleano' })
  isActive!: boolean;
}