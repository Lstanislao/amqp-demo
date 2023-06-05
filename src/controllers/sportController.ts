import type { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = process?.env?.REST_URL || 'https://stm-api.lsports.eu';
const packageID = String(process?.env?.PREMATCH_PACKAGE)?.replaceAll('_', '');
const userName = String(process?.env?.USERNAME ?? '');
const password = String(process?.env?.PASSWORD ?? '');

export async function sports(req: Request, res: Response) {
  try {
    const { data } = await axios.post(`${BASE_URL}/Sports/Get`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Sports?.map((sport: Record<string, any>) => ({
          id: sport?.Id ?? '',
          name: sport?.Name ?? '',
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}
