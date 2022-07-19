import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ReturnStationsDto } from './dto/return-stations.dto';
import { SearchStataionDto } from './dto/search-station.dto';
import { StationStatus } from './station-status.enum';
import { Station } from './station.entity';

@EntityRepository(Station)
export class StationRepository extends Repository<Station> {
  async getOne(id: number): Promise<Station> {
    const result = await getRepository(Station)
      .createQueryBuilder('station')
      .leftJoinAndSelect('station.likes', 'like')
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.themes', 'theme')
      .where('station.id = :id', { id })
      .getOne();
    return result;
  }

  // 숙소 목록 조회(admin 전용, status 필터링)
  async getAll(query: SearchStataionDto): Promise<ReturnStationsDto> {
    const { status, localId, stayIds, themeIds, page, take } = query;

    const result = getRepository(Station)
      .createQueryBuilder('station')
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.likes', 'like')
      .addSelect('COUNT(like.station_id) AS like_cnt')
      .where('1=1');

    if (status) {
      result.andWhere(`station.status = '${status}'`);
    }
    if (localId) {
      result.andWhere('station.local_id = :localId', { localId });
    }
    if (stayIds) {
      result.andWhere(`station.stay_id IN (${stayIds})`);
    }
    if (themeIds) {
      result.andWhere(`theme.id IN (${themeIds})`);
    }
    result.limit(take ?? 5).offset(page ? 5 * (page - 1) : 0);
    console.log(result.getQuery());

    const stations = await result.groupBy('station.id').getRawMany();
    const count = await result.getCount();
    return { count, stations };
  }

  // 숙소 검색 (user 전용, 검색필터링)
  async getBySearch(query: SearchStataionDto): Promise<ReturnStationsDto> {
    const { localId, stayIds, themeIds, page, take, minprice, maxprice } =
      query;

    const result = getRepository(Station)
      .createQueryBuilder('station')
      .select([
        'station.id',
        'station.name',
        'station.image',
        'station.content',
        'station.minprice',
        'station.maxprice',
        'local.name',
        'stay.name',
        'COUNT(like.station_id) AS like_cnt',
      ])
      .leftJoinAndSelect('station.local_id', 'local')
      .leftJoinAndSelect('station.stay_id', 'stay')
      .leftJoinAndSelect('station.themes', 'theme')
      .leftJoinAndSelect('station.likes', 'like')
      .where(`station.status = '${StationStatus.ACTIVE}'`);

    if (localId) {
      result.andWhere('station.local_id = :localId', { localId });
    }
    if (stayIds) {
      result.andWhere(`station.stay_id IN (${stayIds})`);
    }
    if (themeIds) {
      result.andWhere(`theme.id IN (${themeIds})`);
    }
    if (maxprice) {
      console.log(maxprice);
      result.andWhere(`${maxprice}>=station.minprice`);
    }
    if (minprice) {
      result.andWhere(`${minprice}<=station.maxprice`);
    }
    result.limit(take ?? 5).offset(page ? 5 * (page - 1) : 0);
    console.log(result.getQuery());

    const stations = await result.groupBy('station.id').getRawMany();
    const count = await result.getCount();
    return { count, stations };
  }
}
