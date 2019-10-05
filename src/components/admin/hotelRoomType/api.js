import {Server} from '@/tools/servers';

export class hotelRoomTypeApi{


  // 获取房型列表
  static getRoomTypeList(data = {}) {
    return Server.connection('GET', '/hotelRoomType/A01', data)
  }

  // 添加房型
  static addRoomType(data = {}) {
    return Server.connection('POST', '/hotelRoomType/A02', data)
  }

  // 获取房型信息
  static getRoomType(data = {}) {
    return Server.connection('GET', '/hotelRoomType/A03', data)
  }

  // 修改房型信息
  static updateRoomType(data = {}) {
    return Server.connection('POST', '/hotelRoomType/A04', data)
  }

  // 删除房型信息
  static deleteRoomType(data = {}) {
    return Server.connection('POST', '/hotelRoomType/A05', data)
  }


}
