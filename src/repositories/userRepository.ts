import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class UserRepository {
  constructor(private db: Database) { }
  async GetUserByAccount(username: string, password: string): Promise<any> {
    try {
      const sql = 'CALL GetUserWithRoles(?,?)';
      const [results] = await this.db.query(sql, [username, password]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async Register(user: any): Promise<any> {
    try {
      const sql = 'CALL Register(?)';
      await this.db.query(sql, [user]);
      return true;
    }
    catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(search_criteria: any): Promise<any> {
    try {
      const sql = 'CALL GetUserPaging(?)';
      const [results] = await this.db.query(sql, [search_criteria]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async hide(id:string):Promise<any>{
    try{
      const sql = 'call hideUser(?)';
      await this.db.query(sql,[]);
    }
    catch(error:any){
      throw new Error(error.message);
    }

  }
}