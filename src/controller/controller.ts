import Container, { Service } from 'typedi';
import { DataSourceImplementation } from '../datasource/datasource_implementation';
import { IResponse } from '../domain/entities/response_model';

@Service()
export class Controller {
    private dataSource: DataSourceImplementation = Container.get(DataSourceImplementation);

    async invoke(): Promise<IResponse> {
        const currentDate = await this.dataSource.getCurrentDate();

        return { current_date: currentDate };
    }
}