export const up = (knex) => {
  return knex.schema.createTable('message', (table) => {
    table.increments();
    table.string('text', 255);
    table
      .integer('chatId')
      .references('chat.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('lawyerId')
      .references('user.id')
      .onDelete('CASCADE');
    table
      .integer('clientId')
      .references('user.id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('user');
};
