import { ApiError } from '../exceptions.js';
import { Review } from '../db/models/review.js';
import { UserService } from './user.service.js';
import { EntityService } from './entity.service.js';
import { UserRole } from '../routes/user/user-role.enum.js';

export class ReviewService extends EntityService {
  constructor() {
    super(Review);
    this.userService = new UserService();
  }

  async findAllReviews(lawyerId) {
    return Review.query()
      .select(
        'review.id',
        'text',
        'mark',
        'clientId',
        'lawyerId',
        'user.firstName as firstName',
      )
      .from('review')
      .leftJoin('user', 'review.clientId', 'user.id')
      .where('review.lawyerId', lawyerId);
  }

  async create(payload) {
    const lawyer = await this.userService.getOne({ id: payload.lawyerId });

    if (lawyer.role !== UserRole.Lawyer) {
      throw ApiError.BadRequest('The user is not a lawyer')
    }

    if(lawyer.id === payload.clientId) {
      throw ApiError.BadRequest();
    }

    return super.create(payload);
  }
}
