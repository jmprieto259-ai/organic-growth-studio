import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ContentMap {
  [section: string]: {
    [field: string]: string;
  };
}

interface ImageMap {
  [section: string]: {
    [field: string]: string;
  };
}

async function fetchSiteContent(): Promise<ContentMap> {
  const { data, error } = await supabase
    .from('site_content')
    .select('section, field, value');
  if (error) throw error;
  const map: ContentMap = {};
  (data || []).forEach((row: any) => {
    if (!map[row.section]) map[row.section] = {};
    map[row.section][row.field] = row.value;
  });
  return map;
}

async function fetchSiteImages(): Promise<ImageMap> {
  const { data, error } = await supabase
    .from('site_images')
    .select('section, field, url');
  if (error) throw error;
  const map: ImageMap = {};
  (data || []).forEach((row: any) => {
    if (!map[row.section]) map[row.section] = {};
    map[row.section][row.field] = row.url;
  });
  return map;
}

export function useSiteContent() {
  const contentQuery = useQuery({
    queryKey: ['site-content'],
    queryFn: fetchSiteContent,
    staleTime: 1000 * 60 * 5,
  });

  const imageQuery = useQuery({
    queryKey: ['site-images'],
    queryFn: fetchSiteImages,
    staleTime: 1000 * 60 * 5,
  });

  const getContent = (section: string, field: string, fallback: string): string => {
    return contentQuery.data?.[section]?.[field] ?? fallback;
  };

  const getImage = (section: string, field: string, fallback: string): string => {
    return imageQuery.data?.[section]?.[field] || fallback;
  };

  return {
    getContent,
    getImage,
    isLoading: contentQuery.isLoading || imageQuery.isLoading,
  };
}
