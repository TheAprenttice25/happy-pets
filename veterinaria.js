// public/js/veterinaria.js
document.getElementById('formulario').addEventListener('submit', async function (e) {
  e.preventDefault();

  const datos = Object.fromEntries(new FormData(e.target));

  try {
    const resp = await fetch('/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const texto = await resp.text();
    document.body.innerHTML = texto;
  } catch (error) {
    alert('❌ Error al enviar datos');
    console.error(error);
  }
});
