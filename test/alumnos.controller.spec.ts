import { Test, TestingModule } from '@nestjs/testing';
import { AlumnosController } from '../src/alumnos/alumnos.controller';
import { AlumnosService } from '../src/alumnos/alumnos.service';
import { CreateAlumnoDto } from '../src/alumnos/dto/create-alumno.dto';
import { UpdateAlumnoDto } from '../src/alumnos/dto/update-alumno.dto';
import { Alumno } from '../src/alumnos/alumno.model';

describe('AlumnosController', () => {
  let controller: AlumnosController;
  let service: AlumnosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumnosController],
      providers: [
        {
          provide: AlumnosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AlumnosController>(AlumnosController);
    service = module.get<AlumnosService>(AlumnosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new alumno', async () => {
      const createAlumnoDto: CreateAlumnoDto = {
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 20,
        curso: '3ro A',
      };
      const expectedResult: Alumno = { id: 'some-uuid', ...createAlumnoDto };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(createAlumnoDto)).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createAlumnoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of alumnos', async () => {
      const expectedResult: Alumno[] = [
        { id: '1', nombre: 'Juan', apellido: 'Pérez', edad: 20, curso: '3ro A' },
        { id: '2', nombre: 'María', apellido: 'Gómez', edad: 21, curso: '3ro B' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single alumno', async () => {
      const expectedResult: Alumno = { id: '1', nombre: 'Juan', apellido: 'Pérez', edad: 20, curso: '3ro A' };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      expect(await controller.findOne('1')).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an alumno', async () => {
      const updateAlumnoDto: UpdateAlumnoDto = { nombre: 'Juan Carlos' };
      const expectedResult: Alumno = { id: '1', nombre: 'Juan Carlos', apellido: 'Pérez', edad: 20, curso: '3ro A' };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      expect(await controller.update('1', updateAlumnoDto)).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith('1', updateAlumnoDto);
    });
  });

  describe('remove', () => {
    it('should remove an alumno', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('search', () => {
    it('should search for alumnos', async () => {
      const query = 'Juan';
      const expectedResult: Alumno[] = [
        { id: '1', nombre: 'Juan', apellido: 'Pérez', edad: 20, curso: '3ro A' },
      ];

      jest.spyOn(service, 'search').mockResolvedValue(expectedResult);

      expect(await controller.search(query)).toBe(expectedResult);
      expect(service.search).toHaveBeenCalledWith(query);
    });
  });
});