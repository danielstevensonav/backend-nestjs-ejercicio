import { IsNotEmpty } from 'class-validator';

export class CreateTareaDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}