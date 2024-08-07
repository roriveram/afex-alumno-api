import { Alumno } from './alumno.model';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
export declare class AlumnosService {
    private dynamoDB;
    private readonly tableName;
    constructor();
    create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno>;
    findAll(): Promise<Alumno[]>;
    findOne(id: string): Promise<Alumno>;
    update(id: string, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno>;
    remove(id: string): Promise<void>;
    search(query: string): Promise<Alumno[]>;
}
