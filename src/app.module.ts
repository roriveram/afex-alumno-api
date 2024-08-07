import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos/alumnos.controller';
import { AlumnosService } from './alumnos/alumnos.service';

@Module({
  imports: [],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AppModule {}