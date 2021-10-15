/*
ENTREGA 05 - OBJETOS
*/

function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

class Producto{
    constructor(nombre,categoria,precio,currency,stock) {
        this._id = Math.floor(Math.random()*1000000); // No incluí el id porque en principio no debería ser asignable manualmente
        // Se que esta no es la forma correcta de asignar un ID pero como todavía no estamos trabajando con bases de datos es lo único que se me ocurrió.
        this._nombre = titleCase(nombre);
        this._categoria = titleCase(categoria);
        this._precio = precio;
        this._currency = currency.toUpperCase();
        this._stock = stock;
        this._cantidadElegida = 0 // No lo incluí en el constructor porque no debería ser algo que se pueda definir al instanciar el objeto
        // De todas formas tampoco estoy seguro que "cantidadElegida" deba ser un atributo del producto, pero por ahora no se me ocurrió una forma
        // más prolija de resolverlo.
        
    }
    getId() {
        return this._id
    }
    getNombre() {
        return this._nombre
    }
    getCategoria() {
        return this._categoria
    }
    getPrecio() {
        return this._precio
    }
    getCurrency() {
        return this._currency
    }
    getStock() {
        return this._stock
    }
    getCantidad() {
        return this._cantidadElegida
    }

    setNombre(newNombre) {
        this._nombre = titleCase(newNombre);
    }
    setCategoria(newCategoria) {
        this._categoria = titleCase(newCategoria);
    }
    setPrecio(newPrecio) {
        this._precio = newPrecio;
    }
    setCurrency(newCurrency) {
        this._currency = newCurrency.toUpperCase();
    }
    setStock(newStock) {
        this._stock = newStock;
    }
    setCantidad(newCantidad) {
        this._cantidadElegida = newCantidad;
    }

    verInfo() {
        let info = `ID: ${this.getId()} - Producto: ${this.getNombre()} - Categoría: ${this.getCategoria()} - Precio: ${this.getCurrency()} $${this.getPrecio()} - Stock: ${this.getStock()}.`
        return info 
    }

    switchCurrency() {
        if (this._currency == "ARS") {
            this._currency = "USD"
        } else {
            this._currency = "ARS"
        }
        
    }

    
    
}

class Zapatilla extends Producto {
    constructor(nombre,categoria,precio,currency,stock,marca,modelo,talle,color) {
        super(nombre,categoria,precio,currency,stock)
        this._marca = titleCase(marca)
        this._modelo = modelo
        this._talle = talle
        this._color = color

    }

    getMarca() {
        return this._marca
    }

    setMarca(newMarca) {
        this._marca = titleCase(newMarca);
    }
    getModelo() {
        return this._modelo
    }
    getTalle() {
        return this._talle
    }
    getColor() {
        return this._color
    }

    setModelo(newModelo) {
        this._modelo = newModelo;
    }
    setTalle(newTalle) {
        this._talle = newTalle;
    }
    setColor(newColor) {
        this._color = newColor;
    }


    verInfo() {
        let info = `ID: ${this.getId()} - Producto: ${this.getNombre()} - Marca: ${this.getMarca()} - Modelo: ${this.getModelo()} - Categoría: ${this.getCategoria()} - Color: ${this.getColor()} - Talle: ${this.getTalle()} - Precio: ${this.getCurrency()} $${this.getPrecio()} - Stock: ${this.getStock()}.`
        return info 
    }
}

class Carrito {
    constructor() {
        this._id = Math.floor(Math.random()*1000000);
        this._productos = {}  
        this._total = 0
        this._currency = "ARS"
    }

    getId(){
        return this._id
    }
    getProductos(){
        return this._productos
    }
    getTotal(){
        this._total = this.calcularTotal()
        return this._total
    }
    getCurrency(){
        return this._currency
    }

    setCurrencyAll(newCurrency){
        this._currency = newCurrency
        const productos = this.getProductos()
        for (let item in productos) {
            productos[item].setCurrency(newCurrency)
        }
    }

    calcularTotal(){
        let newTotal = 0 
        const productos = this.getProductos()
        for (let item in productos) {
            let precioItem = Number(productos[item].getPrecio()) * Number(productos[item].getCantidad())
            newTotal += precioItem
        }
        return newTotal
    }
    
    
        
    
    
}


class Catalogo {
    constructor(){
        this._listadoProductos = {} // No lo agregué como parametro al constructor porque es algo intrínseco a la clase
        // y a ese listado se le pueden agregar productos
    }

    getCatalogo(){
        return this._listadoProductos
    }

    getLength(){
        let size = 0;
        for (let key in this._listadoProductos){
            size++
            
        }
        return size
    }

    showCatalogo(){
        let item
        for (const producto in this.getCatalogo()){
            item = this.getCatalogo()[producto]
            console.log(item)
        }
        if (this.getLength() == 0) {
            alert("Aún no hay productos en el catálogo.")
        }
    }

    

}

function addToCatalogo(Catalogo,Producto) {
    Catalogo.getCatalogo()[Producto.getId()] = Producto
}

function addToCarrito(Carrito,Producto){
    const listaProductos = Carrito.getProductos();
    let stock = Producto.getStock()
    if ((!(Object.keys(listaProductos)).includes(((Producto.getId()).toString()))) && (stock > 0)) {
        listaProductos[Producto.getId()] = Producto;
        Producto.setCantidad(1);
        
        Producto.setStock(stock-1)
        // Si se agrega el producto al carrito, hay que restarle 1 al stock (Solo se puede agregar siempre y cuando haya stock)
        
    } else {
        cantidad = Producto.getCantidad();
        if (stock) {    
            newCantidad = (Producto.getCantidad())+1
            listaProductos[Producto.getId()].setCantidad(newCantidad);
            stock = Producto.getStock()
            Producto.setStock(stock-1)
        };
    };
    
};

function removeFromCatalogo(Catalogo,Producto) {
    let catalogo = Catalogo.getCatalogo()
    
    let producto = Producto.getId()
    
    if ((Object.keys(catalogo)).includes(String(producto))){
        delete catalogo[producto];
        alert(`El producto ${producto} ha sido removido del catálogo.`)
    } else {
        alert(`El producto ${producto} no se encuentra en el catálogo.`)
    }
}

function removeFromCarrito(Carrito,Producto) {
    let carrito = Carrito.getProductos()
    let producto = Producto.getId()
    let cantidad = Producto.getCantidad()
    
    if ((Object.keys(carrito)).includes(String(producto))){
        // Si se elimina el producto del carrito, tiene que volver a aparecer la cantidad de ese producto en stock
        Producto.setStock(cantidad)
        Producto.setCantidad(0)
        delete carrito[producto];
        alert(`El producto ${producto} ha sido removido del carrito.`)
    } else {
        alert(`El producto ${producto} no se encuentra en el carrito.`)
    }
}

function crearProducto() {
    let producto
    rta = (prompt("El producto es una zapatilla? [S/N]: ").toUpperCase())
    while (!(rta == "S") && !(rta == "N")) {
        rta = (prompt("Opción invalida. Solamente puede responder [S/N]: ").toUpperCase())
    }
    if (rta == "S") {
        let nombre = titleCase(prompt("Ingrese el nombre del producto: "));
        let categoria = titleCase(prompt("Ingrese la categoría del producto: "));
        let precio = Number(prompt("Ingrese el precio del producto: "));
        let currency = (prompt("Ingrese el tipo de moneda [USD/ARS]: ").toUpperCase());
        let stock = Number(prompt("Ingrese el stock del producto: "));
        let marca = titleCase(prompt("Ingrese la marca del producto: "));
        let modelo = titleCase(prompt("Ingrese el modelo del producto: "));
        let talle = prompt("Ingrese el talle del producto: ")
        let color = prompt("Ingrese el color del producto: ")

        producto = new Zapatilla(nombre,categoria,precio,currency,stock,marca,modelo,talle,color)
    } else {
        let nombre = titleCase(prompt("Ingrese el nombre del producto: "));
        let categoria = titleCase(prompt("Ingrese la categoría del producto: "));
        let precio = Number(prompt("Ingrese el precio del producto: "));
        let currency = (prompt("Ingrese el tipo de moneda [USD/ARS]: ").toUpperCase());
        let stock = Number(prompt("Ingrese el stock del producto: "));
        producto = new Producto(nombre,categoria,precio,currency,stock)
    }

    return producto
}



function main(){
    

    const zapatilla1 = crearProducto()
    console.log(zapatilla1.verInfo())


    const catalogo = new Catalogo()
    const carrito = new Carrito() // Debería crear una clase Usuario que tenga dentro del constructor un objeto Carrito

    const zapatilla2 = crearProducto()
    console.log(zapatilla2.verInfo())
    //new Zapatilla("Adidas XR150","Calzado Deportivo",21000,"USD",3,"Adidas","XR150",42,"Blanco")
    addToCatalogo(catalogo,zapatilla1)
    addToCatalogo(catalogo,zapatilla2)

    console.log(catalogo.getCatalogo())


    console.log("SHOW CATALOGO:")
    catalogo.showCatalogo()

    

    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla2)
    addToCarrito(carrito, zapatilla2)
    addToCarrito(carrito, zapatilla2)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1) // Notese que NO se agrega una nueva al carrito, ya que supera el STOCK que posee esa zapatilla
    addToCarrito(carrito, zapatilla2)
    console.log("SHOW CARRITO:")
    console.log(carrito.getProductos())
    carrito.setCurrencyAll("USD")
    console.log(`TOTAL: ${carrito.getCurrency()} $${carrito.getTotal()}.`)

    //removeFromCatalogo(catalogo,zapatilla1)
    //console.log("SHOW CATALOGO:")
    //console.log(catalogo.getCatalogo())

    //removeFromCarrito(carrito,zapatilla1)
    //console.log("SHOW CARRITO:")
    //console.log(carrito.getProductos())
    console.log("SHOW CATALOGO:")
    console.log(catalogo.getCatalogo())
}


main()
