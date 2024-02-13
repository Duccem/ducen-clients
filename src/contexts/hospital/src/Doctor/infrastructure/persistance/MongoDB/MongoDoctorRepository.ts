import { Criteria, Logger, MongoConnection, MongoRepository, Primitives } from 'core';
import { Doctor } from '../../../domain/Doctor';
import { DoctorRepository } from '../../../domain/DoctorRepository';
import { MongoRatingRepository } from './MongoRatingRepository';

export class MongoDoctorRepository extends MongoRepository<Doctor> implements DoctorRepository {
  private ratingRepository: MongoRatingRepository;
  constructor(connection: MongoConnection, logger: Logger) {
    super(Doctor, connection, logger);
    this.ratingRepository = new MongoRatingRepository(connection, logger);
  }

  async index(): Promise<void> {
    await this.collection.createIndex({ '$consultingRoomAddress.coordinates': '2dsphere' });
    await this.ratingRepository.index();
  }
  async save(doctor: Doctor): Promise<void> {
    const { ratings, ...data } = doctor.toPrimitives();
    await this.collection.updateOne({ id: doctor.id.value }, { $set: data }, { upsert: true });
    await Promise.allSettled(doctor.ratings.map((rating) => this.ratingRepository.save(rating)));
  }
  async findDoctorByCriteria(criteria: Criteria): Promise<Doctor> {
    const { filter } = this.converter.Criteria(criteria);
    const response = await this.collection.findOne<Primitives<Doctor>>(filter);
    if (response) {
      const doctor = Doctor.fromPrimitives(response);
      const ratings = await this.ratingRepository.findDoctorRatings(doctor.id);
      doctor.ratings = ratings;
      return doctor;
    }
    return null;
  }
  async listDoctorsByCriteria(criteria: Criteria): Promise<Doctor[]> {
    const response = await this.searchByCriteria(criteria);
    return response.map((doctor) => Doctor.fromPrimitives(doctor));
  }

  async findNearDoctors(
    latitude: number,
    longitude: number,
    maxDistance: number
  ): Promise<Doctor[]> {
    const response = await this.collection
      .find<Primitives<Doctor>>({
        '$consultingRoomAddress.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        },
      })
      .toArray();
    return response.map((doctor) => Doctor.fromPrimitives(doctor));
  }
}
