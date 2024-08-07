"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlumnosService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
let AlumnosService = class AlumnosService {
    constructor() {
        this.tableName = 'AlumnosTable';
        this.dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
    }
    async create(createAlumnoDto) {
        const alumno = Object.assign({ id: (0, uuid_1.v4)() }, createAlumnoDto);
        try {
            await this.dynamoDB.put({
                TableName: this.tableName,
                Item: alumno,
            }).promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el alumno');
        }
        return alumno;
    }
    async findAll() {
        try {
            const result = await this.dynamoDB.scan({
                TableName: this.tableName,
            }).promise();
            return result.Items;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al obtener los alumnos');
        }
    }
    async findOne(id) {
        try {
            const result = await this.dynamoDB.get({
                TableName: this.tableName,
                Key: { id },
            }).promise();
            if (!result.Item) {
                throw new common_1.NotFoundException(`Alumno con ID ${id} no encontrado`);
            }
            return result.Item;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al obtener el alumno');
        }
    }
    async update(id, updateAlumnoDto) {
        const updateExpression = 'set ' + Object.keys(updateAlumnoDto).map(key => `#${key} = :${key}`).join(', ');
        const expressionAttributeNames = Object.keys(updateAlumnoDto).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [`#${key}`]: key })), {});
        const expressionAttributeValues = Object.entries(updateAlumnoDto).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [`:${key}`]: value })), {});
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
                throw new common_1.NotFoundException(`Alumno con ID ${id} no encontrado`);
            }
            return result.Attributes;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al actualizar el alumno');
        }
    }
    async remove(id) {
        try {
            await this.dynamoDB.delete({
                TableName: this.tableName,
                Key: { id },
                ConditionExpression: 'attribute_exists(id)',
            }).promise();
        }
        catch (error) {
            if (error instanceof Error && 'code' in error && error.code === 'ConditionalCheckFailedException') {
                throw new common_1.NotFoundException(`Alumno con ID ${id} no encontrado`);
            }
            throw new common_1.InternalServerErrorException('Error al eliminar el alumno');
        }
    }
    async search(query) {
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
            return result.Items;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al buscar alumnos');
        }
    }
};
exports.AlumnosService = AlumnosService;
exports.AlumnosService = AlumnosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AlumnosService);
//# sourceMappingURL=alumnos.service.js.map