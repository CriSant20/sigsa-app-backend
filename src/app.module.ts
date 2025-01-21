import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.dbHost,
        port: +process.env.dbPort, //Poner el puerto de su base de datos
        username: process.env.dbUser,
        password: process.env.dbPassword,
        database: process.env.dbDatabase,//Nombrar su base de esta manera
        autoLoadEntities: true,
        synchronize: true,
      }
    ),
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
