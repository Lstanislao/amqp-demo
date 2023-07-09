import axios from 'axios';
import { Request, Response } from 'express';

export async function vpos(req: Request, res: Response) {
  try {
    console.log('Body: ', req.body);

    const { data } = await axios.post(process.env.VPOS_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        DataType: 'json',
      },
    });

    console.log('Resp:', data);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(200).json({ success: false, err: err?.message });
  }
}
