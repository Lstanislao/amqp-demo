import type { Request, Response } from 'express';
import axios from 'axios';
import { createConnection } from '../rabbitmq';

const BASE_URL = process?.env?.REST_URL || 'https://stm-api.lsports.eu';
const packageID = String(process?.env?.PREMATCH_PACKAGE)?.replaceAll('_', '');
const userName = String(process?.env?.USERNAME ?? '');
const password = String(process?.env?.PASSWORD ?? '');

export async function leagues(req: Request, res: Response) {
  try {
    console.log('leagues');
    createConnection({});
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}
