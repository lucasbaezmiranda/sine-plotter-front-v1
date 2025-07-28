import { useState } from 'react';

export default function PlotGenerator() {
  const [functions, setFunctions] = useState([
  { tipo: 'sin', amplitud: 1, frecuencia: 1, fase: 0 },
  { tipo: 'sin', amplitud: 0.8, frecuencia: 1.5, fase: 45 }
  ]);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFunctionChange = (index, field, value) => {
    const updated = [...functions];
    updated[index][field] = field === 'tipo' ? value : Number(value);
    setFunctions(updated);
  };

  const handleAddFunction = () => {
    setFunctions([
      ...functions,
      { tipo: 'sin', amplitud: 1, frecuencia: 1, fase: 0 }
    ]);
  };

  const handleRemoveFunction = (index) => {
    const updated = [...functions];
    updated.splice(index, 1);
    setFunctions(updated);
  };

  const handlePlot = async () => {
    setLoading(true);
    setX(null);
    setY(null);
    try {
      const res = await fetch('https://ob99zx277a.execute-api.us-east-1.amazonaws.com/v2/plot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': "NZSoiO2rSQ6owKgHDIpgF4Zfp1MBsFEU1iSImfHX"
        },
        body: JSON.stringify({ funciones: functions })
      });
      const data = await res.json();
      const body = data?.body ? JSON.parse(data.body) : data;
      setX(body.x);
      setY(body.y);
    } catch (err) {
      console.error("Error al generar gráfico:", err);
      alert("Error al generar gráfico.-");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Funciones a Graficar</h2>
      {functions.map((func, idx) => (
        <div key={idx} style={{ 
            border: '1px solid #ccc', 
            padding: '1rem', 
            marginBottom: '1rem', 
            borderRadius: '8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
          }}>

          <label>
            Tipo:
            <select value={func.tipo} onChange={e => handleFunctionChange(idx, 'tipo', e.target.value)}>
              <option value="sin">Seno</option>
              <option value="cos">Coseno</option>
            </select>
          </label>
          <label>
            Amplitud:
            <input type="number" step="0.1" value={func.amplitud} onChange={e => handleFunctionChange(idx, 'amplitud', e.target.value)} />
          </label>
          <label>
            Frecuencia:
            <input type="number" step="0.1" value={func.frecuencia} onChange={e => handleFunctionChange(idx, 'frecuencia', e.target.value)} />
          </label>
          <label>
            Fase (grados):
            <input type="number" step="1" value={func.fase} onChange={e => handleFunctionChange(idx, 'fase', e.target.value)} />
          </label>
          {functions.length > 1 && (
            <button onClick={() => handleRemoveFunction(idx)} style={{ marginLeft: '1rem', color: 'red' }}>Eliminar</button>
          )}
        </div>
      ))}

      <button onClick={handleAddFunction} style={{ marginBottom: '1rem' }}>Agregar función</button>
      <br />
      <button onClick={handlePlot} disabled={loading}>
        {loading ? 'Generando...' : 'Graficar'}
      </button>

      {x && y && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Resultado</h3>
          <pre>{`x: [${x.slice(0, 5).join(', ')} ...] (${x.length} puntos)`}</pre>
          <pre>{`y: [${y.slice(0, 5).join(', ')} ...] (${y.length} puntos)`}</pre>
          {/* Acá luego podés insertar ChartPlot si querés el gráfico directamente */}
        </div>
      )}
    </div>
  );
}
