import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const useDailyVerse = () => {
  const [verse, setVerse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        // Random verse between 1 and 6236
        const random = Math.floor(Math.random() * 6236) + 1;
        const response = await fetch(`${BASE_URL}/ayah/${random}/editions/quran-uthmani,fa.makarem`);
        const data = await response.json();
        
        if (data.code === 200) {
          setVerse({
            arabic: data.data[0],
            persian: data.data[1],
            surah: data.data[0].surah
          });
        } else {
          setError('Failed to fetch verse');
        }
      } catch (err) {
        setError('Error connecting to API');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  return { verse, loading, error };
};

export const useSurahs = () => {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/surah`);
        const data = await response.json();
        if (data.code === 200) {
          setSurahs(data.data);
        } else {
          setError('Failed to fetch surahs');
        }
      } catch (err) {
        setError('Error connecting to API');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  return { surahs, loading, error };
};
