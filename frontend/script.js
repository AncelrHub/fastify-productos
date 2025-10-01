const API = 'http://localhost:3000';

async function listar() {
  const res = await fetch(`${API}/productos`);
  const data = await res.json();
  const tbody = document.querySelector('#tabla tbody');
  tbody.innerHTML = '';
  data.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${parseFloat(p.precio).toFixed(2)}</td>
      <td><button data-id="${p.id}" class="delete">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  if (!nombre || isNaN(precio)) return alert('Datos inválidos');

  const res = await fetch(`${API}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio })
  });
  if (res.ok) {
    document.getElementById('form').reset();
    await listar();
  } else {
    const err = await res.json();
    alert('Error: ' + (err.error || JSON.stringify(err)));
  }
});

document.querySelector('#tabla tbody').addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    if (!confirm('Eliminar producto #' + id + '?')) return;
    const res = await fetch(`${API}/productos/${id}`, { method: 'DELETE' });
    if (res.ok) await listar();
    else {
      const err = await res.json();
      alert('Error: ' + (err.error || JSON.stringify(err)));
    }
  }
});

listar();
