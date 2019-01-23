import { User } from './user';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsPositive, IsNotEmpty, IsNumber,  } from 'class-validator';

@Entity('movimentacoes')
export class Movimentacao extends BaseEntity {

  @PrimaryGeneratedColumn() id: number;
  
  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 70 }) tipo: string; // receita ou despesa

  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 70 }) descricao: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Column({ type: "int", width: 11 }) preco: string;

  @IsString()
  @Column({ type: "varchar", length: 60, comment: 'PAGO, PENDENTE, RECEBIDO' }) situacao: string; // pago pendente recebido

  @ManyToOne(() => User, user => user.movimentacoes)
  @JoinColumn() user: User

  @CreateDateColumn() created_at: Date;
  @CreateDateColumn() updated_at: Date;

}