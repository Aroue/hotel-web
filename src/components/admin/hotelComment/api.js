import {Server} from '@/tools/servers';

export class hotelCommentApi{


  // 获取评论列表
  static getHotelCommentList(data = {}) {
    return Server.connection('GET', '/hotelComment/A01', data)
  }

  // 删除评论信息
  static deleteHotelComment(data = {}) {
    return Server.connection('POST', '/hotelComment/A02', data)
  }


  // 添加评论信息
  static addHotelComment(data = {}) {
    return Server.connection('POST', '/hotelComment/A03', data)
  }


}
