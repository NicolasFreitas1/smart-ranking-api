import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersParametersValidationPipe } from './pipes/players-parameters-validation.pipe';
import { PlayersService } from './players.service';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        return this.playersService.createPlayer(createPlayerDTO);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Param('id', PlayersParametersValidationPipe) id: string,
        @Body() updatePlayerDTO: UpdatePlayerDTO,
    ) {
        return this.playersService.updatePlayer(id, updatePlayerDTO);
    }

    @Get()
    async listPlayers(): Promise<Player[] | Player> {
        return this.playersService.listPlayers();
    }

    @Get(':id')
    async getPlayerById(
        @Param('id', PlayersParametersValidationPipe) id: string,
    ): Promise<Player[] | Player> {
        return this.playersService.findById(id);
    }

    @Delete(':id')
    async deletePlayer(
        @Param('id', PlayersParametersValidationPipe) id: string,
    ) {
        return this.playersService.deletePlayer(id);
    }
}
