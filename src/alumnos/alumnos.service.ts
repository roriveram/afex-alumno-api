import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Alumno } from './alumno.model';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnosService {
  private dynamoDB: DynamoDB.DocumentClient;
  private readonly tableName = 'AlumnosTable-dev';

  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient({
      region: 'us-east-2',
    });
  }

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const alumno: Alumno = {
      id: uuidv4(),
      ...createAlumnoDto,
    };

    try {
      await this.dynamoDB.put({
        TableName: this.tableName,
        Item: alumno,
      }).promise();
    } catch (error) {
      console.error('Error al crear alumno:', error);
      throw new InternalServerErrorException(`Error al crear el alumno: ${error.message}`);
    }

    return alumno;
  }

  async findAll(): Promise<Alumno[]> {
    try {
      const result = await this.dynamoDB.scan({
        TableName: this.tableName,
      }).promise();
      return result.Items as Alumno[];
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      throw new InternalServerErrorException(`Error al obtener los alumnos: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Alumno> {
    try {
      const result = await this.dynamoDB.get({
        TableName: this.tableName,
        Key: { id },
      }).promise();

      if (!result.Item) {
        throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
      }

      return result.Item as Alumno;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el alumno');
    }
  }

  async update(id: string, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    const updateExpression = 'set ' + Object.keys(updateAlumnoDto).map(key => `#${key} = :${key}`).join(', ');
    const expressionAttributeNames = Object.keys(updateAlumnoDto).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    const expressionAttributeValues = Object.entries(updateAlumnoDto).reduce((acc, [key, value]) => ({ ...acc, [`:${key}`]: value }), {});

    try {
      const result = await this.dynamoDB.update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      }).promise();

      if (!result.Attributes) {
        throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
      }

      return result.Attributes as Alumno;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el alumno');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.dynamoDB.delete({
        TableName: this.tableName,
        Key: { id },
        ConditionExpression: 'attribute_exists(id)',
      }).promise();
    } catch (error) {
      //if (error.code === 'ConditionalCheckFailedException') {
      //  throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
      //}
      if (error instanceof Error && 'code' in error && error.code === 'ConditionalCheckFailedException') {
        throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
      }
      throw new InternalServerErrorException('Error al eliminar el alumno');
    }
  }

  async search(query: string): Promise<Alumno[]> {
    try {
      const result = await this.dynamoDB.scan({
        TableName: this.tableName,
        FilterExpression: 'contains(#nombre, :query) or contains(#apellido, :query) or contains(#curso, :query)',
        ExpressionAttributeNames: {
          '#nombre': 'nombre',
          '#apellido': 'apellido',
          '#curso': 'curso',
        },
        ExpressionAttributeValues: {
          ':query': query,
        },
      }).promise();

      return result.Items as Alumno[];
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar alumnos');
    }
  }
}