document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  try {
    // 1. Limpiar mensajes anteriores
    errorMessage.textContent = '';
    errorMessage.classList.remove('alert-danger', 'alert-success');
    errorMessage.style.display = 'none';

    // 2. Enviar datos al backend
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // 3. Manejar respuesta
    if (response.ok) {
      // Autenticación exitosa
      alert(`✅ Autenticado como ${data.user.username}`);
      
      // Redirigir o guardar token
      localStorage.setItem('token', data.token);
      // window.location.href = '/dashboard.html'; // Ejemplo de redirección
    } else {
      // Mostrar error
      errorMessage.textContent = `❌ ${data.error || 'Error de autenticación'}`;
      errorMessage.classList.add('alert-danger');
      errorMessage.style.display = 'block';
    }
  } catch (err) {
    // Error de conexión
    errorMessage.textContent = '❌ Error al conectar con el servidor';
    errorMessage.classList.add('alert-danger');
    errorMessage.style.display = 'block';
    console.error('Error:', err);
  }
});