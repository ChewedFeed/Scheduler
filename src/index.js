const bugfixes = require('bugfixes')
const libs = require('chewedfeed')
const moment = require('moment')

const bugfunctions = bugfixes.functions

module.exports = (event, context, callback) => {
  let store = libs.store
  store.getFeeds((error, result) => {
    if (error) {
      bugfixes.error('Get Feeds', error)

      return callback(null, bugfunctions.lambdaError(101, {
        success: false,
        error: error
      }))
    }

    bugfixes.info('Feed Count', result.length, moment().format())

    for (let i = 0; i < result.length; i++) {
      const queue = libs.queue
      queue.feedId = result[i].feedId
      queue.addFeedId((error, result) => {
        if (error) {
          return callback(null, bugfunctions.lambdaError(101, {
            success: false,
            error: error
          }))
        }

        return callback(null, bugfunctions.lambdaResult(102, {
          success: true
        }))
      })
    }
  })
}
