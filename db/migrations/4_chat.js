import { ChatStatus } from '../../routes/chat/chat-status.enum.js';

export const up = (knex) => {
  return knex.schema.createTable('chat', (table) => {
    table.increments();
    table.string('subject', 255);
    table
      .integer('clientId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('lawyerId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .enu('status', [ChatStatus.Awaiting , ChatStatus.Completed, ChatStatus.InProcess], {
        useNative: true,
        enumName: 'chatStatusEnum',
      })
      .notNullable();
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('user');
};
