import $ from 'jquery'
//import cookieHelper from './cookieHelper'

export default {
  async sendGetRequest(url) {
    let responseObject = {
      status: null,
      data: {}
    }

    //let authToken = cookieHelper.getCookie('auth-token')
    //let authHeader = ''

    //if (authToken && authToken.length > 0) {
    //  authHeader = `Bearer ${authToken}`
    //}

    try {
      await $.get({
        url: url,
        //headers: {
        //  Authorization: authHeader
        //},
        contentType: 'application/json',
        crossDomain: true
      })
        // eslint-disable-next-line no-unused-vars
        .done(function (data, textStatus, jqxhr) {
          responseObject.data = data
          responseObject.status = jqxhr.status
        })
        // eslint-disable-next-line no-unused-vars
        .fail(function (jqxhr, textStatus, errorThrown) {
          responseObject.data = []
          responseObject.status = jqxhr.status
        })
    } catch (e) {
      // Do nothing
    }

    return responseObject
  },
  async sendPostRequest(url, payload) {
    let responseObject = {
      status: null,
      data: {}
    }

    //let authToken = cookieHelper.getCookie('auth-token')
    //let authHeader = ''

    //if (authToken && authToken.length > 0) {
    //  authHeader = `Bearer ${authToken}`
    //}

    try {
      await $.post({
        url: url,
        //headers: {
        //  Authorization: authHeader
        //},
        data: JSON.stringify(payload),
        contentType: 'application/json',
        crossDomain: true
      })
        // eslint-disable-next-line no-unused-vars
        .done(function (data, textStatus, jqxhr) {
          responseObject.data = data
          responseObject.status = jqxhr.status
        })
        // eslint-disable-next-line no-unused-vars
        .fail(function (jqxhr, textStatus, errorThrown) {
          responseObject.data = []
          responseObject.status = jqxhr.status
        })
    } catch (e) {
      // Do nothing
    }

    return responseObject
  }
}
