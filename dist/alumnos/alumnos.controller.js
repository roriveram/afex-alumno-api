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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlumnosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const alumnos_service_1 = require("./alumnos.service");
const create_alumno_dto_1 = require("./dto/create-alumno.dto");
const update_alumno_dto_1 = require("./dto/update-alumno.dto");
const alumno_model_1 = require("./alumno.model");
const api_key_guard_1 = require("../guards/api-key.guard");
let AlumnosController = class AlumnosController {
    constructor(alumnosService) {
        this.alumnosService = alumnosService;
    }
    create(createAlumnoDto) {
        return this.alumnosService.create(createAlumnoDto);
    }
    findAll() {
        return this.alumnosService.findAll();
    }
    search(query) {
        return this.alumnosService.search(query);
    }
    findOne(id) {
        return this.alumnosService.findOne(id);
    }
    update(id, updateAlumnoDto) {
        return this.alumnosService.update(id, updateAlumnoDto);
    }
    remove(id) {
        return this.alumnosService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo alumno' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'El alumno ha sido creado exitosamente.', type: alumno_model_1.Alumno }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alumno_dto_1.CreateAlumnoDto]),
    __metadata("design:returntype", Promise)
], AlumnosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los alumnos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de alumnos obtenida exitosamente.', type: [alumno_model_1.Alumno] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlumnosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar alumnos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultados de la búsqueda.', type: [alumno_model_1.Alumno] }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumnosController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un alumno por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alumno encontrado.', type: alumno_model_1.Alumno }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumnosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un alumno' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alumno actualizado exitosamente.', type: alumno_model_1.Alumno }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alumno_dto_1.UpdateAlumnoDto]),
    __metadata("design:returntype", Promise)
], AlumnosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un alumno' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alumno eliminado exitosamente.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumnosController.prototype, "remove", null);
AlumnosController = __decorate([
    (0, swagger_1.ApiTags)('alumnos'),
    (0, common_1.Controller)('alumnos'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [alumnos_service_1.AlumnosService])
], AlumnosController);
exports.AlumnosController = AlumnosController;
//# sourceMappingURL=alumnos.controller.js.map