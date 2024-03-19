export const up = (knex) => {
  return knex.schema.createTable('review', (table) => {
    table.increments('id').primary();
    table.text('text').notNullable();
    table.integer('mark').notNullable();
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
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('review');
};
