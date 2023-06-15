import fs from 'fs'


 export  default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    //----------------- Agrego un producto -----------------

    async addProducts(product) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, 'utf-8')

            console.log (dataProduct);
            let dataProdParse = JSON.parse(dataProduct);

            if (dataProdParse.some(num => num.code == product.code) !== true &&
                 product.title !== "" &&
                 product.description !== "" &&
                 product.price > 0 &&
                 product.status === true &&
                 product.thumbnail !== "" &&
                 product.stock >= 0) {
                const data = dataProdParse 
                ? [...dataProdParse, { ...product, id: dataProdParse.length + 1 }]
                : [{ ...product, id: dataProdParse.length + 1 }];
                const getData = await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(data, null, 2)
                );
                console.log(`Se agregó un producto con el id: ${dataProdParse.length + 1}`);
            } else {
                const salida =
                 dataProdParse.some((num) => num.code == product.code) === true ?
                  'Producto agregado'
                 : 'Deben completarse los campos'
                console.log(salida);
            }
        } catch (error) {
            console.log("error", error);
        }

    }

    //----------------- Devuelvo todos los productos -----------------

    async getProducts() {
        let dataProduct = await fs.promises.readFile(this.path, "utf-8");
        let dataProdParse = JSON.parse(dataProduct);
        if (dataProdParse.length) {
            return dataProdParse;
        } else {
            console.log('no hay productos');
        }

    }

    //----------------- Busco un producto por su id -----------------

    async getProductById(id) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf-8");
            let dataProdParse = JSON.parse(dataProduct)
            let product = dataProdParse.find((product) => product.id === id);
            if (product) {
                return product;
            } else {
                console.log(`producto no encontrado con ese Id: ${id}`);
                return null;
            }
        } catch (error) {
            console.log(error)
        }
    }

    /*-----------------Nuevo producto por su Id -----------------*/

    async updateProducts(id, object) {
        try {
            let dataProduct = await fs.promises.readFile(this.patch, "utf-8");
            let dataProdParse = JSON.parse(dataProduct);
            let product = dataProdParse.findIndex((product) => product.id === +id);
            if (product > -1) {
                const key = Object.keys (object)
                const newValue = object [key]
                dataProdParse[product][key] = newValue
                await fs.promises.writeFile(this.path,
                    JSON.stringify(dataProdParse, null, 2));
                console.log('se ha actualizado correctamente');
            } else{
                console.log (`no existe el producto con el Id ${id}`);
                return null;
            }
               
            } catch (error) {
            console.log("error al actualizar el producto", error);
        }
    }

    /*-----------------Borrar Producto por su id -----------------*/

    async deleteProduct(id) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf-8");
            let dataProductParse = JSON.parse(dataProduct);
            let product = dataProductParse.find((product) => product.id === id);
            if (product) {
                const dataProdFilter = dataProductParse.filter(
                    (product) => product.id !== id
                    );
                await fs.promises.writeFile(this.path,
                    JSON.stringify(dataProdFilter, null, 2)
                    );
                console.log('Producto eliminado con exito');
            } else {
                console.log(`No existe el producto con el id: ${id}`);
            }
        } catch (error) {
            console.log('Error al eliminar el producto', error);
        }
    }
}

let productos = new ProductManager("./data.txt")

let producto1 = new ProductModel('producto de prueba', 'este es un producto', 200, 'Sin Imagen1', "abc123", 25)


productos.addProducts(producto1)

productos.addProducts ("Producto de prueba1","Este es un producto1", 200, "Sin Imagen1", "abc123", 25)
productos.addProducts ("Producto de prueba2","Este es un producto2", 200, "Sin Imagen2", "abc124", 25)
productos.addProducts ("Producto de prueba3","Este es un producto3", 200, "Sin Imagen3", "abc125", 25)
productos.addProducts ("Producto de prueba4 ","Este es un producto4", 200, "Sin Imagen4", "abc126", 25)
productos.addProducts ("Producto de prueba5","Este es un producto5", 200, "Sin Imagen5", "abc127", 25)
productos.addProducts ("Producto de prueba6","Este es un producto6", 200, "Sin Imagen6", "abc128", 25)
productos.addProducts ("Producto de prueba7","Este es un producto7", 200, "Sin Imagen7", "abc129", 25)
productos.addProducts ("Producto de prueba8","Este es un producto8", 200, "Sin Imagen8", "abc130", 25)
productos.addProducts ("Producto de prueba9","Este es un producto9", 200, "Sin Imagen9", "abc131", 25)
productos.addProducts ("Producto de prueba10","Este es un producto10", 200, "Sin Imagen10", "abc132", 25)
productos.addProducts ("Producto de prueba11","Este es un producto11", 200, "Sin Imagen11", "abc133", 25)


productos.getProductById(2)

productos.getProducts()

productos.getProductById(9)

productos.updateProducts(1, "stock", 555)

productos.deleteProduct(3)