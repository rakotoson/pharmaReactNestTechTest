import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dtos/create-medicine.dto';
import { UpdateMedicineDto } from './dtos/update-medecine.dto';

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

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateMedicineDto: UpdateMedicineDto): Promise<Medicine> {
        const medecine = await this.medicinesService.update(id, updateMedicineDto);

        console.log(`Medecine mise à jour ID: ${medecine.id}`);
        return medecine;
    }
}
