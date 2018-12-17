
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import { graficaData } from '../classes/grafica';

const router = Router();
const grafica = new graficaData();


router.get('/grafica', ( req: Request, res: Response  ) => {

    res.json(grafica.getdata());

});

router.post('/grafica', ( req: Request, res: Response  ) => {

    const mes = req.body.mes;
    const unidad =Number( req.body.unidad);


    grafica.incementarvalor(mes, unidad);
    const server = Server.instance;
    server.io.emit('cambia-grafica', grafica.getdata() );


    res.json(grafica.getdata());

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload = {
        de,
        cuerpo
    }


    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (  req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( ( err: any, clientes: string[] ) => {

        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            clientes
        });


    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

    
});




export default router;


