import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private playersService: PlayersService) {}

    @Post()
    async createAndUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.playersService.createAndUpdatePlayer(createPlayerDTO);
    }

    @Get()
    async listPlayers(
        @Query('email') email: string,
    ): Promise<Player[] | Player> {
        if (email) {
            return this.playersService.findByEmail(email);
        }

        return this.playersService.listPlayers();
    }

    @Delete()
    async deletePlayer(@Query('email') email: string) {
        return this.playersService.deletePlayer(email);
    }
}
