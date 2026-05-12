import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dtos/create-medicine.dto';
import { UpdateMedicineDto } from './dtos/update-medecine.dto';
import { QueryMedicineDto } from './dtos/query-medicine.dto';

@Controller('medicines')
export class MedicinesController {
    // TODO:
    // GET /medicines
    constructor(
        private readonly medicinesService: MedicinesService
    ) {}

    @Get()
    findAll(@Query() query: QueryMedicineDto) {
        return this.medicinesService.findAll(query);
    }


    // POST /medicines
    @Post()
    async create(@Body() createMedicineDto: CreateMedicineDto): Promise<Medicine> {
        const medecine = await this.medicinesService.create(createMedicineDto);

        console.log(`Medecine crée ID: ${medecine.id}`);
        return medecine
    }   


    // PUT /medicines/:id
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateMedicineDto: UpdateMedicineDto): Promise<Medicine> {
        const medecine = await this.medicinesService.update(id, updateMedicineDto);

        console.log(`Medecine mise à jour ID: ${medecine.id}`);
        return medecine;
    }

    // DELETE /medicines/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number): Promise<void> {
        return this.medicinesService.remove(id);
    }
}
