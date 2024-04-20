import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDTO {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;
}
