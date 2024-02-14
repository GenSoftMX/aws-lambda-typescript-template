import { Knex } from 'knex';
import Container, { Service } from 'typedi';
import { PgDataSource } from '../domain/adapters/pg.datasource.adapter';
@Service()
export class DataSourceImplementation implements PgDataSource {

    knex: Knex = Container.get<Knex>('pgKnex');
    async test(): Promise<void> {
        console.log("DataSourceImplementation");
    }

}