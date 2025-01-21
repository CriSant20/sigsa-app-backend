import { Rol } from "src/common/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_id: number;

    @Column({
        unique:true
    })
    nombre_usuario: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column(
        {
            unique:true
        }
    )
    correo: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        default: Rol.CLIENTE,
        enum: Rol
    })
    rol: Rol;
}
