import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'brunofernando123',
    database: 'taskejemplo',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}