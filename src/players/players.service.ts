import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel('Player') private readonly playerModel: Model<Player>,
    ) {}

    async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const { email } = createPlayerDTO;

        const usersAlreadyExists = await this.playerModel
            .findOne({ email })
            .exec();

        if (usersAlreadyExists) {
            throw new ConflictException(
                `Player with email: ${email}, already exist`,
            );
        }

        const createdPlayer = new this.playerModel(createPlayerDTO);

        return createdPlayer.save();
    }

    async updatePlayer(
        id: string,
        updatePlayerDTO: UpdatePlayerDTO,
    ): Promise<Player> {
        const usersAlreadyExists = await this.playerModel
            .findOne({ _id: id })
            .exec();

        if (!usersAlreadyExists) {
            throw new NotFoundException(`Player with id: ${id}, not found`);
        }
        return this.playerModel
            .findOneAndUpdate({ _id: id }, { $set: updatePlayerDTO })
            .exec();
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

    async findById(id: string): Promise<Player> {
        const player = await this.playerModel.findOne({ _id: id }).exec();

        if (!player) {
            throw new NotFoundException(`Player with id: ${id}, not found`);
        }

        return player;
    }

    async deletePlayer(id: string): Promise<any> {
        const player = await this.playerModel.findOne({ _id: id }).exec();

        if (!player) {
            throw new NotFoundException(`Player with id: ${id}, not found`);
        }

        return this.playerModel.deleteOne({ _id: id }).exec();
    }
}
