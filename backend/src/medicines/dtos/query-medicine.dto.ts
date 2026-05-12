import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryMedicineDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    limit: number = 10;

    @IsOptional()
    @IsString()
    @IsIn(['name', 'price', 'stock'])
    sortBy: 'name' | 'price' | 'stock' = 'name';

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order: 'ASC' | 'DESC' = 'ASC';

    @IsOptional()
    @IsString()
    search?: string;
}
