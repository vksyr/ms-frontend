import formatHelper from '../helpers/formatHelper'
import httpHelper from '../helpers/httpHelper'

import roomData from '../mock_data/rooms.json'

const baseServiceUrl = process.env.VUE_APP_BASE_URL

export default {
  async getSites() {
    let url = new URL('site', formatHelper.formatUrl(baseServiceUrl))
    let { status, data } = await httpHelper.sendGetRequest(url)

    return {
      httpStatus: status,
      data: data
    }
  },
  async getBuildings(siteId) {
    let url = new URL('building', formatHelper.formatUrl(baseServiceUrl))

    if (siteId !== undefined) {
      url.searchParams.append('siteId', siteId)
    }

    let { status, data } = await httpHelper.sendGetRequest(url)

    return {
      httpStatus: status,
      data: data
    }
  },
  async getRooms(/*buildingId*/) {
    // let url = new URL('room', formatHelper.formatUrl(baseServiceUrl))

    // if (buildingId !== undefined) {
    //   url.searchParams.append('buildingId', buildingId)
    // }

    // let { status, data } = await httpHelper.sendGetRequest(url)

    return {
      httpStatus: 200,
      data: roomData
    }
  }
}
