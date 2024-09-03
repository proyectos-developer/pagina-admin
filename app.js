const cors = require('cors')

const express = require ('express');
const morgan = require('morgan');
const {create} = require('express-handlebars');
const path = require('path');
const flash = require ('connect-flash')
const session = require ('express-session')

const app = express()
app.use(cors())

/**Configuraciones */
const hbs = create ({
  extname: '.hbs'
})

app.set ('port', process.env.PORT || 3001);
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, 'views'));

app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/olvido-password')));
app.get('/olvido-password', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/olvido-password', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/cambiar-password')));
app.get('/cambiar-password/:usuario', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/cambiar-password', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel')));
app.get('/panel', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/clientes')));
app.get('/panel/clientes', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/clientes', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/clientes/nuevo')));
app.get('/panel/clientes/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/clientes/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/clientes/cliente')));
app.get('/panel/clientes/cliente/:cliente/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/clientes/cliente', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/tipos-proyectos')));
app.get('/panel/tipos-proyectos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/tipos-proyectos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/tipos-proyectos/nuevo')));
app.get('/panel/tipos-proyectos/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/tipos-proyectos/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/tipos-proyectos/tipo-proyecto')));
app.get('/panel/tipos-proyectos/tipo-proyecto/:tipo-proyecto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/tipos-proyectos/tipo-proyecto', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/proyectos')));
app.get('/panel/proyectos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/proyectos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/proyectos/nuevo')));
app.get('/panel/proyectos/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/proyectos/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/proyectos/proyecto')));
app.get('/panel/proyectos/proyecto/:proyecto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/proyectos/proyecto', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/productos')));
app.get('/panel/productos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/productos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/productos/nuevo')));
app.get('/panel/productos/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/productos/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/productos/producto')));
app.get('/panel/productos/producto/:producto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/productos/producto', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compradores')));
app.get('/panel/compradores', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compradores', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compradores/comprador')));
app.get('/panel/compradores/comprador/:comprador/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compradores/comprador', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/favoritos')));
app.get('/panel/favoritos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/favoritos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/favoritos/producto')));
app.get('/panel/favoritos/producto/:producto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/favoritos/producto', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/calificaciones')));
app.get('/panel/calificaciones', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/calificaciones', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/calificaciones/producto')));
app.get('/panel/calificaciones/producto/:producto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/calificaciones/producto', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compradores')));
app.get('/panel/compradores', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compradores', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compradores/comprador')));
app.get('/panel/compradores/comprador/:comprador/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compradores/comprador', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compras')));
app.get('/panel/compras', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compras', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compras/productos')));
app.get('/panel/compras/productos/:shop_id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compras/productos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/categorias-noticias')));
app.get('/panel/categorias-noticias', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/categorias-noticias', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/categorias-noticias/nuevo')));
app.get('/panel/categorias-noticias/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/categorias-noticias/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/categorias-noticias/categoria-noticia')));
app.get('/panel/categorias-noticias/categoria-noticia/:categoria-noticia/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/categorias-noticias/categoria-noticia', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/areas-empresas')));
app.get('/panel/areas-empresas', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/areas-empresas', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/areas-empresas/nuevo')));
app.get('/panel/areas-empresas/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/areas-empresas/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/areas-empresas/area-empresa')));
app.get('/panel/areas-empresas/area-empresa/:area-empresa/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/areas-empresas/area-empresa', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/trabajadores')));
app.get('/panel/trabajadores', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/trabajadores', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/trabajadores/nuevo')));
app.get('/panel/trabajadores/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/trabajadores/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/trabajadores/trabajador')));
app.get('/panel/trabajadores/trabajador/:trabajador/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/trabajadores/trabajador', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/notificaciones')));
app.get('/panel/notificaciones', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/notificaciones', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/notificaciones/notificacion')));
app.get('/panel/notificaciones/notificacion', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/notificaciones/notificacion', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/mensajes')));
app.get('/panel/mensajes', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/mensajes', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/mensajes/mensaje')));
app.get('/panel/mensajes/mensaje', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/mensajes/mensaje', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/reuniones')));
app.get('/panel/reuniones', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/reuniones', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/reuniones/reunion')));
app.get('/panel/reuniones/reunion', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/reuniones/reunion', 'index'));
});

//Iniciar el servidor
app.listen (app.get('port'), () => {
    console.log ('Server en puerto ', app.get ('port'))
})
