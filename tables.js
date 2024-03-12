document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners for CRUD operations

    // Add button click event
    document.getElementById('addButton').addEventListener('click', addClientToTable);

    // Delegate click events to the document for edit and delete buttons
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('editButton')) {
            editOrDeleteClient(event.target, true);
        } else if (event.target.classList.contains('deleteButton')) {
            editOrDeleteClient(event.target, false);
        }
    });
});

function addClientToTable() {
    var name = prompt('Ingrese el nombre del cliente:');
    var id = prompt('Ingrese la cédula del cliente:');
    var email = prompt('Ingrese el correo electrónico del cliente:');

    if (!validateInput(name, id, email) || !email.includes('@')) {
        alert('Por favor, ingrese información válida.');
        return;
    }

    var newRow = createRow(name, id, email);
    document.querySelector('tbody').appendChild(newRow);
}

function editOrDeleteClient(target, isEdit) {
    var row = target.closest('tr');
    var actionVerb = isEdit ? 'editar' : 'eliminar';

    if (!row) {
        console.error('No se puede encontrar la fila asociada al botón.');
        return;
    }

    if (isEdit) {
        editClient(row);
    } else {
        if (confirm('¿Seguro que deseas ' + actionVerb + ' a este cliente?')) {
            deleteClient(row);
        }
    }
}

function editClient(row) {
    var name = prompt('Ingrese el nuevo nombre:', row.querySelector('.d-flex h6').textContent);
    var id = prompt('Ingrese la nueva cédula:', row.querySelector('.d-flex .text-xs').textContent);
    var email = prompt('Ingrese el nuevo correo electrónico:', row.querySelectorAll('td')[2].textContent);

    if (!validateInput(name, id, email) || !email.includes('@')) {
        alert('Por favor, ingrese información válida.');
        return;
    }

    row.querySelector('.d-flex h6').textContent = name;
    row.querySelector('.d-flex .text-xs').textContent = id;
    row.querySelectorAll('td')[2].textContent = email;
}

function deleteClient(row) {
    row.remove();
}

function validateInput(name, id, email) {
    return !(name === null || id === null || email === null || name === '' || id === '' || email === '');
}

function createRow(name, id, email) {
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>
        <div class="d-flex px-2 py-1">
         
          <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">${name}</h6>
            <p class="text-xs text-secondary mb-0">${id}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="text-xs text-secondary mb-0">${id}</p>
      </td>
      <td>
        <p class="text-xs text-secondary mb-0">${email}</p>
      </td>
      <td class="align-middle text-center text-sm">
        <span class="badge badge-sm bg-gradient-success">Online</span>
      </td>
      <td class="align-middle">
        <a href="javascript:;" class="text-secondary font-weight-bold text-xs editButton" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
        <a href="javascript:;" class="text-secondary font-weight-bold text-xs deleteButton" data-toggle="tooltip" data-original-title="Delete user">Delete</a>
      </td>
    `;
    return newRow;
}


