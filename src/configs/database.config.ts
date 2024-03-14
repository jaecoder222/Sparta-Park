import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    //entities: [UsersModel],
    autoLoadEntities: true, //entity를 등록하지 않아도 자동적으로 불러온다.
    synchronize: configService.get('DB_SYNC'),
    logging: true, // DB에서 query가 발생할때마다 rawquery가 출력된다.
  }),
  inject: [ConfigService],
};
