import { Type } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsNumber, IsUrl, IsDateString } from 'class-validator';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';
import { TipoTarea } from 'src/common/enums/tipos-tarea.enum';

export class CreateTareaDto {
    @IsString()
    nombre: string;

    @IsNumber()
    @Type(() => Number)
    usuario_cliente_id: number;

    @IsEnum(TipoTarea)
    @IsOptional()
    tipo_tarea?: TipoTarea;

    @IsString()
    indicaciones: string;

    @IsString()
    rubrica: string;

    @IsEnum(EstadoTarea)
    @IsOptional()
    estado?: EstadoTarea;

    @IsOptional()
    @IsUrl()
    adjunto_url?: string;

    @IsOptional()
    @IsUrl()
    tarea_realizada_url?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    costo?: number;

    @IsDateString()
    fecha_a_realizar: Date;

    @IsOptional()
    @IsDateString()
    fecha_realizada?: Date;
}
