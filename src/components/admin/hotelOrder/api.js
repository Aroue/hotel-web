import {Server} from '@/tools/servers';

export class hotelOrderApi{


  // 获取订单列表
  static getHotelOrderList(data = {}) {
    return Server.connection('GET', '/hotelOrder/A01', data)
  }

  // 添加订单
  static addHotelOrder(data = {}) {
    return Server.connection('POST', '/hotelOrder/A02', data)
  }

  // 获取订单信息
  static getHotelOrder(data = {}) {
    return Server.connection('GET', '/hotelOrder/A03', data)
  }

  // 修改订单信息
  static updateHotelOrder(data = {}) {
    return Server.connection('POST', '/hotelOrder/A04', data)
  }

  // 删除订单信息
  static deleteHotelOrder(data = {}) {
    return Server.connection('POST', '/hotelOrder/A05', data)
  }


}
