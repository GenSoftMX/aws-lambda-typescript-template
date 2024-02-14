import { knex } from 'knex';
import { Client } from 'pg';
import Container from 'typedi';

export class PGLoader {

    static async invoke() {

        const credentials = {
            host: process.env.HOST!,
            user: process.env.PGUSER!,
            password: process.env.PGPASSWORD!,
            database: process.env.PGDATABASE!,
            port: Number.parseInt(process.env.PGPORT!)
        }

        const pgKnex = knex({
            client: 'pg',
            connection: credentials,
            pool: { min: 1, max: 5 },
            useNullAsDefault: true
        })

        Container.set('pgKnex', pgKnex);
    }
}
