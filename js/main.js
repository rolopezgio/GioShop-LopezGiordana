let productos = [];
fetch ("./js/productos.json")
    .then (response => response.json())
    .then (data => {
        productos = data;
        cargarProductos(productos);
    }); 

const contenedorProductos = document.querySelector("#contenedorProductos");
const numerito = document.querySelector("#numerito");

function cargarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="productoDetalles">
                        <h3 class="productoTitulo">${producto.titulo}</h3>
                        <p class="productoPrecio">Precio online: $${producto.precio}</p>
                        <button class="productoAgregar" id="${producto.id}">AGREGAR AL CARRITO</button>
                    </div>
        `;
        contenedorProductos.append(div);
    })

    let botonesAgregar = document.querySelectorAll(".productoAgregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); 
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
productosEnCarrito = JSON.parse(productosEnCarritoLS);
actualizarNumerito();
} else {
productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#AB947E",
          borderRadius: '.5rem',
          textTransform: "uppercase",
          fontSize: '.75rem',
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
          },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoEncontrado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoEncontrado.cantidad = 1;
        productosEnCarrito.push(productoEncontrado);
    }
    actualizarCarrito();
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarCarrito() {
    const carritoContainer = document.querySelector("#carrito");
    carritoContainer.innerHTML = "";
    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoCarrito");       
    });
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
