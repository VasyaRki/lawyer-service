import { User } from '../db/models/user.js';
import { EntityService } from './entity.service.js';
import { UserRole } from '../routes/user/user-role.enum.js';

export class UserService extends EntityService {
  constructor() {
    super(User);
  }

  async findAllLawyers(filter) {
    const query = User.query();

    query.select(
      'role',
      'email',
      'phone',
      'public.user.id',
      'avatar',
      'lastName',
      'firstName',
      'middleName',
      'lawyer.hourly_rate',
      User.raw('COALESCE(AVG(review.mark), 0) AS "averageMark"'),
    );

    query.from('public.user');
    query.leftJoin('review', 'review.lawyerId', 'public.user.id');
    query.leftJoin('lawyer', 'lawyer.userId', 'public.user.id');
    query.where('public.user.role', UserRole.Lawyer);

    if (filter.search) {
      query.andWhere((qB) =>
        qB
          .orWhere('email', 'ilike', `%${filter.search}%`)
          .orWhere('phone', 'ilike', `%${filter.search}%`)
          .orWhere('firstName', 'ilike', `%${filter.search}%`)
          .orWhere('lastName', 'ilike', `%${filter.search}%`)
          .orWhere('middleName', 'ilike', `%${filter.search}%`),
      );
    }

    const order = filter.order || 'ASC';
    const orderField = filter.orderField;

    query.groupBy('public.user.id', 'lawyer.userId', 'lawyer.hourly_rate');

    if (order && orderField) {
      query.orderBy(orderField, order);
    }

    return query;
  }
}
