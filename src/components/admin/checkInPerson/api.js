import {Server} from '@/tools/servers';

export class checkInPersonApi{


  // 获取入住人列表
  static getCheckInPersonList(data = {}) {
    return Server.connection('GET', '/checkInPerson/A01', data)
  }

  // 删除入住人信息
  static deleteCheckInPerson(data = {}) {
    return Server.connection('POST', '/checkInPerson/A02', data)
  }


  // 添加入住人信息
  static addCheckInPerson(data = {}) {
    return Server.connection('POST', '/checkInPerson/A03', data)
  }

  // 添加订单入住人信息
  static getOrderCheckInPersonList(data = {}) {
    return Server.connection('GET', '/checkInPerson/A04', data)
  }

  // 添加订单入住人信息
  static getCheckInPerson(data = {}) {
    return Server.connection('GET', '/checkInPerson/A05', data)
  }


}
