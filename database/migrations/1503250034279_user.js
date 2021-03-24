'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.collection('users', (collection) => {
      collection.index('user_id_index_unique', {user_id: 1}, {unique: true})
      collection.index('email_index_unique', {email: 1}, {unique: true})
      collection.index('nombre_index_unique', {nombre: 1}, {unique: true})
      collection.index('pin_index_unique',{pin: 1}, {unique: true})
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
