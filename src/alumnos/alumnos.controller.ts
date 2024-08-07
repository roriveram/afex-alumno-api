import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './alumno.model';
import { ApiKeyGuard } from '../guards/api-key.guard';

@ApiTags('alumnos')
@Controller('alumnos')
@UseGuards(ApiKeyGuard)
@ApiBearerAuth()
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alumno' })
  @ApiResponse({ status: 201, description: 'El alumno ha sido creado exitosamente.', type: Alumno })
  create(@Body() createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los alumnos' })
  @ApiResponse({ status: 200, description: 'Lista de alumnos obtenida exitosamente.', type: [Alumno] })
  findAll(): Promise<Alumno[]> {
    return this.alumnosService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar alumnos' })
  @ApiResponse({ status: 200, description: 'Resultados de la búsqueda.', type: [Alumno] })
  search(@Query('query') query: string): Promise<Alumno[]> {
    return this.alumnosService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alumno por ID' })
  @ApiResponse({ status: 200, description: 'Alumno encontrado.', type: Alumno })
  findOne(@Param('id') id: string): Promise<Alumno> {
    return this.alumnosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un alumno' })
  @ApiResponse({ status: 200, description: 'Alumno actualizado exitosamente.', type: Alumno })
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.update(id, updateAlumnoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alumno' })
  @ApiResponse({ status: 200, description: 'Alumno eliminado exitosamente.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.alumnosService.remove(id);
  }
}