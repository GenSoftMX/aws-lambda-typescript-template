import { Knex } from 'knex';
import Container, { Service } from 'typedi';
import { PgDataSource } from '../domain/adapters/pg.datasource.adapter';
import { QueryDateException } from "../exceptions/query_date_exception";
@Service()
export class DataSourceImplementation implements PgDataSource {

    knex: Knex = Container.get<Knex>('pgKnex');
    async getCurrentDate(): Promise<String> {
        const intentToGetDate = await this.knex.raw('SELECT NOW()');
        if (intentToGetDate.rowCount == 0) {
            throw new QueryDateException("Can't get CURRENT DATE from server");
        }

        return intentToGetDate.rows[0]['now'];
    }
}