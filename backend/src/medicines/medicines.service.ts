import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dtos/create-medicine.dto';

@Injectable()
export class MedicinesService {
    constructor(
        @InjectRepository(Medicine)
        private readonly repo: Repository<Medicine>
    ) {}

    findAll(): Promise<Medicine[]> {
        return this.repo.find();
    }

    create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
        const medicine = this.repo.create(createMedicineDto);
        return this.repo.save(medicine);
    }
}
