/* global it, describe */
require('dotenv').config()
const bugfixes = require('bugfixes')

const expect = require('chai').expect

const underTest = require('../src/index')

const payLoad = {
  "account": "123456789012",
  "region": "us-east-1",
  "detail": {},
  "detail-type": "Scheduled Event",
  "source": "aws.events",
  "time": "1970-01-01T00:00:00Z",
  "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
  "resources": [
    "arn:aws:events:us-east-1:123456789012:rule/my-schedule"
  ]
}

describe('Feed Parser', () => {
  it('it should get the feeds that havent been updated', (done) => {
    underTest(payLoad, console, (error, result) => {
      if (error) {
        done(Error(error))
      }

      expect(result).to.be.an('object')
      expect(result).to.have.property('body')

      let resultObj = JSON.parse(result.body)
      expect(resultObj).to.have.property('message')
      expect(resultObj.message).to.have.property('success')
      expect(resultObj.message.success).to.be.equal(true)

      done()
    })
  })
})