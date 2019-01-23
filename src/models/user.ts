import { Movimentacao } from './movimentacao';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { IsString, IsInt, IsPositive, IsEmail, IsNotEmpty, IsBoolean, IsOptional,  } from 'class-validator';

@Entity('usuarios')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn() id: number;
  
  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 70 }) nome: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 70 }) sobrenome: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Column({ type: "int", width: 11 }) idade: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: "char" }) genero: string;

  @IsEmail()
  @Column({ type: "varchar", length: 100 }) email: string;

  @IsString()
  @Column({ type: "varchar", length: 60 }) cargo: string;

  @IsString()
  @Column({ type: "varchar", length: 100 }) senha: string;

  @IsString()
  @IsOptional()
  @Column({ type: "varchar", length: 150 }) photoURI: string;

  @OneToMany(() => Movimentacao, movimentacao => movimentacao.id)
  @JoinColumn() movimentacoes: Movimentacao[]

  @IsBoolean()
  @Column({ type: "boolean", comment: '0 - inativo, 1 - ativo' }) ativo: boolean;
  @CreateDateColumn() created_at: Date;
  @CreateDateColumn() updated_at: Date;

}