import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel('Player') private readonly playerModel: Model<Player>,
    ) {}

    async createAndUpdatePlayer(
        createPlayerDTO: CreatePlayerDTO,
    ): Promise<Player> {
        const { email } = createPlayerDTO;

        const usersAlreadyExists = await this.playerModel
            .findOne({ email })
            .exec();

        if (usersAlreadyExists) {
            return this.update(createPlayerDTO);
        }

        this.create(createPlayerDTO);
    }

    async listPlayers(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    async findByEmail(email: string): Promise<Player> {
        const player = await this.playerModel.findOne({ email }).exec();

        if (!player) {
            throw new NotFoundException(
                `Player with email: ${email}, not found`,
            );
        }

        return player;
    }

    async deletePlayer(email: string): Promise<any> {
        return this.playerModel.deleteOne({ email }).exec();
    }

    private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const createdPlayer = new this.playerModel(createPlayerDTO);

        return createdPlayer.save();
    }

    private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        return this.playerModel
            .findOneAndUpdate(
                { email: createPlayerDTO.email },
                { $set: createPlayerDTO },
            )
            .exec();
    }
}
