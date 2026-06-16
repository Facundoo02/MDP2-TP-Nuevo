| package |
package := Package name: 'SupermercadoTP-MDP2'.
package paxVersion: 1;
	basicComment: ''.

package classNames
	add: #Cliente;
	add: #Compra;
	add: #DetalleCompra;
	add: #Empleado;
	add: #Producto;
	add: #Proveedor;
	add: #Supermercado;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'..\..\Users\axelp\OneDrive\Desktop\dolphin\Core\Object Arts\Dolphin\Base\Dolphin'
	'..\..\Users\axelp\OneDrive\Desktop\dolphin\Core\Object Arts\Dolphin\Base\Dolphin Legacy Date & Time').

package!

"Class Definitions"!

Object subclass: #Cliente
	instanceVariableNames: 'dni clave nombre apellido compras'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Compra
	instanceVariableNames: 'idcompra cliente monto fecha detalles estado'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #DetalleCompra
	instanceVariableNames: 'id compra producto cantidad subtotal'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Empleado
	instanceVariableNames: 'legajo nombre cargo'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Producto
	instanceVariableNames: 'id nombre stock precio genero'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Proveedor
	instanceVariableNames: 'id nombre productos'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Supermercado
	instanceVariableNames: 'empleados productos clientes proveedores'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"End of package definition"!

"Source Globals"!

"Classes"!

Cliente guid: (GUID fromString: '{b3b6ffa2-9a19-410b-a3bc-c506d0cd0afd}')!

Cliente comment: ''!

!Cliente categoriesForClass!SupermercadoTP-MDP2! !

!Cliente methodsFor!

actualizarApellido:nuevoApellido
	apellido := nuevoApellido.!

actualizarClave:nuevaClave
	clave := nuevaClave.!

actualizarDni: unDni
	dni := unDni.!

actualizarNombre: unNombre
	nombre := unNombre.!

aggCompra:unaCompra
	compras add:unaCompra.!

elimCompra: unaCompra
	compras remove:unaCompra ifAbsent:[nil]!

getDni
	^ dni!

getNombre
	^ nombre!

initialize
	super initialize.
	compras := OrderedCollection new.!

verCompras
	compras do: [:compra| Transcript show: compra printString; cr]! !

!Cliente categoriesForMethods!
actualizarApellido:!public! !
actualizarClave:!public! !
actualizarDni:!public! !
actualizarNombre:!public! !
aggCompra:!public! !
elimCompra:!public! !
getDni!public! !
getNombre!public! !
initialize!public! !
verCompras!public! !
!

Compra guid: (GUID fromString: '{9fe2b46e-974f-4ab4-a67f-b609399424f5}')!

Compra comment: ''!

!Compra categoriesForClass!SupermercadoTP-MDP2! !

!Compra methodsFor!

aggDetalle: unDetalle
    detalles add: unDetalle.!

calcularTotal
	|total| "Defino una variable para ir acumulando el total"

	total := 0 ."La inicio en 0"
	
	detalles do: [:detalle |	
	total := total + detalle calcularSubTotal  ].
	^ total
	!

cancelarCompra
	"Cambiar estado de la compra a Cancelada"
		estado := 'Cancelado'.!

confirmarCompra	
	cliente aggCompra: self.
	estado := 'Confirmado'.!

initialize
    detalles := OrderedCollection new.
    monto := 0. 
    estado := 'Pendiente'.
    fecha := Date today.!

verDetalles
    ^ detalles.!

verProductos
	 detalles do: [:detalle | Transcript show: detalle verProducto ]! !

!Compra categoriesForMethods!
aggDetalle:!public! !
calcularTotal!public! !
cancelarCompra!public! !
confirmarCompra!public! !
initialize!public! !
verDetalles!public! !
verProductos!public! !
!

!Compra class methodsFor!

new
    ^ super new initialize! !

!Compra class categoriesForMethods!
new!public! !
!

DetalleCompra guid: (GUID fromString: '{754090d8-d4f6-4654-9359-0aaf2e1a9166}')!

DetalleCompra comment: ''!

!DetalleCompra categoriesForClass!SupermercadoTP-MDP2! !

!DetalleCompra methodsFor!

actualizarCantidad: unaCantidad
    cantidad := unaCantidad.!

actualizarProducto: unProducto
    producto := unProducto.!

actualizarSubtotal: unSubtotal
    subtotal := unSubtotal.!

calcularSubTotal
	^ cantidad * producto getPrecio!

verCantidad
    ^ cantidad.!

verProducto	
	^ producto!

verSubtotal
    ^ subtotal.! !

!DetalleCompra categoriesForMethods!
actualizarCantidad:!public! !
actualizarProducto:!public! !
actualizarSubtotal:!public! !
calcularSubTotal!public! !
verCantidad!public! !
verProducto!public! !
verSubtotal!public! !
!

Empleado guid: (GUID fromString: '{b2b69d51-dba4-497c-a5f1-0320255ac601}')!

Empleado comment: ''!

!Empleado categoriesForClass!Unclassified! !

!Empleado methodsFor!

actualizarCargo:nuevoCargo
	cargo := nuevoCargo.!

actualizarNombre:nuevoNombre
	nombre := nuevoNombre.!

getCargo
	^ cargo!

getLegajo
	^ legajo!

getNombre
	^ nombre! !

!Empleado categoriesForMethods!
actualizarCargo:!public! !
actualizarNombre:!public! !
getCargo!public! !
getLegajo!public! !
getNombre!public! !
!

Producto guid: (GUID fromString: '{3a2efebd-5130-4f00-b971-a18233135e0f}')!

Producto comment: ''!

!Producto categoriesForClass!SupermercadoTP-MDP2! !

!Producto methodsFor!

actualizarGenero: unGenero
    genero := unGenero.!

actualizarId: unId
    id := unId.!

actualizarNombre: nuevoNombre
	nombre:=nuevoNombre.!

actualizarPrecio:nuevoPrecio
	(nuevoPrecio >0)
	ifTrue: [precio :=nuevoPrecio .
	Transcript show: 'Precio actualizado correctamente'
	] 
	ifFalse:[Transcript show: 'Ingrese un valor valido' ]
	!

aumentarStock:cant
	(cant>0)
		ifTrue: [
			stock := stock + cant.
			Transcript show:' Stock actualizado correctamente '
		]
		ifFalse:[	
			Transcript show:'Ingrese una cantidad valida'
		]!

disminuirStock:cant
	(cant <= 0)
		ifTrue:[
			Transcript show:' Ingrese una cantidad valida '
		]
		ifFalse:[
			(cant > stock)
				ifTrue:[
					Transcript show:' No hay suficiente stock '
				]
				ifFalse:[
					stock := stock - cant.
					Transcript show:' Stock actualizado correctamente '
				]
		]!

getGenero
    ^ genero.!

getId
	^ id!

getNombre
	^ nombre!

getPrecio
	^ precio!

initialize
    super initialize.
    stock := 0.!

verStock
	^ stock! !

!Producto categoriesForMethods!
actualizarGenero:!public! !
actualizarId:!public! !
actualizarNombre:!public! !
actualizarPrecio:!public! !
aumentarStock:!public! !
disminuirStock:!public! !
getGenero!public! !
getId!public! !
getNombre!public! !
getPrecio!public! !
initialize!public! !
verStock!public! !
!

!Producto class methodsFor!

new
    ^ super new initialize! !

!Producto class categoriesForMethods!
new!public! !
!

Proveedor guid: (GUID fromString: '{f28e2003-7980-4da3-8518-e69182e5020a}')!

Proveedor comment: ''!

!Proveedor categoriesForClass!SupermercadoTP-MDP2! !

!Proveedor methodsFor!

actualizarNombre: unNombre
	nombre:=unNombre.!

getId
	^ id!

suministrarProducto:unProducto cantidad:unaCantidad
	unProducto aumentarStock: unaCantidad.
	Transcript show: 'Producto suministrado correctamente'! !

!Proveedor categoriesForMethods!
actualizarNombre:!public! !
getId!public! !
suministrarProducto:cantidad:!public! !
!

Supermercado guid: (GUID fromString: '{3707201f-c80f-429c-8830-7f6096715cea}')!

Supermercado comment: ''!

!Supermercado categoriesForClass!SupermercadoMDP2! !

!Supermercado methodsFor!

aggCliente:unCliente	
	clientes add:unCliente!

aggEmpleado:unEmpleado
	empleados add: unEmpleado!

aggProducto:unProducto
	productos add:unProducto!

aggProveedor:unProveedor	
	proveedores add:unProveedor!

buscarClientePorDni: unDni
	^ clientes detect:
		[:cadaCliente | cadaCliente getDni = unDni]
		ifNone:[nil]!

buscarEmpleadoPorLegajo: unLegajo
	^ empleados detect:
		[:cadaEmpleado | cadaEmpleado getLegajo = unLegajo]
		ifNone:[nil]!

buscarProductoPorId: unId
	^ productos detect:
		[:cadaProducto | cadaProducto getId = unId]
		ifNone:[nil]!

buscarProveedorPorId: unId	
	^ proveedores detect: 
		[ :cadaProveedor | cadaProveedor getId=unId ]
		ifNone:[nil]!

cantClientes
	^ clientes size!

cantEmpleados
      ^ empleados size!

cantProds
	^productos size!

cantProveedores
	^ proveedores size!

clientesFrecuentes
    ^ clientes select: [:cliente | cliente getCompras size > 2]!

clientesSinCompras
    ^ clientes reject: [:cliente | cliente getCompras size > 0]!

contarProductosSinStock
	^ (productos select: [:producto | producto verStock = 0]) size!

elimCliente: unCliente
	clientes remove: unCliente ifAbsent:[nil]!

elimEmpleado: unEmpleado
    empleados remove: unEmpleado ifAbsent: [nil]!

elimProducto: unProducto
    productos remove: unProducto ifAbsent: [nil]!

elimProveedor: unProveedor
    proveedores remove: unProveedor ifAbsent: [nil]!

initialize
	super initialize.
	
	clientes := OrderedCollection new.
	empleados := OrderedCollection new.
	productos := OrderedCollection new.
	proveedores := OrderedCollection new.!

ObtenerNombresProducto
    ^ productos collect: [:producto | producto getNombre]!

ObtenerPrecioProducto
    ^ productos collect: [:producto | producto getPrecio]!

obtenerProductosPorGenero: unGenero
    ^ productos select: [:prod | prod getGenero = unGenero].!

productoConPocoStock
    ^ productos reject: [:producto | producto getStock > 10]!

ProductosSinStock
    ^ (productos select: [:producto | producto getStock = 0])
        collect: [:producto | producto getNombre]!

realizarPedido
	| pedido |
	pedido := OrderedCollection new.
	pedido add: #(101 5).
	pedido add: #(102 3).
	proveedores first suministrarProductos: pedido a: self.!

recibirProducto: unProducto cantidad: unaCantidad
	| prod | 
	prod := productos
		detect: [ :p | p id = unProducto id ]		
		ifNone: [ nil ].
	prod ifNotNil: [
		prod stock: prod stock + unaCantidad.
	].!

verClientes
	^ clientes!

verEmpleados
	^ empleados!

verProductos
	^productos!

verProveedores
	^ proveedores!

verStock
	Transcript show: 'P'.
	(self verProductos ifNil: [ OrderedCollection new ]) do: [ :prod |
        Transcript
            show: 'Producto: ', prod nombre;
            show: ' stock: ', prod stock printString;
            show: ' ID: ', prod id printString;
            cr.
	].! !

!Supermercado categoriesForMethods!
aggCliente:!public! !
aggEmpleado:!public! !
aggProducto:!public! !
aggProveedor:!public! !
buscarClientePorDni:!public! !
buscarEmpleadoPorLegajo:!public! !
buscarProductoPorId:!public! !
buscarProveedorPorId:!public! !
cantClientes!public! !
cantEmpleados!public! !
cantProds!public! !
cantProveedores!public! !
clientesFrecuentes!public! !
clientesSinCompras!public! !
contarProductosSinStock!public! !
elimCliente:!public! !
elimEmpleado:!public! !
elimProducto:!public! !
elimProveedor:!public! !
initialize!public! !
ObtenerNombresProducto!public! !
ObtenerPrecioProducto!public! !
obtenerProductosPorGenero:!public! !
productoConPocoStock!public! !
ProductosSinStock!public! !
realizarPedido!public! !
recibirProducto:cantidad:!public! !
verClientes!public! !
verEmpleados!public! !
verProductos!public! !
verProveedores!public! !
verStock!public! !
!

!Supermercado class methodsFor!

new
    ^super new initialize! !

!Supermercado class categoriesForMethods!
new!public! !
!

"Binary Globals"!

