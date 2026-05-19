| package |
package := Package name: 'SupermercadoTP-MDP2'.
package paxVersion: 1;
	basicComment: ''.

package classNames
	add: #Cliente;
	add: #Compra;
	add: #DetalleCompra;
	add: #Producto;
	add: #Supermercado;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'..\..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin').

package!

"Class Definitions"!

Object subclass: #Cliente
	instanceVariableNames: 'dni clave nombre apellido compras'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Compra
	instanceVariableNames: 'idcompra dnicliente monto fecha detalles'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #DetalleCompra
	instanceVariableNames: 'id compra producto cantidad subtotal'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

Object subclass: #Producto
	instanceVariableNames: 'id nombre categoria stock precio'
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

Compra guid: (GUID fromString: '{9fe2b46e-974f-4ab4-a67f-b609399424f5}')!

Compra comment: ''!

!Compra categoriesForClass!SupermercadoTP-MDP2! !

DetalleCompra guid: (GUID fromString: '{754090d8-d4f6-4654-9359-0aaf2e1a9166}')!

DetalleCompra comment: ''!

!DetalleCompra categoriesForClass!SupermercadoTP-MDP2! !

Producto guid: (GUID fromString: '{3a2efebd-5130-4f00-b971-a18233135e0f}')!

Producto comment: ''!

!Producto categoriesForClass!SupermercadoTP-MDP2! !

Supermercado guid: (GUID fromString: '{3707201f-c80f-429c-8830-7f6096715cea}')!

Supermercado comment: ''!

!Supermercado categoriesForClass!SupermercadoMDP2! !

!Supermercado methodsFor!

aggProducto:unProducto
	productos add:unProducto!

buscarProd: unProducto
	^productos includes: unProducto!

cantProds
	^productos size!

elimProducto: unProducto
	(productos includes: unProducto)
		ifTrue: [productos remove:unProducto ]
		ifFalse:[Transcript show: 'El producto que intenta borrar no existe']!

modProd:unaPos nuevoProd:nuevoProd
	(unaPos between: 1 and: self cantProds )
	ifTrue: [
	productos at: unaPos put:nuevoProd 
	]
	ifFalse:[
	Transcript show: 'Posición invalida'
	]
	
	!

verProductos
^productos! !

!Supermercado categoriesForMethods!
aggProducto:!public! !
buscarProd:!public! !
cantProds!public! !
elimProducto:!public! !
modProd:nuevoProd:!public! !
verProductos!public! !
!

"Binary Globals"!

