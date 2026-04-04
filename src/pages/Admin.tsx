import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SECTIONS = [
  {
    key: 'hero',
    label: 'Hero',
    preview: '/admin-previews/hero.png',
    fields: [
      { key: 'title_line1', label: 'Título línea 1', type: 'text' as const, fallback: 'Jose' },
      { key: 'title_line2', label: 'Título línea 2', type: 'text' as const, fallback: 'Prieto' },
      { key: 'eyebrow', label: 'Subtítulo (eyebrow)', type: 'text' as const, fallback: 'Estratega de Contenido' },
    ],
    imageFields: [],
  },
  {
    key: 'bridge',
    label: 'Puente (Manifesto)',
    preview: '/admin-previews/bridge.png',
    fields: [
      { key: 'phrase', label: 'Frase', type: 'textarea' as const, fallback: 'No hay maquinaria política ni presupuesto de marketing que le gane a una buena historia.' },
    ],
    imageFields: [],
  },
  {
    key: 'oviedo',
    label: 'Caso Oviedo',
    preview: '/admin-previews/oviedo.png',
    fields: [
      { key: 'title', label: 'Título', type: 'text' as const, fallback: 'CASO<br/>OVIEDO' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text' as const, fallback: 'Campaña Presidencial' },
      { key: 'headline', label: 'Headline', type: 'textarea' as const, fallback: 'De 1% de intención de voto a 1.2 millones de votos y ser la sorpresa de la gran consulta por Colombia.' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' as const, fallback: 'Con estrategia 100% basada en redes sociales, transformamos una campaña presidencial...' },
    ],
    imageFields: [{ key: 'image', label: 'Imagen' }],
  },
  {
    key: 'bilbao',
    label: 'Andrés Bilbao',
    preview: '/admin-previews/bilbao.png',
    fields: [
      { key: 'title', label: 'Título', type: 'text' as const, fallback: 'ANDRÉS<br/>BILBAO' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text' as const, fallback: 'Cofundador de Rappi' },
      { key: 'headline', label: 'Headline', type: 'textarea' as const, fallback: 'De cero a la fama. En unos meses, Andrés Bilbao paso de ser un desconocido a estar en todos lados' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' as const, fallback: 'Ayudé a Andrés a ser una de las voces más reconocidas del mundo de negocios en redes sociales...' },
    ],
    imageFields: [{ key: 'image', label: 'Imagen' }],
  },
  {
    key: 'sabana',
    label: 'Sabana Adentro',
    preview: '/admin-previews/sabana.png',
    fields: [
      { key: 'title', label: 'Título', type: 'text' as const, fallback: 'SABANA<br/>ADENTRO' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text' as const, fallback: 'Mi Historia' },
      { key: 'headline', label: 'Headline', type: 'textarea' as const, fallback: 'Pase de ser líder de tecnología en startups a vivir como vaquero y crear una comunidad de 1.7 millones de seguidores.' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' as const, fallback: 'Mandé a la mierda el deber ser. Me fui a cumplir mi sueño de vivir como vaquero en el llano...' },
    ],
    imageFields: [{ key: 'image', label: 'Imagen' }],
  },
  {
    key: 'clientes',
    label: 'Clientes',
    preview: '/admin-previews/clientes.png',
    fields: [
      { key: 'title', label: 'Título', type: 'text' as const, fallback: 'CLIENTES' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' as const, fallback: 'Estas son algunas de las personas y empresas que han confiado en mí.' },
    ],
    imageFields: [],
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    preview: '/admin-previews/linkedin.png',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' as const, fallback: 'Marca Personal' },
      { key: 'headline', label: 'Headline', type: 'textarea' as const, fallback: 'Con mi estrategia logré en 8 meses, 7 millones de impresiones y 19K seguidores' },
      { key: 'body', label: 'Cuerpo', type: 'textarea' as const, fallback: 'Hoy ayudo a marcas personales y equipos a posicionarse y vender en LinkedIn.' },
      { key: 'cta_label', label: 'Botón CTA', type: 'text' as const, fallback: 'Aplica mi Bootcamp →' },
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
        if (val) {
          const { error } = await supabase
            .from('site_content')
            .upsert({ section: sectionKey, field: field.key, value: val }, { onConflict: 'section,field' });
          if (error) throw error;
        }
      }
      toast.success(`${section.label} guardado correctamente`);
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
      toast.success('Imagen subida correctamente');
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    }
    setUploading((u) => ({ ...u, [uploadKey]: false }));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
            <p className="text-neutral-500 text-sm mt-1">Ingresa la contraseña para continuar</p>
          </div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-neutral-600"
          />
          {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
          <button
            onClick={handleLogin}
            disabled={authLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
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
        <div className="mb-10">
          <h1 className="text-white text-2xl font-bold">CMS — Contenido del sitio</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Edita el contenido de cada sección. El texto gris muestra lo que aparece actualmente en la web.
          </p>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.key} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-6">
            {/* Section preview image */}
            <div className="relative border-b border-neutral-800">
              <img
                src={section.preview}
                alt={`Preview: ${section.label}`}
                className="w-full h-32 object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-500">Sección</span>
                <h2 className="text-white text-lg font-bold leading-tight">{section.label}</h2>
              </div>
            </div>

            <div className="p-6">
              {section.fields.map((field) => {
                const currentValue = getValue(section.key, field.key);
                const displayFallback = field.fallback;
                return (
                  <div key={field.key} className="mb-5">
                    <label className="block text-neutral-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                      {field.label}
                    </label>
                    <div className="text-[11px] text-neutral-600 mb-1 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500/60" />
                      Texto actual en vivo
                    </div>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={currentValue}
                        onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                        placeholder={displayFallback}
                        rows={3}
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y placeholder:text-neutral-600"
                      />
                    ) : (
                      <input
                        value={currentValue}
                        onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                        placeholder={displayFallback}
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-neutral-600"
                      />
                    )}
                  </div>
                );
              })}

              {section.imageFields.map((imgField) => {
                const uploadKey = `${section.key}-${imgField.key}`;
                const currentUrl = getImage(section.key, imgField.key);
                return (
                  <div key={imgField.key} className="mb-5">
                    <label className="block text-neutral-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                      {imgField.label}
                    </label>
                    {currentUrl && (
                      <img src={currentUrl} alt="" className="w-full max-h-48 object-cover rounded-lg mb-2 border border-neutral-700/50" />
                    )}
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
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
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving[section.key] ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Guardando...
                  </>
                ) : (
                  'Guardar'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
