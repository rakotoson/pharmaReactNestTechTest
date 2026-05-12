import { Controller, Get } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { Medicine } from './medicine.entity';

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
}
