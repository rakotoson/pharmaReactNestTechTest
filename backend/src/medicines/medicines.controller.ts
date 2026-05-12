import { Body, Controller, Get, Post } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dtos/create-medicine.dto';

@Controller('medicines')
export class MedicinesController {
    // TODO:
    // GET /medicines
    // POST /medicines
    // PUT /medicines/:id
    // DELETE /medicines/:id
    constructor(
        private readonly medicinesService: MedicinesService
    ) {}

    @Get()
    findAll(): Promise<Medicine[]> {
        return this.medicinesService.findAll();
    }

    @Post()
    async create(@Body() createMedicineDto: CreateMedicineDto): Promise<Medicine> {
        const medecine = await this.medicinesService.create(createMedicineDto);

        console.log(`Medecine crée ID: ${medecine.id}`);
        return medecine
    }   
}
