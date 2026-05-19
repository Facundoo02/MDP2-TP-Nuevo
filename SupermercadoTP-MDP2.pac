| package |
package := Package name: 'SupermercadoTP-MDP2'.
package paxVersion: 1;
	basicComment: ''.

package classNames
	add: #Cliente;
	add: #Compra;
	add: #DetalleCompra;
	add: #Producto;
	add: #Proveedor;
	add: #Supermercado;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'..\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin').

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

Object subclass: #Producto
	instanceVariableNames: 'id nombre stock precio'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Proveedor
	instanceVariableNames: 'id nombre'
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

aggCompra:unaCompra
	compras add:unaCompra!

verCompras
	compras do: [:compra| Transcript show: compra printString; cr]! !

!Cliente categoriesForMethods!
aggCompra:!public! !
verCompras!public! !
!

Compra guid: (GUID fromString: '{9fe2b46e-974f-4ab4-a67f-b609399424f5}')!

Compra comment: ''!

!Compra categoriesForClass!SupermercadoTP-MDP2! !

!Compra methodsFor!

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

verProductos
	 detalles do: [:detalle | Transcript show: detalle verProducto ]! !

!Compra categoriesForMethods!
calcularTotal!public! !
cancelarCompra!public! !
confirmarCompra!public! !
verProductos!public! !
!

DetalleCompra guid: (GUID fromString: '{754090d8-d4f6-4654-9359-0aaf2e1a9166}')!

DetalleCompra comment: ''!

!DetalleCompra categoriesForClass!SupermercadoTP-MDP2! !

!DetalleCompra methodsFor!

calcularSubTotal
	^ cantidad * producto getPrecio!

verProducto	
	^ producto! !

!DetalleCompra categoriesForMethods!
calcularSubTotal!public! !
verProducto!public! !
!

Producto guid: (GUID fromString: '{3a2efebd-5130-4f00-b971-a18233135e0f}')!

Producto comment: ''!

!Producto categoriesForClass!SupermercadoTP-MDP2! !

!Producto methodsFor!

actualizarPrecio:nuevoPrecio
	(nuevoPrecio >0)
	ifTrue: [precio :=nuevoPrecio 
	Transcript show: 'Precio actualizado correctamente'
	] 
	ifFalse:[Transcript show: 'Ingrese un valor valido' ]
	!

aumentarStock:cant
	(cant>0)
		ifFalse:[	
		Transcript show:'Ingrese una cantidad valida'].
	stock:=stock + cant
	Transcript show:'Stock actualizado correctamente'!

disminuirStock:cant
	(cant>0)
		ifFalse:[	
		Transcript show:'Ingrese una cantidad valida'].
	stock:=stock - cant
	Transcript show:'Stock actualizado correctamente'!

getPrecio
	^ precio!

verStock
	^ stock! !

!Producto categoriesForMethods!
actualizarPrecio:!public! !
aumentarStock:!public! !
disminuirStock:!public! !
getPrecio!public! !
verStock!public! !
!

Proveedor guid: (GUID fromString: '{f28e2003-7980-4da3-8518-e69182e5020a}')!

Proveedor comment: ''!

!Proveedor categoriesForClass!SupermercadoTP-MDP2! !

Supermercado guid: (GUID fromString: '{3707201f-c80f-429c-8830-7f6096715cea}')!

Supermercado comment: ''!

!Supermercado categoriesForClass!SupermercadoMDP2! !

!Supermercado methodsFor!

aggCliente:unCliente	
	clientes add:unCliente!

aggEmpleado:unEmpleado
	productos add: unEmpleado!

aggProducto:unProducto
	productos add:unProducto!

aggProveedor:unProveedor	
	proveedores add:unProveedor!

buscarCliente:unaPos	
	(unaPos between: 1 and: self cantClientes )
	ifTrue: [^ clientes at:unaPos ]
	ifFalse:[^ nil]!

buscarEmpleado:unaPos
	((unaPos between: 1 and:self cantEmpleados) and: [(empleados at:unaPos) ~= nil])
	ifTrue: [^ empleados at:unaPos]
	ifFalse:[^ nil]!

buscarProd: unaPos
	((unaPos between: 1 and:self cantProds ) and: [(empleados at:unaPos) ~= nil])
	ifTrue: [^ productos at:unaPos]
	ifFalse:[^ nil]!

buscarProveedor:unaPos	
	(unaPos between: 1 and: self cantProveedores )
	ifTrue: [^ proveedores at:unaPos ]
	ifFalse:[^ nil]!

cantClientes
	^ clientes size!

cantEmpleados
      ^ empleados size!

cantProds
	^productos size!

cantProveedores
	^ proveedores size!

elimCliente:unCliente
	(clientes includes: unCliente)
	ifTrue: [^ clientes remove:unCliente]
	ifFalse:[^ nil]!

elimEmpleado:unEmpleado
	(productos includes: unEmpleado)
	ifTrue: [^ productos remove: unEmpleado]
	ifFalse:[ ^ nil]!

elimProducto: unProducto
	(productos includes: unProducto)
		ifTrue: [^ productos remove:unProducto ]
		ifFalse:[ ^ nil]!

elimProveedor:unProveedor
	(proveedores includes:unProveedor )
	ifTrue: [^ proveedores remove:unProveedor]
	ifFalse:[^ nil]!

modCliente:unaPos nuevoCliente:unCliente
	((unaPos between: 1 and: self cantClientes) and: [(empleados at:unaPos) ~= nil])
	ifTrue: [^ empleados at:unaPos put:unCliente ]
	ifFalse:[^ nil]!

modEmpleado:unaPos nuevoEmpleado:unEmpleado
	((unaPos between: 1 and: self cantEmpleados) and: [(empleados at: unaPos)~= nil])
	ifTrue: [empleados at:unaPos put:unEmpleado]
	ifFalse:[^ nil]!

modProd:unaPos nuevoProd:nuevoProd
	(unaPos between: 1 and: self cantProds )
	ifTrue: [
	productos at: unaPos put:nuevoProd 
	]
	ifFalse:[^ nil]
	
	!

modProveedor: unaPos nuevoProveedor:unProveedor
	((unaPos between: 1 and: self cantProveedores) and: [(proveedores at:unaPos) notNil])
	ifTrue: [^ proveedores at:unaPos put:unProveedor]
	ifFalse:[^ nil]
	!

verClientes
	^ clientes!

verEmpleados
	^ empleados!

verProductos
^productos!

verProveedores
	^ proveedores! !

!Supermercado categoriesForMethods!
aggCliente:!public! !
aggEmpleado:!public! !
aggProducto:!public! !
aggProveedor:!public! !
buscarCliente:!public! !
buscarEmpleado:!public! !
buscarProd:!public! !
buscarProveedor:!public! !
cantClientes!public! !
cantEmpleados!public! !
cantProds!public! !
cantProveedores!public! !
elimCliente:!public! !
elimEmpleado:!public! !
elimProducto:!public! !
elimProveedor:!public! !
modCliente:nuevoCliente:!public! !
modEmpleado:nuevoEmpleado:!public! !
modProd:nuevoProd:!public! !
modProveedor:nuevoProveedor:!public! !
verClientes!public! !
verEmpleados!public! !
verProductos!public! !
verProveedores!public! !
!

"Binary Globals"!

