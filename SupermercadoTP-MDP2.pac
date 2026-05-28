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
	'..\..\Pictures\Core\Object Arts\Dolphin\Base\Dolphin'
	'..\..\Pictures\Core\Object Arts\Dolphin\Base\Dolphin Message Box'
	'..\..\Pictures\Core\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter').

package!

"Class Definitions"!

Object subclass: #Cliente
	instanceVariableNames: 'dni clave nombre apellido compras clientes'
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

aggCliente:unCliente	
	clientes add:unCliente!

aggCompra:unaCompra
	compras add:unaCompra.!

buscarClientePorDni: unDni
	^ clientes detect: [ :cadaCliente | cadaCliente getDni = unDni ] ifNone: [ nil ]!

cantClientes
	^ clientes size!

initialize
	super initialize.
	clientes := OrderedCollection new.!

modificarNombreCliente: unDni nuevoNombre: unNombre
	| cliente |
	
	cliente := self buscarClientePorDni: unDni. "<- Usamos el método correcto por posición"
	
	cliente ~= nil ifTrue: [ cliente setNombre: unNombre ]!

setNombre: unNombre
	nombre := unNombre.!

verClientes
	^ clientes!

verCompras
	compras do: [:compra| Transcript show: compra printString; cr]! !

!Cliente categoriesForMethods!
aggCliente:!public! !
aggCompra:!public! !
buscarClientePorDni:!public! !
cantClientes!public! !
initialize!public! !
modificarNombreCliente:nuevoNombre:!public! !
setNombre:!public! !
verClientes!public! !
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
	ifTrue: [precio :=nuevoPrecio .
	Transcript show: 'Precio actualizado correctamente'
	] 
	ifFalse:[Transcript show: 'Ingrese un valor valido' ]
	!

aumentarStock:cant
	(cant>0)
		ifFalse:[	
		Transcript show:'Ingrese una cantidad valida'].
	stock:=stock + cant.
	Transcript show:'Stock actualizado correctamente'!

disminuirStock:cant
	(cant>0)
		ifFalse:[	
		Transcript show:'Ingrese una cantidad valida'].
	stock:=stock - cant.
	Transcript show:'Stock actualizado correctamente'!

getPrecio
	^ precio!

id
    ^id!

id: unNumero
	id := unNumero.
	^self!

initialize
	super initialize.
	stock := 0.
	precio := 0.!

nombre
    ^nombre!

nombre: unTexto
	nombre := unTexto.
	^self!

precio
    ^precio!

precio: unNumero
	precio := unNumero.
	^self!

stock
    ^stock!

stock: unNumero
	stock :=unNumero.
	^self!

verStock
	^ stock! !

!Producto categoriesForMethods!
actualizarPrecio:!public! !
aumentarStock:!public! !
disminuirStock:!public! !
getPrecio!public! !
id!public! !
id:!public! !
initialize!public! !
nombre!public! !
nombre:!public! !
precio!public! !
precio:!public! !
stock!public! !
stock:!public! !
verStock!public! !
!

Proveedor guid: (GUID fromString: '{f28e2003-7980-4da3-8518-e69182e5020a}')!

Proveedor comment: ''!

!Proveedor categoriesForClass!SupermercadoTP-MDP2! !

!Proveedor methodsFor!

addProducto: unProducto
    productos add: unProducto.!

id
	^id!

id: unNumero
	id := unNumero.
	^self!

initialize
	super initialize.
	productos := OrderedCollection new.
	!

nombre
	^nombre!

nombre: unTexto
	nombre := unTexto.
	^self!

productos
	^productos!

suministrarProductos: unPedido a: unSuper
	| id cant producto |
	unPedido do: [ :prod |
		id := prod first.
		cant := prod second.
		producto := productos
			detect: [ :p | p id = id ]
			ifNone: [ nil ].  
		producto ifNotNil: [
			unSuper
				recibirProducto: producto
				cantidad: cant.
			Transcript
				show: 'Proveedor suministro ';
				show: producto nombre;
				show: ' cantidad ';
				show: cant printString;
				cr.
		].
		producto ifNil: [
			Transcript
			show: 'Proveedor tiene producto con id ';
			show: id printString;
			cr.
		].
	].
	! !

!Proveedor categoriesForMethods!
addProducto:!public! !
id!public! !
id:!public! !
initialize!public! !
nombre!public! !
nombre:!public! !
productos!public! !
suministrarProductos:a:!public! !
!

!Proveedor class methodsFor!

new
    ^super new initialize! !

!Proveedor class categoriesForMethods!
new!public! !
!

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

initialize
	| prov1 p1 p2 |
	super initialize.
	Transcript show: 'INITIALIZE EJECUTADO'; cr.
	empleados := OrderedCollection new.
	productos := OrderedCollection new.
	clientes := OrderedCollection new.
	proveedores := OrderedCollection new.
	p1 := Producto new id: 101; nombre: 'arroz'; stock: 10; precio: 12.
	p2 := Producto new id: 102; nombre: 'fideo'; stock: 15; precio: 15.
	productos add: p1.
	productos add: p2.
	prov1 := Proveedor new id: 01; nombre: 'pablo scobar'.
	prov1 addProducto: p1.
	prov1 addProducto: p2.
	proveedores add: prov1.
	!

menu
	| opc salir texto |
	salir := false.
	[salir] whileFalse: [
		Transcript clear. 
		Transcript show: '1 - Vet stock'; cr.
		Transcript show: '2 - realizar Pedido'; cr.
		Transcript show: 'S - Salir'; cr.
		texto :=Prompter prompt: 'Ingresa opcion' .
		(texto isNil or: [ texto asUppercase = 'S' ])
			ifTrue: [
				salir := true
			]
			ifFalse: [
				[ opc := texto asNumber ] on: Error do: [ :ex | opc := 0 ].
				(opc between: 1 and: 2)
					ifTrue: [
						opc = 1 ifTrue: [
							Transcript clear.
							Transcript show: 'STOCK'; cr.
							self verStock.
							Prompter prompt: 'Presione ENTER para volver al menú'.
						].
						opc = 2 ifTrue: [
							Transcript clear.
							Transcript show: 'PEDIDO'; cr.
							self realizarPedido.
							Prompter prompt: 'Presione ENTER para volver al menú'.
						].
					]
					ifFalse: [
						MessageBox notify: 'opcion incorrecta' .
					].
 			].
	].!

modCliente:unaPos nuevoCliente:unCliente
	((unaPos between: 1 and: self cantClientes) and: [(empleados at:unaPos) ~= nil])
	ifTrue: [^ empleados at:unaPos put:unCliente ]
	ifFalse:[^ nil]!

modEmpleado:unaPos nuevoEmpleado:unEmpleado
	((unaPos between: 1 and: self cantEmpleados) and: [(empleados at: unaPos)~= nil])
	ifTrue: [empleados at:unaPos put:unEmpleado]
	ifFalse:[^ nil]!

modProd: unaPos nuevoProd: nuevoProd
	(unaPos between: 1 and: self cantProds)
		ifTrue: [
			productos at: unaPos put: nuevoProd. 
			^ true "Imprimimos true porque la modificacion fue exitosa"
		]
		ifFalse: [ ^ false ] " Devolvemos false porque la posición no existía"!

modProveedor: unaPos nuevoProveedor:unProveedor
	((unaPos between: 1 and: self cantProveedores) and: [(proveedores at:unaPos) notNil])
	ifTrue: [^ proveedores at:unaPos put:unProveedor]
	ifFalse:[^ nil]
	!

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
initialize!public! !
menu!public! !
modCliente:nuevoCliente:!public! !
modEmpleado:nuevoEmpleado:!public! !
modProd:nuevoProd:!public! !
modProveedor:nuevoProveedor:!public! !
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

