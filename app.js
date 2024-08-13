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
app.get('/cambiar-password', (req, res) => {
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

app.use(express.static(path.resolve(__dirname, './client/build/panel/clientes')));
app.get('/panel/clientes/:cliente/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/clientes', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/tipos-proyectos')));
app.get('/panel/tipos-proyectos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/tipos-proyectos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/tipos-proyectos/nuevo')));
app.get('/panel/tipos-proyectos/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/tipos-proyectos/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/tipos-proyectos')));
app.get('/panel/tipos-proyectos/:tipo-proyecto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/tipos-proyectos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/proyectos')));
app.get('/panel/proyectos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/proyectos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/proyectos/nuevo')));
app.get('/panel/proyectos/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/proyectos/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/proyectos')));
app.get('/panel/proyectos/:proyecto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/proyectos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/productos')));
app.get('/panel/productos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/productos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/productos/nuevo')));
app.get('/panel/productos/nuevo', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/productos/nuevo', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/productos')));
app.get('/panel/productos/:producto/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/productos', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compradores')));
app.get('/panel/compradores', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compradores', 'index'));
});

app.use(express.static(path.resolve(__dirname, './client/build/panel/compradores')));
app.get('/panel/compradores/:comprador/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/panel/compradores', 'index'));
});

//Iniciar el servidor
app.listen (app.get('port'), () => {
    console.log ('Server en puerto ', app.get ('port'))
})
