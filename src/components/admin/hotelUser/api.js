import {Server} from '@/tools/servers';

export class hotelUserApi{


  // 获取用户列表
  static getUserList(data = {}) {
    return Server.connection('GET', '/hotelUser/A01', data)
  }

  // 获取用户信息
  static getUser(data = {}) {
    return Server.connection('GET', '/hotelUser/A02', data)
  }

  // 修改用户信息
  static updateUser(data = {}) {
    return Server.connection('POST', '/hotelUser/A03', data)
  }

  // 修改用户信息
  static login(data = {}) {
    return Server.connection('POST', '/hotelUser/A04', data)
  }

  // 用户注册
  static Register(data = {}) {
    return Server.connection('POST', '/hotelUser/A05', data)
  }


}
