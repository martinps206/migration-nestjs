import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto); // Crea una instancia de User
    return this.userRepository.save(newUser); // Guarda en la base de datos
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Obtiene todos los usuarios
  }

  async findOne(id: number): Promise<User | undefined> {
    // Convierte el id a string para coincidir con el tipo en la base de datos
    const user = await this.userRepository.findOne({ where: { id: id.toString() } });
  
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
  
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Busca el usuario
    const updatedUser = Object.assign(user, updateUserDto); // Actualiza los campos
    return this.userRepository.save(updatedUser); // Guarda los cambios
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Busca el usuario
    await this.userRepository.remove(user); // Elimina el usuario
  }
}
