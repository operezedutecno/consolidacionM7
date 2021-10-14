document.getElementById("insertar").addEventListener("submit", function(e) {
    e.preventDefault();
    const payload = prepararData(e);
    axios.post("http://localhost:3000/bootcamps", payload).then((res) => {
        res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
    });
});

document.getElementById("selectEditar").addEventListener("change", function(e) {
    const id = document.getElementById("selectEditar").value
        // alert(id)
    axios.get("http://localhost:3000/editar?id=" + id)
        .then((res) => {
            if (res.data.code) {
                alert("Error codigo: " + res.data.code)
            } else {
                // alert(res.data[0].nombre)
                document.getElementById('idEditar').value = res.data[0].id
                document.getElementById('nombreEditar').value = res.data[0].nombre
                document.getElementById('mesesEditar').value = res.data[0].duracion
                document.getElementById('turnoEditar').value = res.data[0].turno
            };
        })
})

document.getElementById("editar").addEventListener("submit", function(e) {
    e.preventDefault();
    const payload = prepararDataEditar(e);
    axios.put("http://localhost:3000/bootcamps", payload).then((res) => {
        res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
    });
});

document.getElementById("eliminar").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = e.target[0].value
    axios.delete("http://localhost:3000/bootcamps?id=" + id)
        .then((res) => {
            res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
        })
})

function prepararData(e) {
    const nombre = e.target[0].value;
    const duracion = e.target[1].value;
    const turno = e.target[2].value;
    return {
        nombre,
        duracion,
        turno
    };

}

function prepararDataEditar(e) {
    const id = e.target[0].value;
    const nombre = e.target[1].value;
    const duracion = e.target[2].value;
    const turno = e.target[3].value;
    return {
        id,
        nombre,
        duracion,
        turno
    };

}

function cleanInputs(e) {
    if (e.target[3]) {
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
    }
}

async function getData(e) {
    if (e) cleanInputs(e);
    const data = await axios.get("http://localhost:3000/bootcamps");
    let tbody = document.getElementsByTagName("tbody")[0];
    const bootcamp = data.data;
    console.log(bootcamp)

    // Carga de la tabla
    tbody.innerHTML = "";
    bootcamp.forEach((e) => {
        tbody.innerHTML += `
            <tr>
                <td>${e.nombre}</td>
                <td>${e.duracion}</td>
                <td>${e.turno == 1 ? 'Diurno' : 'Nocturno'}</td>
            </tr>
        `;
    });

    // Carga de los selectores

    let selectores = document.getElementsByTagName("select");

    selectores[2].innerHTML =
        "<option selected disabled>Seleccione un bootcamp</option>";
    selectores[5].innerHTML =
        "<option selected disabled>Seleccione un bootcamp</option>";

    bootcamp.forEach((e, i) => {
        selectores[2].innerHTML += `
          <option value="${e.id}">${e.nombre}</option>
        `;
    });
    bootcamp.forEach((e, i) => {
        selectores[5].innerHTML += `
          <option value="${e.id}">${e.nombre}</option>
        `;
    });
}

getData();