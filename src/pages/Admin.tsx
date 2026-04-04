import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SECTIONS = [
  {
    key: 'hero',
    label: 'Hero',
    fields: [
      { key: 'title_line1', label: 'Título línea 1', type: 'text' },
      { key: 'title_line2', label: 'Título línea 2', type: 'text' },
      { key: 'eyebrow', label: 'Subtítulo (eyebrow)', type: 'text' },
    ],
    imageFields: [],
  },
  {
    key: 'bridge',
    label: 'Puente (Manifesto)',
    fields: [
      { key: 'phrase', label: 'Frase', type: 'textarea' },
    ],
    imageFields: [],
  },
  {
    key: 'oviedo',
    label: 'Caso Oviedo',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'textarea' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' },
    ],
    imageFields: [{ key: 'image', label: 'Imagen' }],
  },
  {
    key: 'bilbao',
    label: 'Andrés Bilbao',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'textarea' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' },
    ],
    imageFields: [{ key: 'image', label: 'Imagen' }],
  },
  {
    key: 'sabana',
    label: 'Sabana Adentro',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'textarea' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' },
    ],
    imageFields: [{ key: 'image', label: 'Imagen' }],
  },
  {
    key: 'clientes',
    label: 'Clientes',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
    ],
    imageFields: [],
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'textarea' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' },
      { key: 'cta_label', label: 'Botón CTA', type: 'text' },
    ],
    imageFields: [],
  },
];

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [images, setImages] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const loadData = useCallback(async () => {
    const { data: content } = await supabase.from('site_content').select('section, field, value');
    const { data: imgs } = await supabase.from('site_images').select('section, field, url');
    const contentMap: Record<string, Record<string, string>> = {};
    (content || []).forEach((r: any) => {
      if (!contentMap[r.section]) contentMap[r.section] = {};
      contentMap[r.section][r.field] = r.value;
    });
    const imgMap: Record<string, Record<string, string>> = {};
    (imgs || []).forEach((r: any) => {
      if (!imgMap[r.section]) imgMap[r.section] = {};
      imgMap[r.section][r.field] = r.url;
    });
    setValues(contentMap);
    setImages(imgMap);
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const { data, error } = await supabase.functions.invoke('verify-admin', {
        body: { password },
      });
      if (error) throw error;
      if (data?.valid) {
        setAuthenticated(true);
      } else {
        setAuthError('Contraseña incorrecta');
      }
    } catch {
      setAuthError('Error de conexión');
    }
    setAuthLoading(false);
  };

  const getValue = (section: string, field: string) => values[section]?.[field] ?? '';
  const getImage = (section: string, field: string) => images[section]?.[field] ?? '';

  const updateValue = (section: string, field: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [field]: val },
    }));
  };

  const saveSection = async (sectionKey: string) => {
    setSaving((s) => ({ ...s, [sectionKey]: true }));
    const section = SECTIONS.find((s) => s.key === sectionKey);
    if (!section) return;

    try {
      for (const field of section.fields) {
        const val = getValue(sectionKey, field.key);
        const { error } = await supabase
          .from('site_content')
          .upsert({ section: sectionKey, field: field.key, value: val }, { onConflict: 'section,field' });
        if (error) throw error;
      }
      toast.success(`${section.label} guardado`);
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    }
    setSaving((s) => ({ ...s, [sectionKey]: false }));
  };

  const handleImageUpload = async (sectionKey: string, fieldKey: string, file: File) => {
    const uploadKey = `${sectionKey}-${fieldKey}`;
    setUploading((u) => ({ ...u, [uploadKey]: true }));
    try {
      const ext = file.name.split('.').pop();
      const path = `${sectionKey}/${fieldKey}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('site-images').getPublicUrl(path);
      const url = urlData.publicUrl;

      const { error } = await supabase
        .from('site_images')
        .upsert({ section: sectionKey, field: fieldKey, url }, { onConflict: 'section,field' });
      if (error) throw error;

      setImages((prev) => ({
        ...prev,
        [sectionKey]: { ...(prev[sectionKey] || {}), [fieldKey]: url },
      }));
      toast.success('Imagen subida');
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    }
    setUploading((u) => ({ ...u, [uploadKey]: false }));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-white text-xl font-bold mb-6 text-center">Admin Panel</h1>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
          <button
            onClick={handleLogin}
            disabled={authLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
          >
            {authLoading ? 'Verificando...' : 'Entrar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-8">CMS — Contenido del sitio</h1>

        {SECTIONS.map((section) => (
          <div key={section.key} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
            <h2 className="text-white text-lg font-bold mb-4">{section.label}</h2>

            {section.fields.map((field) => (
              <div key={field.key} className="mb-4">
                <label className="block text-neutral-400 text-sm mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={getValue(section.key, field.key)}
                    onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                    rows={3}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-y"
                  />
                ) : (
                  <input
                    value={getValue(section.key, field.key)}
                    onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                )}
              </div>
            ))}

            {section.imageFields.map((imgField) => {
              const uploadKey = `${section.key}-${imgField.key}`;
              const currentUrl = getImage(section.key, imgField.key);
              return (
                <div key={imgField.key} className="mb-4">
                  <label className="block text-neutral-400 text-sm mb-1">{imgField.label}</label>
                  {currentUrl && (
                    <img src={currentUrl} alt="" className="w-full max-h-48 object-cover rounded mb-2" />
                  )}
                  <label className="inline-block cursor-pointer bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm px-4 py-2 rounded hover:bg-neutral-700 transition-colors">
                    {uploading[uploadKey] ? 'Subiendo...' : 'Subir imagen'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(section.key, imgField.key, file);
                      }}
                    />
                  </label>
                </div>
              );
            })}

            <button
              onClick={() => saveSection(section.key)}
              disabled={saving[section.key]}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded text-sm transition-colors disabled:opacity-50"
            >
              {saving[section.key] ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
