import { useState } from 'react';

export default function PlotGenerator() {
  const [A1, setA1] = useState(1);
  const [f1, setF1] = useState(1);
  const [A2, setA2] = useState(1);
  const [f2, setF2] = useState(1);
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePlot = async () => {
    setLoading(true);
    setPlotUrl(null);
    try {
      const res = await fetch('https://sine-plot-v2-env.eba-prdbvgm7.us-east-1.elasticbeanstalk.com/plot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ A1, f1, A2, f2 })
      });
      const data = await res.json();
      setPlotUrl(data.url);
    } catch (err) {
      alert("Error al generar gráfico. Ver consola.");
      console.error("Error al generar gráfico:", err);
    } finally {
      setLoading(false);
    }
  };

    return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem', padding: '2rem', flexWrap: 'wrap' }}>
    {/* Formulario */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handlePlot();
      }}
      style={{ width: '300px', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}
    >
      <h2>Parámetros de la función</h2>
      <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
        <label>Amplitud 1:
          <input type="number" step="0.1" value={A1} onChange={e => setA1(Number(e.target.value))} />
        </label>
        <label>Frecuencia 1:
          <input type="number" step="0.1" value={f1} onChange={e => setF1(Number(e.target.value))} />
        </label>
        <label>Amplitud 2:
          <input type="number" step="0.1" value={A2} onChange={e => setA2(Number(e.target.value))} />
        </label>
        <label>Frecuencia 2:
          <input type="number" step="0.1" value={f2} onChange={e => setF2(Number(e.target.value))} />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Generando...' : 'Graficar'}
      </button>
    </form>

    {/* Imagen del gráfico */}
    {plotUrl && (
      <div style={{ flexGrow: 1 }}>
        <h3>Resultado</h3>
        <img
          src={plotUrl}
          alt="Gráfico generado"
          style={{ width: '100%', maxWidth: '800px', border: '1px solid #888', borderRadius: '4px' }}
        />
      </div>
    )}
  </div>
);

  }
