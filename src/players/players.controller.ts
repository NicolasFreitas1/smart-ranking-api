import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
    @Post()
    async createAndUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        const { email, name, phoneNumber } = createPlayerDTO;

        return {
            email,
            name,
            phoneNumber,
        };
    }
}
