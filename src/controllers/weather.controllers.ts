import { Request, Response, NextFunction } from 'express';
import { getWeatherFor } from '../services/weather.service';

export const obtenerClima = async (req: Request, res: Response) => {
  const city = String(req.query.city || '');
  const date = String(req.query.date || '');
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (!city && (!lat || !lon)) {
    return res.status(400).json({
      status: 'error',
      message: 'Se requiere una ciudad o las coordenadas (lat, lon)',
    });
  }
  try {
    const resultado = await getWeatherFor({ city, date, lat, lon });

    if (!resultado.found) {
      return res
        .status(404)
        .json({ status: 'error', message: resultado.message });
    }

    return res.status(200).json({ status: 'success', data: resultado });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Error al obtener el clima' });
  }
};
