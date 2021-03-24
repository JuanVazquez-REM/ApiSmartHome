'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuestsSchema extends Schema {
  up () {
    this.collection('guests', (collection) => {
      collection.index('nombre_index_unique', {nombre: 1}, {unique: true})
    })
  }

  down () {
    this.drop('guests')
  }
}

module.exports = GuestsSchema
