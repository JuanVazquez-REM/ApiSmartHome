'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
  up () {
    this.collection('devices', (collection) => {
      collection.index('nombre_index_unique', {nombre: 1}, {unique: true})
      collection.index('pin_index_unique', {pin: 1}, {unique: true})
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DeviceSchema
