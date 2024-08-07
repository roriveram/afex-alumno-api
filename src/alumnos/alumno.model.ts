import { IsString, IsNumber, IsUUID } from 'class-validator';

export class Alumno {
    @IsUUID()
    id!: string;
  
    @IsString()
    nombre!: string;
  
    @IsString()
    apellido!: string;
  
    @IsNumber()
    edad!: number;
  
    @IsString()
    curso!: string;
  }