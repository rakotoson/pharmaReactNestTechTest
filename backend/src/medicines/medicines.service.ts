import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './medicine.entity';

@Injectable()
export class MedicinesService {
    constructor(
        @InjectRepository(Medicine)
        private readonly repo: Repository<Medicine>
    ) {}
}
