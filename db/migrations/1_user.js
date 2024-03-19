import { UserRole } from '../../routes/user/user-role.enum.js'

export const up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('email', 255).unique();
    table.string('phone', 50).unique();
    table.string('hashPassword', 255).notNullable();
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('middleName', 255).notNullable();
    table
      .enu('role', [UserRole.Admin, UserRole.Lawyer, UserRole.User], {
        useNative: true,
        enumName: 'userRoleEnum',
      })
      .notNullable();
    table.string('avatar');
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('user');
};
