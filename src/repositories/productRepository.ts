import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ProductRepository {
    constructor(private db: Database) {

    }

    async getAll(): Promise<any> {
        try {
            const sql = 'CALL GetAllLaptop()';
            const [results] = await this.db.query(sql, []);
            return results;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const sql = 'CALL GetLaptopById(?)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);

        }
    }


    async delete(id: string): Promise<any> {
        try {
            const sql = 'CALL HideLaptop(?)';

            await this.db.query(sql, [id]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(laptop: any): Promise<any> {
        try {
            const sql = 'CALL UpdateLaptop(?)';

            await this.db.query(sql, [laptop]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async add(laptop: any): Promise<any> {
        try {
            const sql = 'CALL AddLaptop(?)';

            await this.db.query(sql, [laptop]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}
