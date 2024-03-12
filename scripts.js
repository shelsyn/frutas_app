var productos = [];
var productoEditandoIndex = -1;

function agregarProducto() {
  var nombre = document.getElementById('productName').value;
  var stock = document.getElementById('productStock').value;
  var precio = document.getElementById('productPrice').value;
  var proveedor = document.getElementById('productSupplier').value;

  if (productoEditandoIndex === -1) {
    // Agregar nuevo producto
    var nuevoProducto = {
      nombre: nombre,
      stock: stock,
      precio: precio,
      proveedor: proveedor
    };
    productos.push(nuevoProducto);
  } else {
    // Editar producto existente
    productos[productoEditandoIndex].nombre = nombre;
    productos[productoEditandoIndex].stock = stock;
    productos[productoEditandoIndex].precio = precio;
    productos[productoEditandoIndex].proveedor = proveedor;
    productoEditandoIndex = -1; // Restablecer el índice de edición
  }

  actualizarTabla();
  // Limpiar el formulario
  document.getElementById('inventoryForm').reset();
}

function actualizarTabla() {
  var tablaProductos = document.getElementById('tablaProductos');
  tablaProductos.innerHTML = '';

  for (var i = 0; i < productos.length; i++) {
    var fila = tablaProductos.insertRow();
    var celdaNombre = fila.insertCell(0);
    var celdaStock = fila.insertCell(1);
    var celdaPrecio = fila.insertCell(2);
    var celdaProveedor = fila.insertCell(3);
    var celdaEditar = fila.insertCell(4);

    celdaNombre.innerHTML = productos[i].nombre;
    celdaStock.innerHTML = productos[i].stock;
    celdaPrecio.innerHTML = productos[i].precio;
    celdaProveedor.innerHTML = productos[i].proveedor;

    // Botón Editar
    var botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.className = 'btn btn-warning btn-sm';
    botonEditar.onclick = function (index) {
      return function () {
        editarProducto(index);
      };
    }(i);
    celdaEditar.appendChild(botonEditar);
  }
}

function editarProducto(index) {
  var producto = productos[index];

  // Llenar el formulario con los datos del producto seleccionado
  document.getElementById('productName').value = producto.nombre;
  document.getElementById('productStock').value = producto.stock;
  document.getElementById('productPrice').value = producto.precio;
  document.getElementById('productSupplier').value = producto.proveedor;

  // Guardar el índice del producto que se está editando
  productoEditandoIndex = index;
}

// Actualizar el botón "Agregar producto" para que cambie su etiqueta y funcionalidad según si se está agregando un nuevo producto o editando uno existente
document.getElementById('toggleFormButton').addEventListener('click', function () {
  if (productoEditandoIndex === -1) {
    document.getElementById('toggleFormButton').textContent = 'Agregar Producto';
  } else {
    document.getElementById('toggleFormButton').textContent = 'Mostrar formulario';
  }
});


document.getElementById('toggleFormButton').addEventListener('click', function () {
  productoEditandoIndex = -1;
  document.getElementById('inventoryForm').reset();
});

// Inicializar la tabla al cargar la página
actualizarTabla();


const toggleFormButton = document.getElementById('toggleFormButton');
const inventoryFormContainer = document.getElementById('inventoryFormContainer');

toggleFormButton.addEventListener('click', () => {
  inventoryFormContainer.classList.toggle('d-none');
});
