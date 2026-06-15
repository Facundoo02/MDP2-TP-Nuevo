"Crear y cargar instancias del negocio elegido y simular el comportamiento de una 
parte del negocio. En este caso vamos a simular la parte de venta de productos. Un cliente viene, selecciona productos (Que tengan stock disponible), realiza la compra y los productos descuentan su stock "

|supermercado producto proveedor cliente compra detalle| "Se declaran las variables a utliizar"

"Inicializo las variables" 
supermercado:= Supermercado new.
producto:=Producto new.
detalle := DetalleCompra new.
compra := Compra new.
proveedor:= Proveedor new.
cliente:=Cliente new.
"Cargo los datos del producto y del proveedor"
proveedor actualizarId: 1.
proveedor actualizarNombre: 'Coca-Cola'.
Transcript 
	show:'Proveedor de ', proveedor verNombre,' creado correctamente';
	cr. "Esto es un salto de linea."
producto actualizarId: 1.
producto aumentarStock: 10.
producto actualizarNombre: 'Coca 2L'.
producto actualizarPrecio: 2000.
Transcript 
	show:'Producto ', producto getNombre ,' creado correctamente';
	cr. "Esto es un salto de linea."

"Agrego el producto a la lista del proveedor"
proveedor aggProducto: producto.

Transcript 
	show:'El proveedor ', proveedor verNombre ,' ahora suministra ',producto getNombre,'(',producto verStock printString,' unidades)';
	cr. "Esto es un salto de linea."

"Agrego el producto al supermercado. Esto es provisional, cambiaría a que el proveedor le suministre productos al super"
supermercado aggProducto: producto.
supermercado verProductos.

Transcript 
	show: producto getNombre ,' agregado al supermercado';
	cr. "Esto es un salto de linea."

"Comienza la compra (DEBERÍA DESCONTAR STOCK)"

detalle producto: producto.
detalle cantidad: 3.
compra aggDetalle: detalle.
cliente aggCompra: compra.
compra confirmarCompra.

