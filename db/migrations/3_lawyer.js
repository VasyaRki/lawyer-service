export const up = (knex) => {
  return knex.schema.createTable('lawyer', (table) => {
    table.increments();
    table.string('education', 255);
    table.string('experience', 255);
    table.string('description', 255);
    table.integer('hourly_rate', 255);
    table
    .integer('userId')
    .references('user.id')
    .notNullable()
    .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('lawyer');
};
