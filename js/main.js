const productos = [
    {
        id: "airpods",
        titulo: "Airpods",
        imagen: "./img/auriculares.jpg",
        precio: 1000,
    },
    {
        id: "bicicleta",
        titulo: "Bicicleta",
        imagen: "./img/bicicleta.jpg",
        precio: 1000,
    },
    {
        id: "celular",
        titulo: "Celular",
        imagen: "./img/celular.jpg",
        precio: 1000,
    },
    {
        id: "computadora",
        titulo: "Computadora",
        imagen: "./img/computadora.jpg",
        precio: 1000,
    },
    {
        id: "tablet",
        titulo: "Tablet",
        imagen: "./img/tablet.jpg",
        precio: 1000,
    },
    {
        id: "televisor",
        titulo: "Televisor",
        imagen: "./img/televisor.jpg",
        precio: 1000,
    },
    {
        id: "tostadora",
        titulo: "Tostadora",
        imagen: "./img/tostadora.jpg",
        precio: 1000,
    }
];

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

// const peoductosEnCarrito = [];

if (productosEnCarritoLS) {
productosEnCarrito = JSON.parse(productosEnCarritoLS);
actualizarNumerito();
} else {
productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoEncontrado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = peoductosEnCarrito.findIndex(producto => producto.id === idBoton);
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

cargarProductos();

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
