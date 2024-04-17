import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { EnvService } from './env/env.service';
import { EnvModule } from './env/env.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory(env: EnvService) {
                return { uri: env.get('DATABASE_URL') };
            },
        }),
        PlayersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
