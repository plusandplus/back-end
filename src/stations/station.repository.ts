import {
  Brackets,
  EntityRepository,
  getRepository,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ReturnStationsDto } from './dto/return-stations.dto';
import { SearchStataionDto } from './dto/search-station.dto';
import { StationStatus } from './station-status.enum';
import { Station } from './station.entity';

const ADMIN_TAKE = 10;
const SEARCH_TAKE = 10;
const LIKE_LIMIT = 5;

@EntityRepository(Station)
export class StationRepository extends Repository<Station> {
  async getOne(id: number): Promise<Station> {
    return await getRepository(Station)
      .createQueryBuilder('station')
      .select([
        'station.id',
        'station.name',
        'station.image',
        'station.content',
        'station.minprice',
        'station.maxprice',
        'station.address',
        'station.x',
        'station.y',
      ])
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.event_id', 'event')
      .leftJoinAndSelect('station.likes', 'like')
      .leftJoinAndSelect('station.rooms', 'room')
      .where('station.id = :id', { id })
      .getOne();
  }

  // 숙소 목록 조회(admin 전용, status 필터링)
  async getAll(query: SearchStataionDto): Promise<ReturnStationsDto> {
    const { status, localId, stayIds, themeIds, page, take } = query;
    const limit = take ?? ADMIN_TAKE;
    const offset = page ? ADMIN_TAKE * (page - 1) : 0;
    const result = getRepository(Station)
      .createQueryBuilder('station')
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.event_id', 'event')
      .leftJoinAndSelect('station.likes', 'like')
      .loadRelationCountAndMap('station.likesCount', 'station.likes')
      .where('1=1');

    if (status) {
      result.andWhere('station.status = :status', { status });
    }
    if (localId) {
      result.andWhere('station.local_id = :localId', { localId });
    }
    if (stayIds) {
      const stayarr = stayIds.split(',');
      result.andWhere('station.stay_id IN (:...stayIds)', { stayIds: stayarr });
    }
    if (themeIds) {
      const themearr = themeIds.split(',');
      result.andWhere('theme.id IN (:...themeIds)', { themeIds: themearr });
    }
    // result.limit(limit).offset(offset);
    console.log(result.getQuery());

    const [stations, count] = await result
      .groupBy('station.id')
      .getManyAndCount();
    return { count, stations };
  }

  // 숙소 검색 (user 전용, 검색 필터링)
  async getBySearch(query: SearchStataionDto): Promise<ReturnStationsDto> {
    const {
      localId,
      stayIds,
      themeIds,
      page,
      take,
      minprice,
      maxprice,
      checkIn,
      checkOut,
    } = query;
    const limit = take ?? SEARCH_TAKE;
    const offset = page ? SEARCH_TAKE * (page - 1) : 0;

    const result = getRepository(Station)
      .createQueryBuilder('station')
      .select([
        'station.id',
        'station.name',
        'station.image',
        'station.content',
        'station.minprice',
        'station.maxprice',
      ])
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.event_id', 'event')
      .leftJoinAndSelect('station.likes', 'like')
      .where(`station.status = '${StationStatus.ACTIVE}'`);

    if (localId) {
      result.andWhere('station.local_id = :localId', { localId });
    }
    if (stayIds) {
      const stayarr = stayIds.split(',');
      result.andWhere('station.stay_id IN (:...stayIds)', {
        stayIds: stayarr,
      });
    }
    if (themeIds) {
      const themearr = themeIds.split(',');
      result.andWhere('theme.id IN (:...themeIds)', {
        themeIds: themearr,
      });
    }
    if (maxprice) {
      console.log(maxprice);
      result.andWhere(':maxprice >= station.minprice', { maxprice });
    }
    if (minprice) {
      result.andWhere(':minprice <= station.maxprice', { minprice });
    }
    if (checkIn && !checkOut) {
      result
        .leftJoin('station.rooms', 'room')
        .leftJoin(
          (o) => {
            return o.from('order', 'o2').where(':checkIn < o2.end_date', {
              checkIn,
            });
          },
          'o',
          'station.id = o.station_id and room.id = o.room_id',
        )
        .groupBy('station.id')
        .having('count(*)-count(o.id)>0');
    }
    if (checkIn && checkOut) {
      result
        .leftJoin('station.rooms', 'room')
        .leftJoin(
          (o) => {
            return o
              .from('order', 'o2')
              .where(':checkIn < o2.end_date and :checkOut >= o2.start_date', {
                checkIn,
                checkOut,
              });
          },
          'o',
          'station.id = o.station_id and room.id = o.room_id',
        )
        .groupBy('station.id')
        .having('count(*)-count(o.id)>0');
    }
    // result.limit(limit).offset(offset);
    console.log(result.getQuery());
    const [stations, count] = await result.getManyAndCount();
    return { count, stations };
  }

  async getByLikeCount(): Promise<Station[]> {
    return await getRepository(Station)
      .createQueryBuilder('station')
      .select([
        'station.id',
        'station.name',
        'station.image',
        'station.content',
        'station.minprice',
        'station.maxprice',
      ])
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.event_id', 'event')
      .leftJoinAndSelect('station.likes', 'like')
      .loadRelationCountAndMap('station.likesCount', 'station.likes')
      .where(`station.status = '${StationStatus.ACTIVE}'`)
      .groupBy('station.id')
      .orderBy('COUNT(like.id)', 'DESC')
      .limit(LIKE_LIMIT)
      .getMany();
  }

  async getByEventId(id: number): Promise<Station[]> {
    return await getRepository(Station)
      .createQueryBuilder('station')
      .select([
        'station.id',
        'station.name',
        'station.image',
        'station.content',
        'station.minprice',
        'station.maxprice',
      ])
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.event_id', 'event')
      .leftJoinAndSelect('station.likes', 'like')
      .where(`station.status = '${StationStatus.ACTIVE}'`)
      .andWhere('station.event_id = :eventId', { eventId: id })
      .getMany();
  }
}
