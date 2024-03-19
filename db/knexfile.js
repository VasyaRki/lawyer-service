import { DB_CONNECTION } from '../environment.js';

export default {
  development: {
    client: 'pg',
    debug: true,
    connection: DB_CONNECTION,
  },
};
