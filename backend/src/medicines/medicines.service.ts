import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dtos/create-medicine.dto';
import { UpdateMedicineDto } from './dtos/update-medecine.dto';

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

    async update(id: number, updateMedicineDto: UpdateMedicineDto): Promise<Medicine> {
        const medicine = await this.repo.findOneBy({ id });
        if (!medicine) {
            throw new NotFoundException(`Le médicament #${id} n’existe pas`);
        }
        Object.assign(medicine, updateMedicineDto);
        return this.repo.save(medicine);
    }

    async remove(id: number): Promise<void> {
        const medicine = await this.repo.findOneBy({ id });
        if (!medicine) {
            throw new NotFoundException(`Le médicament #${id} n'existe pas`);
        }
        await this.repo.remove(medicine);
    }
}
