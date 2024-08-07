// src/alumnos/dto/create-alumno.dto.ts
import { IsString, IsNumber, IsNotEmpty, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del alumno' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del alumno' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  apellido: string;

  @ApiProperty({ example: 20, description: 'Edad del alumno' })
  @IsNumber()
  @IsNotEmpty()
  @Min(5)
  @Max(100)
  edad: number;

  @ApiProperty({ example: '3ro A', description: 'Curso del alumno' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  curso: string;
}