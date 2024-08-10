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

//Iniciar el servidor
app.listen (app.get('port'), () => {
    console.log ('Server en puerto ', app.get ('port'))
})
