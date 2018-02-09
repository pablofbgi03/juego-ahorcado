window.onload = function() {

    var c = document.getElementById("tablero");
    var ctx = c.getContext("2d");

    var cadena;
    var contador = 0;
    var fallos = 0;
    var aciertos = 0;
    var palabra;

    var letrasusadas = " ";

    //palabras en juego
    var palabras = ["CAMINO", "MOTOCICLETA", "RECTANGULO", "SEVILLA", "GIJON", "LANGREO", "RECICLA", "PERRO", "GATO"];

    //Funcion para numeros aleatorios
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    //recarga la pagina al tocar el boton
    $("#volver").click(function() {
        location.reload();
    });
    //prepara el tablero de juego
    $("#jugar").click(function() {
        $("#modelo").toggle();
        $("#jugar").toggle();

        $("#usadas").toggle();
        $("#intro").toggle();
        comienzo()
    });


    //Funcion para dibujar los espacios de la palabra
    function comienzo() {
        palabra = palabras[random(0, 9)];
        cadena = palabra.split('');

        for (let index = 0; index < cadena.length; index++) {


            if (index == 0 || index == cadena.length - 1) {
                $("#controles").append("<span id=" + index + ">" + cadena[index] + "</span>");
                //acumula las letras de las pistas y las muestra como usadas
                letrasusadas += cadena[index];
                $("#usadas").append("<span> " + cadena[index] + " </span>");
            } else {
                //dibuja los guiones
                $("#controles").append("<span id=" + index + "> _ </span");
            }
        }

    }
    //captura las teclas pulsadas
    $(document).keypress(function(e) {

        //control sobre el array de las letras usadas
        if (letrasusadas.indexOf(String.fromCharCode(e.which).toUpperCase()) == -1) {

            $("#usadas").append("<span> " + String.fromCharCode(e.which).toUpperCase() + " </span>");

            for (let index = 1; index < cadena.length - 1; index++) {
                if (cadena[index] == String.fromCharCode(e.which).toUpperCase()) {
                    $("#" + index).text(cadena[index]);
                    fallos++;
                    aciertos++;
                }
            }
            //si ninguna letra coincide llama a las funciones de dibujar tramos
            if (fallos == 0 && contador < 10) {

                contador++;
                tramo = eval("a" + contador);
                tramo();
            }
            //cuenta las letras acertadas para saber que se ha ganado
            if (aciertos == (cadena.length - 2)) {
                $("#ganador").toggle();
                $("#tablero").toggle();
                $("#usadas").toggle();
                $("#reinicia").toggle();
                $(document).off();
            }
            fallos = 0;

            letrasusadas += String.fromCharCode(e.which).toUpperCase();
        }
    });





    //base de la horca
    function a1() {
        ctx.strokeStyle = "brown";
        ctx.lineWidth = 10;
        ctx.lineJoin = "round";
        ctx.moveTo(10, 450);
        ctx.lineTo(300, 450);
        ctx.stroke();
    }
    //mastil de la horca
    function a2() {
        ctx.moveTo(155, 450);
        ctx.lineTo(155, 20);
        ctx.stroke();

    }
    //voladizo de la horca
    function a3() {
        ctx.lineTo(360, 20);
        ctx.stroke();
    }
    //cuerda
    function a4() {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(350, 20);
        ctx.lineTo(350, 100);
        ctx.stroke();
    }
    //cabeza
    function a5() {

        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(350, 130, 30, 0, 2 * Math.PI);

        ctx.stroke();
    }

    //tronco
    function a6() {
        ctx.moveTo(350, 160);
        ctx.lineTo(350, 280);
        ctx.stroke();
    }
    //brazos
    function a7() {
        ctx.moveTo(350, 180);
        ctx.lineTo(300, 240);
        ctx.stroke();

    }

    function a8() {
        ctx.moveTo(350, 180);
        ctx.lineTo(400, 240);
        ctx.stroke();
    }
    //piernas
    function a9() {
        ctx.moveTo(350, 280);
        ctx.lineTo(300, 350);
        ctx.stroke();
    }

    function a10() {
        ctx.moveTo(350, 280);
        ctx.lineTo(400, 350);
        ctx.stroke()
        $("#perdedor").toggle();
        $("#tablero").toggle();
        $("#solucion").append("<span> " + palabra + " </span>");
        $("#controles").toggle();
        $("#usadas").toggle();
        $("#solucion").toggle();
        $("#reinicia").toggle();
        $(document).off();
    }

}