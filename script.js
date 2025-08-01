//const apiUrl = "http://localhost:7070/usuarios";

async function cargarUsuarios() {
  const res = await fetch(apiUrl);
  const usuarios = await res.json();

  const contenedor = document.getElementById("user-list");
  contenedor.innerHTML = "";

  usuarios.forEach(u => {
    const div = document.createElement("div");
    div.className = "user";
    div.innerHTML = `
      <strong>${u.nombre}</strong><br>
      ${u.correo}<br>
      <input type="text" id="usuarioEN${u.id}" value="${u.nombre}">
      <input type="text" id="usuarioEC${u.id}" value="${u.correo}">
      <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
      <button onclick="editarUsuario(${u.id})">Editar</button>
    `;
    contenedor.appendChild(div);
  });
}

async function agregarUsuario(nombre, correo) {
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo })
  });
  cargarUsuarios();
}

async function eliminarUsuario(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  });
  cargarUsuarios();
}

async function editarUsuario(id) {
  nombre = document.getElementById('usuarioEN' + id).value;
  correo = document.getElementById('usuarioEC' + id).value;
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo })
  });
  cargarUsuarios();
  
}

document.getElementById("user-form").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  agregarUsuario(nombre, correo);
  e.target.reset();
});

cargarUsuarios();
