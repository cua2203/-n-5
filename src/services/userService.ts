import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/userRepository';

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository
  ) {}
  async authenticate(username: string, password: string): Promise<any> {     
    let user = await this.userRepository.GetUserByAccount(username, password);
    // if (user) { 
    //   return {
    //     user_id: user.user_id,
    //     hoten: user.hoten,
    //     username: user.username 
    //   };
    // }
    // return null;
    return user
  }

  async Register(user:any):Promise<any>{
    return await this.userRepository.Register(user);
  }

  async getAll(search:any):Promise<any>{
    return this.userRepository.getAll(search);
  }
  async hide(id:any):Promise<any>{
    return this.userRepository.hide(id);
  }
}