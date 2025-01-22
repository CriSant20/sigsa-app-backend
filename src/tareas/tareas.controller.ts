import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UploadedFile } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) { }

  @Post()
  @UseInterceptors(FileInterceptor('adjunto'))
  create(
    @Body() createTareaDto: CreateTareaDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ],
        exceptionFactory: (errors) => {
          if (errors === "File is required") {
            throw new BadRequestException('Se requiere un archivo PDF');
          }
          throw new BadRequestException('El archivo debe ser un PDF');
        }
      })
    ) file: Express.Multer.File,
  ) {
    return this.tareasService.create(createTareaDto, file);
  }
  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Get('estado/:estado')
  findByEstado(@Param('estado') estado: EstadoTarea) {
    return this.tareasService.findByEstado(estado);
  }

  @Get('totales')
  getTotalByEstado() {
    return this.tareasService.getTotalByEstado();
  }

  @Get('usuario/:userId')
  findByUser(@Param('userId') userId: number) {
      return this.tareasService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('tarea_realizada'))
  update(
    @Param('id') id: string,
    @Body() updateTareaDto: UpdateTareaDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ],
        fileIsRequired: false, // Make file optional
        exceptionFactory: (errors) => {
          throw new BadRequestException('El archivo debe ser un PDF menor a 8MB');
        }
      })
    ) file?: Express.Multer.File,
  ) {
    return this.tareasService.update(+id, updateTareaDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(+id);
  }
}
