import axios from 'axios';

// Tipo para el objeto de geolocalización
type Geo = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
} | null;

/**
 * Convierte coordenadas (lat, lon) en un nombre de ciudad y país.
 */
async function reverseGeocode(lat: number, lon: number): Promise<Geo> {
  // servicio gratuito que no requiere clave de API para esto.
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;

  try {
    const { data } = await axios.get<{
      city?: string;
      locality?: string;
      countryName?: string;
    }>(url);
    // Si la API devuelve una ciudad, la usamos. De lo contrario, usamos un nombre genérico.
    const cityName = data.city || data.locality || 'Ubicación cercana';

    return {
      latitude: lat,
      longitude: lon,
      // Aseguramos que 'name' y 'country' sean strings, incluso si la API devuelve undefined.
      // Esto es importante porque 'data.city' y 'data.locality' pueden ser undefined.
      name: cityName,
      country: data.countryName || '',
    };
  } catch (error) {
    console.error('Error en la geocodificación inversa:', error);
    // Si la API de geocodificación inversa falla, volvemos a un nombre genérico.
    return {
      latitude: lat,
      longitude: lon,
      name: 'Ubicación actual',
      country: '',
    };
  }
}

/**
 * Busca las coordenadas de una ciudad por su nombre utilizando la API de Open-Meteo.
 */
async function geocodeCity(city: string): Promise<Geo> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=10&language=es&format=json`;

  try {
    const { data } = await axios.get<{
      results?: {
        latitude: number;
        longitude: number;
        name: string;
        country: string;
        country_code: string;
      }[];
    }>(url);

    if (!data.results || data.results.length === 0) {
      return null;
    }

    const paraguayanCity = data.results.find(
      (result) => result.country_code === 'PY'
    );
    const result = paraguayanCity || data.results[0];

    if (result) {
      return {
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.name,
        country: result.country,
      };
    }
    return null;
  } catch (error) {
    console.error('Error al llamar a la API de geocodificación:', error);
    return null;
  }
}

/**
 * Formatea una cadena de fecha a 'YYYY-MM-DD'.
 */
function formatDateUTC(dateStr: string): string {
  const d = new Date(dateStr);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

type WeatherParams = {
  city?: string;
  date: string;
  lat?: number;
  lon?: number;
};

/**
 * Obtiene los datos del clima para una ubicación.
 */
export async function getWeatherFor(params: WeatherParams) {
  let locationData: Geo = null;

  if (params.lat && params.lon) {
    locationData = await reverseGeocode(params.lat, params.lon);
  } else if (params.city) {
    locationData = await geocodeCity(params.city);
  }

  if (!locationData) {
    return { found: false, message: 'Ubicación no encontrada' };
  }

  const date = formatDateUTC(params.date);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&start_date=${date}&end_date=${date}`;

  const { data: weatherData } = await axios.get<{
    daily?: {
      time: string[];
      weathercode: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_sum: number[];
    };
  }>(url);

  if (
    !weatherData.daily ||
    !weatherData.daily.time ||
    weatherData.daily.time.length === 0
  ) {
    return { found: false, message: 'Sin datos de clima para la ubicación' };
  }

  const locationName = `${locationData.name}, ${locationData.country}`;

  return {
    found: true,
    location: locationName,
    date: weatherData.daily.time[0],
    weathercode: weatherData.daily.weathercode[0],
    tmax: weatherData.daily.temperature_2m_max[0],
    tmin: weatherData.daily.temperature_2m_min[0],
    precipitation: weatherData.daily.precipitation_sum[0],
  };
}
