import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AlumnosController (e2e)', () => {
  let app: INestApplication;
  let apiKey: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    apiKey = process.env.API_KEY || 'test-api-key';
  });

  it('/alumnos (GET)', () => {
    return request(app.getHttpServer())
      .get('/alumnos')
      .set('x-api-key', apiKey)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/alumnos (POST)', () => {
    return request(app.getHttpServer())
      .post('/alumnos')
      .set('x-api-key', apiKey)
      .send({
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 20,
        curso: '3ro A',
      })
      .expect(201)
      .expect('Content-Type', /json/);
  });

  // Agregar más pruebas para los otros endpoints

  afterAll(async () => {
    await app.close();
  });
});