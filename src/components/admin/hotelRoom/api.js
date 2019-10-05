import {Server} from '@/tools/servers';

export class hotelRoomApi{


  // 获取房间列表
  static getHotelRoomList(data = {}) {
    return Server.connection('GET', '/hotelRoom/A01', data)
  }

  // 添加房间
  static addHotelRoom(data = {}) {
    return Server.connection('POST', '/hotelRoom/A02', data)
  }

  // 获取房间信息
  static getHotelRoom(data = {}) {
    return Server.connection('GET', '/hotelRoom/A03', data)
  }

  // 修改房间信息
  static updateHotelRoom(data = {}) {
    return Server.connection('POST', '/hotelRoom/A04', data)
  }

  // 删除房间信息
  static deleteHotelRoom(data = {}) {
    return Server.connection('POST', '/hotelRoom/A05', data)
  }


}
