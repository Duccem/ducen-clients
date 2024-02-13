import { Logger, MongoConnection, MongoRepository, Primitives, Uuid } from 'core';
import { Rating } from '../../../domain/Rating';
import { RatingRepository } from '../../../domain/RatingRepository';

export class MongoRatingRepository extends MongoRepository<Rating> implements RatingRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Rating, connection, logger);
  }
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async save(rating: Rating): Promise<void> {
    await this.persist(rating.id.value, rating);
  }
  async findDoctorRatings(doctorId: Uuid): Promise<Rating[]> {
    const response = await this.collection
      .find<Primitives<Rating>>({ doctorId: doctorId.value })
      .toArray();
    return response.map((rating) => Rating.fromPrimitives(rating));
  }
}
