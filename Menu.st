"1. Inicialización de objetos de prueba"
| miSupermercado clienteActual nuevaCompra salir opcion prod1 prod2 salto tab box |

salto := String with: Character cr with: Character lf.
tab := Character tab asString. 
prod1 := Producto new.
prod1 actualizarNombre: 'Leche'.
prod1 actualizarPrecio: 1200.
prod1 aumentarStock: 10.
prod1 actualizarGenero: 'Lacteo'.
prod1 actualizarId: 101. 

prod2 := Producto new.
prod2 actualizarNombre: 'Pan'.
prod2 actualizarPrecio: 1000.
prod2 actualizarGenero: 'Panificado'.
prod2 aumentarStock: 15.
prod2 actualizarId: 10.

miSupermercado := Supermercado new.
miSupermercado aggProducto: prod1.
miSupermercado aggProducto: prod2.

clienteActual := Cliente new.
nuevaCompra := Compra new. 

"2. Bucle principal del Menú"
salir := false.

[ salir ] whileFalse: [
    opcion := Prompter prompt: ' SUPERMAS | [1] Stock [2] Comprar [3] Carrito [4] Buscar por Género [5] Salir'.

    opcion ifNil: [ salir := true ].

    "OPCIÓN 1: Ver Stock General"
    opcion = '1' ifTrue: [ | textoStock |
        textoStock := ' REPORTE DE INVENTARIO ACTUAL' , salto , 
                      '--------------------------------' , salto , salto.
        
        (miSupermercado verProductos ifNil: [ OrderedCollection new ]) do: [ :prod |
            textoStock := textoStock , 
                          'Articulo:' , tab , prod getNombre asUppercase , salto ,
                          'Codigo:' , tab , prod getId printString , salto ,
                          'Stock:' , tab , prod verStock printString , ' unidades.' , salto ,
                          '--------------------------------' , salto.
        ].
        
        box := MessageBox new.
        box text: textoStock.
        box caption: ' Consulta de Inventario'.
        box open.
    ].

    "OPCIÓN 2: Buscar producto, restar stock y CREAR DETALLE"
    opcion = '2' ifTrue: [ | idStr cantStr prodEncontrado cant precioProd textoPrompt |
        idStr := Prompter prompt: ' Ingrese el ID del producto a comprar:'.
        idStr ifNotNil: [
            prodEncontrado := miSupermercado buscarProductoPorId: idStr asNumber.
            
            prodEncontrado ifNil: [
                box := MessageBox new. 
                box text: ' ERROR DE SISTEMA' , salto , 'El código ingresado no existe.'. 
                box caption: 'Producto no encontrado'.
                box open.
            ] ifNotNil: [
                precioProd := (prodEncontrado respondsTo: #getPrecio) 
                                ifTrue: [ prodEncontrado getPrecio ] 
                                ifFalse: [ prodEncontrado precio ].

                textoPrompt := '️ SELECCIÓN: ' , prodEncontrado getNombre asUppercase , salto ,
                               'Disponible: ' , prodEncontrado verStock printString , ' unidades' , salto ,
                               'Precio Unit: $' , precioProd printString , salto , salto ,
                               '¿Qué cantidad desea llevar?:'.

                cantStr := Prompter prompt: textoPrompt.
                
                cantStr ifNotNil: [
                    cant := cantStr asNumber.
                    
                    cant > prodEncontrado verStock ifTrue: [
                        box := MessageBox new.
                        box text: ' ERROR: Stock insuficiente.' , salto , 'Solo quedan ' , prodEncontrado verStock printString , ' unidades.'.
                        box caption: 'Falta de Stock'.
                        box open.
                    ] ifFalse: [ | nuevoDetalle subtotalItem |
                        prodEncontrado disminuirStock: cant.
                        nuevoDetalle := DetalleCompra new.
                        
                        (nuevoDetalle respondsTo: #producto:) 
                            ifTrue: [ nuevoDetalle producto: prodEncontrado ]
                            ifFalse: [ nuevoDetalle actualizarProducto: prodEncontrado ].
                            
                        (nuevoDetalle respondsTo: #cantidad:) 
                            ifTrue: [ nuevoDetalle cantidad: cant ]
                            ifFalse: [ nuevoDetalle actualizarCantidad: cant ].
                        
                        subtotalItem := precioProd * cant.
                        (nuevoDetalle respondsTo: #actualizarSubtotal:) ifTrue: [ nuevoDetalle actualizarSubtotal: subtotalItem ].
                        (nuevoDetalle respondsTo: #subtotal:) ifTrue: [ nuevoDetalle subtotal: subtotalItem ].
                        
                        nuevaCompra aggDetalle: nuevoDetalle.
                        
                        box := MessageBox new. 
                        box text: (' AGREGADO AL CARRITO' , salto , 
                                    '---------------------' , salto ,
                                    'Artículo: ' , prodEncontrado getNombre asUppercase , salto ,
                                    'Cantidad: ' , cant printString , ' u.' , salto ,
                                    'Subtotal: $' , subtotalItem printString).
                        box caption: 'Éxito'.
                        box open.
                    ].
                ].
            ].
        ].
    ].

    "OPCIÓN 3: Detalle de compra"
    opcion = '3' ifTrue: [ | textoCarrito coleccionDetalles totalCalculado |
        coleccionDetalles := nuevaCompra verDetalles ifNil: [ OrderedCollection new ].
        
        coleccionDetalles isEmpty ifTrue: [
            box := MessageBox new.
            box text: ' Tu carrito está vacío.' , salto , 'Selecciona la opción [2] para comprar.'.
            box caption: 'Carrito Vacío'.
            box open.
        ] ifFalse: [
            textoCarrito := ' MI CARRITO DE COMPRAS' , salto , 
                            '---------------------' , salto , salto.
            totalCalculado := 0.
            
            coleccionDetalles do: [ :det | | pDet cDet sDet precioFormateado |
                pDet := (det respondsTo: #producto) ifTrue: [ det producto ] ifFalse: [ det verProducto ].
                cDet := (det respondsTo: #cantidad) ifTrue: [ det cantidad ] ifFalse: [ det verCantidad ].
                precioFormateado := (pDet respondsTo: #getPrecio) ifTrue: [ pDet getPrecio ] ifFalse: [ pDet precio ].
                sDet := precioFormateado * cDet.
                totalCalculado := totalCalculado + sDet.
                textoCarrito := textoCarrito , pDet getNombre asUppercase , ' (x' , cDet printString , ' u.) ' , tab , 'Subtotal: $' , sDet printString , salto.
            ].
            
            textoCarrito := textoCarrito , '---------------------' , salto ,
                            'TOTAL ACUMULADO:' , tab , '$' , totalCalculado printString.
            
            box := MessageBox new. 
            box text: textoCarrito.
            box caption: 'Revisión de Compra'.
            box open.
        ].
    ].

    "OPCIÓN 4: Filtrar productos por Género"
    opcion = '4' ifTrue: [ | generoBuscado textoFiltrado coleccionFiltrada |
        generoBuscado := Prompter prompt: ' ¿Qué género desea buscar? (Ej: Lacteo, Panificado):'.
        
        generoBuscado ifNotNil: [
            textoFiltrado := ' RESULTADOS PARA: ' , generoBuscado asUppercase , salto ,
                             '---------------------' , salto , salto.
            
            coleccionFiltrada := miSupermercado obtenerProductosPorGenero: generoBuscado.
            
            coleccionFiltrada isEmpty ifTrue: [
                textoFiltrado := '️ No se encontraron productos cargados' , salto , 
                                 'bajo el género: ' , generoBuscado asUppercase.
            ] ifFalse: [
                coleccionFiltrada do: [ :prod |
                    textoFiltrado := textoFiltrado , 
                                     'Articulo:' , tab , prod getNombre asUppercase , salto ,
                                     'Codigo:' , tab , prod getId printString , salto ,
                                     'Stock:' , tab , prod verStock printString , ' u.' , salto ,
                                     '---------------------' , salto.
                ].
            ].
            
            box := MessageBox new.
            box text: textoFiltrado.
            box caption: ' Buscador por Categorías'.
            box open.
        ].
    ].

    "OPCIÓN 5: Salir"
    opcion = '5' ifTrue: [
        salir := true.
        box := MessageBox new. 
        box text: ('¡MUCHAS GRACIAS POR TU VISITA!' , salto , 
                   'Esperamos verte pronto de nuevo en SuperMas.').
        box caption: 'Cierre de Sesión'.
        box open.
    ].
].