document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  try {
    // Enviar datos al backend
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.textContent = `✅ Autenticado como ${data.user.username} (Rol: ${data.user.rol})`;
      messageDiv.style.color = 'green';
      
      // Guardar el token en localStorage (opcional)
      localStorage.setItem('token', data.token);
      
      // Redirigir o mostrar contenido protegido
      console.log('Token JWT:', data.token);
    } else {
      messageDiv.textContent = `❌ Error: ${data.error}`;
      messageDiv.style.color = 'red';
    }
  } catch (err) {
    messageDiv.textContent = '❌ Error de conexión con el servidor';
    messageDiv.style.color = 'red';
    console.error(err);
  }
});