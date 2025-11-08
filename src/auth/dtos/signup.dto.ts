import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignupDto {

  @ApiProperty({
    example: 'ST12345',
    description: 'Identifiant de connexion (ce que l’app Android va utiliser)',
    required: false,
  })
  @IsOptional()
  @IsString()
  identifiant?: string;

  @ApiProperty({
    description: 'Nom complet de l’utilisateur',
    example: 'Mohamed Amine Sassi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Adresse email de l’utilisateur',
    example: 'amine.sassi@esprit.tn',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de connexion (min 6 caractères)',
    example: 'P@ssword123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  // 👇👇 add this
  @ApiProperty({
    description: 'Classe / groupe (ex: 4SIM4)',
    example: '4SIM4',
    required: false,
  })
  @IsOptional()
  @IsString()
  classGroup?: string;

  @ApiProperty({
    description: 'Rôle de l’utilisateur (admin, student, parent, teacher...)',
    example: 'student',
    enum: Role,
    required: false,
    default: Role.User,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
