import type { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = process?.env?.REST_URL || 'https://stm-api.lsports.eu';
const packageID = String(process?.env?.PREMATCH_PACKAGE)?.replaceAll('_', '');
const userName = String(process?.env?.USERNAME ?? '');
const password = String(process?.env?.PASSWORD ?? '');

export async function markets(req: Request, res: Response) {
  try {
    const locationsIds =
      req?.body?.locations
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const sportIds =
      req?.body?.sports
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const leaguesId =
      req?.body?.leagues
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const { data } = await axios.post(`${BASE_URL}/Markets/Get`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
      LocationsId: locationsIds,
      SportsId: sportIds,
      SubscriptionStatus: 2,
      LeaguesId: leaguesId,
      IsSettleable: 1,
      MarketType: 0,
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Markets?.map((market: Record<string, any>) => ({
          id: market?.Id ?? '',
          name: market?.Name ?? '',
          isSettleable: market?.IsSettleable ?? false,
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}
