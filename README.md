# Servidor con EXPRESS

Se crea servidor en express donde se configuran los edpoints. de acuerdo a los siguientes puntos:

## Router de Productos

a. Se crea Router de Productos, donde a partir de la ruta raiz **/api/products**, se realiza lo siguiente:

1. Un endpoint, donde se solicitan todos los productos mediante el método GET desde la ruta raiz **/**. Se envia un objeto con todos productos existentes.
2. El endpoint anterior, realiza la solicitud de productos a través de un limite mediante **?limit=[cantidad de productos solicitados]** empleando el método GET, despues de la ruta raiz **/**. En caso de que el limite se mayor a la cantidad de productos, se enviaran todos productos existentes. En caso de que se coloque una cantidad menor o igual a cero se envia un *objeto de error indicando que el limite es menor o igual a cero*.
3. Un endpoint, donde se solicita un producto a través de su ID mediante **/:pid** mediante el método GET. Si se identifica el producto, se resuelve con el producto con el ID correspondiente. En caso contrario se envía un *objeto de error con el mensaje indicando que el ID de producto solicitado no existe*.
4. Un endpoint, a través de cual se puede agragar un producto nuevo a través del método POST; empleando la ruta raiz **/** y recibiendo un objeto en JSON con las siguientes propiedades:
    {
        "title": "String"
        "description": "String"
        "code": "String"
        "price": Number
        "status": Boolean
        "stock": Number
        "category": "String"
        "thumbnails": [Se almacena en String los enlaces hacia la ubicación de las imagenes en un arreglo]
    }

El ID (id) se creará automáticamente al momento de agregar el nuevo producto.

5. Un endpoint que realice la actualización de un producto empleando el método PUT, y la ruta **/:pid**. A través de este endpint no es posible modificar el ID del producto (id) ni el código de producto (code); las demás propiedades si es posible modficarlas, mediante la recepción de un objeto en JSON que cuente con las propiedades mencionadas anteriormente y el ID de producto (id).
6. Un endpoint que realice la eliminación de un producto empleando el método DELETE, y la ruta **/:pid**

NOTA: En la busqueda de productos por ID, dado que la implementación de la **clase productManager**, al momento de hacer un registro de productos usando esta clase, los ID de productos se generan automaticamente; la persistencia se realiza en el archivo de productos **products.json**, y cuenta con los ID de acuerdo a esta implemnetación.

## Router de Carts

b. Se crea un Router de Carts, donde la ruta raiz está identificada como **/api/carts**, se realiza lo siguiente:

1. Se configura un endpoint que usará el método POST para crear un nuevo Cart desde la ruta raiz **/**. El ID (id) de nuevo cart se generará auotmáticamente. Durante la creación se agregará al cart un arreglo de productos el cual se encontrará vacio:
    [
        {
            "id": "id del cart"
            "products": []
        }
    ]

2. Un endpoint, que usará el método POST, que agregará productos al cart con el ID correspondiente del cart. Al agregar el nuevo producto unicamente se agregará al arreglo de productos el ID (id) del producto y la cantidad de productos, ambos dentro de un objeto. la ruta del endpoint sera **/:cid/product/:pid**, donde cid representa el ID del cart y pid el ID del producto que se agregará. Se recibe un objeto en JSON que contenga el ID del producto y la cantidad de la forma siguiente:
    {
        "id": "id del producto"
        "quantity": Number
    }

Durante el proceso, se verificará que el producto que agregará al cart, exista en el archivo de persistencia **products.json**, si no existe el producto no se podrá agregar al cart. Por otro lado, si el producta ya se encuentra registrado en el cart, se actualizará unicamente la cantidad.

3. Un endpoint que pueda obtener información del cart mediante el ID, empleando el método GET y la ruta **/:cid**, donde cid representa el ID del Cart.

NOTA: La implementación de la persitencia, los métodos de busqueda, de crecación y actualziación se realizan mendiante la clase **CartManager**. Desde esta clase se genera el ID del Cart de forma automática y son repetición. La persistencia se almacena en el archivo **carts.json**.

NOTA2: Se implementa **NODEMON** y se crea script en **package.json**, por lo que el servidor se ejecuta con **npm start**

# FIN