import type { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = process?.env?.REST_URL || 'https://stm-api.lsports.eu';
const packageID = String(process?.env?.PREMATCH_PACKAGE)?.replaceAll('_', '');
const userName = String(process?.env?.USERNAME ?? '');
const password = String(process?.env?.PASSWORD ?? '');

export async function schedules(req: Request, res: Response) {
  try {
    const locationsIds =
      req?.body?.locations
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const sportIds =
      req?.body?.sports
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const { data } = await axios.post(`${BASE_URL}/Schedule/Get`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
      LocationIds: locationsIds,
      SportIds: sportIds,
      SubscriptionStatus: 2,
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Leagues?.map((league: Record<string, any>) => ({
          id: league?.Id ?? '',
          name: league?.Name ?? '',
          season: league?.Season ?? '',
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}
