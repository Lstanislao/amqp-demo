import type { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = process?.env?.REST_URL || 'https://stm-api.lsports.eu';
const packageID = String(process?.env?.PREMATCH_PACKAGE)?.replaceAll('_', '');
const userName = String(process?.env?.USERNAME ?? '');
const password = String(process?.env?.PASSWORD ?? '');

export async function subscribe(req: Request, res: Response) {
  try {
    const subscriptions =
      req?.body?.subscriptions?.map((subscription: Record<string, any>) => ({
        SportId: subscription?.sport ?? '',
        LocationId: subscription?.location ?? '',
        CompetitionId: subscription?.competition ?? '',
      })) ?? [];
    const { data } = await axios.post(`${BASE_URL}/Outright/Subscribe`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
      Subscriptions: subscriptions,
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Subscription?.map((subscription: Record<string, any>) => ({
          competition: subscription?.ComptitionId ?? '',
          sport: subscription?.SportId ?? '',
          location: subscription?.LocationId ?? '',
          success: subscription?.Success ?? false,
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}

export async function unsubscribe(req: Request, res: Response) {
  try {
    const subscriptions =
      req?.body?.subscriptions?.map((subscription: Record<string, any>) => ({
        SportId: subscription?.sport ?? '',
        LocationId: subscription?.location ?? '',
        CompetitionId: subscription?.competition ?? '',
      })) ?? [];
    const { data } = await axios.post(`${BASE_URL}/Outright/Unsubscribe`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
      Subscriptions: subscriptions,
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Subscription?.map((subscription: Record<string, any>) => ({
          competition: subscription?.ComptitionId ?? '',
          sport: subscription?.SportId ?? '',
          location: subscription?.LocationId ?? '',
          success: subscription?.Success ?? false,
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}

export async function competitions(req: Request, res: Response) {
  try {
    const locationsIds =
      req?.body?.locations
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const sportIds =
      req?.body?.sports
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const { data } = await axios.post(`${BASE_URL}/Outright/GetCompetitions`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
      LocationIds: locationsIds,
      SportIds: sportIds,
      SubscriptionStatus: '2',
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Competitions?.map((competition: Record<string, any>) => ({
          id: competition?.Id ?? '',
          name: competition?.Name ?? '',
          type: competition?.Type ?? '1',
          trackId: competition?.TrackId ?? '',
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}

export async function tracks(req: Request, res: Response) {
  try {
    const locationsIds =
      req?.body?.locations
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const sportIds =
      req?.body?.sports
        ?.map((id: any) => (Number.isNaN(Number(id)) ? null : Number(id)))
        ?.filter((x: any) => x !== null) ?? [];
    const { data } = await axios.post(`${BASE_URL}/Outright/GetAllTracks`, {
      PackageId: packageID,
      UserName: userName,
      Password: password,
      LocationIds: locationsIds,
      SportIds: sportIds,
      SubscriptionStatus: '2',
    });
    res.status(200).json({
      success: true,
      data:
        data?.Body?.Tracks?.map((league: Record<string, any>) => ({
          id: league?.Id ?? '',
          name: league?.Name ?? '',
        })) ?? [],
    });
  } catch (err) {
    res.status(200).json({ success: false, err: err?.message });
  }
}
