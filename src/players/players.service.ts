import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createAndUpdatePlayer(
        createPlayerDTO: CreatePlayerDTO,
    ): Promise<void> {
        const usersAlreadyExists = this.players.find(
            (player) => player.email === createPlayerDTO.email,
        );

        if (usersAlreadyExists) {
            return this.update(usersAlreadyExists, createPlayerDTO);
        }

        this.create(createPlayerDTO);
    }

    async listPlayers(): Promise<Player[]> {
        return this.players;
    }

    async findByEmail(email: string): Promise<Player> {
        const player = this.players.find((player) => player.email === email);

        if (!player) {
            throw new NotFoundException(
                `Player with email: ${email}, not found`,
            );
        }

        return player;
    }

    async deletePlayer(email: string): Promise<void> {
        const playerExists = this.players.find(
            (player) => player.email === email,
        );

        if (!playerExists) {
            throw new NotFoundException(
                `Player with email: ${email}, not found`,
            );
        }

        this.players = this.players.filter(
            (player) => player.email !== playerExists.email,
        );
    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const { email, name, phoneNumber } = createPlayerDTO;

        const player: Player = {
            _id: randomUUID(),
            email,
            name,
            phoneNumber,
            ranking: 'A',
            photoUrl: '',
            rankingPosition: 1,
        };

        this.logger.log(`Create player dto: ${JSON.stringify(player)}`);

        this.players.push(player);
    }

    private update(player: Player, createPlayerDTO: CreatePlayerDTO): void {
        const { name } = createPlayerDTO;

        player.name = name;
    }
}
