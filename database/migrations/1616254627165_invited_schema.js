'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvitedSchema extends Schema {
  up () {
    this.collection('inviteds', (collection) => {
      collection.index('nombre_index_unique', {nombre: 1}, {unique: true})
    })
  }

  down () {
    this.drop('inviteds')
  }
}

module.exports = InvitedSchema
