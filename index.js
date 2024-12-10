import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express(); 

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        httpOnly: true, 
        maxAge: 1000 * 60 * 30 
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'pages/public')));

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function cadastroUsuarioView(req, res) {
    res.send(`
        <html>
<head>
    <title>Cadastro de Usuário</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXhW+ALEwIH" crossorigin="anonymous">
    <meta charset="utf-8">
    <style>
      
        body {
            font-family: Georgia, serif;
            background-color: #f7f9fc;
            color: #343a40;
        }

      
        .container {
            max-width: 600px;
            margin-top: 50px;
            padding: 30px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        
        h1 {
            font-size: 1.8em;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
        }
        .btn-primary {
            background-color: #2c3e50;;
            color: white;
            font-weight: bold;
            transition: background-color 0.3s ease;
            width: 50%;
        }

        .btn-primary:hover {
            background-color: #C0C0C0;
        }

       
        .form-label {
            font-weight: 500;
            color: #555;
        }

        .form-control, .form-select {
            border-radius: 4px;
        }
    </style>
</head>
<body>
<center>
    <div class="container">
        <h1>Cadastro de Usuário</h1>
        <form method="POST" action="/cadastrarUsuario" class="row g-3" novalidate>
            <div class="col-md-12">
                <label for="des" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="des" name="nome">
            </div>
            <div class="col-md-12">
                <label for="data" class="form-label">Data de Nascimento:</label>
                <input type="date" class="form-control" id="data" name="data" >
            </div>
            <div class="col-md-12">
                <label for="nome" class="form-label">Nickname ou Apelido:</label>
                <input type="text" class="form-control" id="nome" name="nick" >
            </div>
             <br>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
            </div>
        </form>
    </div>
        </center>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
    `);
}

function menuView(req, resp) {
    const dataHoraUltimoAcesso= req.cookies['dataHoraUltimoAcesso'];
    if(!dataHoraUltimoAcesso){
        dataHoraUltimoAcesso='';
    }
    resp.send(` <html>
<head>
    <title>Menu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXhW+ALEwIH" crossorigin="anonymous">
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f9;
            color: #343a40;
        }

        .navbar-custom {
            background-color: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 1rem;
        }

        .navbar-brand {
            font-weight: bold;
            font-size: 1.5em;
            color: #2c3e50;
            transition: color 0.3s;
        }

        .navbar-brand:hover {
            color: #1e90ff;
        }

        .navbar-nav .nav-link {
            font-weight: 500;
            color: #343a40;
            transition: color 0.3s;
        }

        .navbar-nav .nav-link:hover, 
        .navbar-nav .nav-link.active {
            color: #1e90ff;
            font-weight: 600;
        }

        .navbar-nav .nav-item {
            margin-left: 20px;
        }
    </style>
</head>
<body>
   <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Menu</a>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/cadastrarUsuario">Cadastrar Usuários</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/postarMensagens">Bate - Papo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                        Seu último acesso foi em ${dataHoraUltimoAcesso}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>`)
}
var listaMensagens = [];

function postarMensagem(req, resp) {
    if (req.method === "POST") {
        const { userId, message } = req.body;
        const user = listaUsuarios.find(u => u.nick === userId);
        
        if (user) {
            const novaMensagem = {
                user: user.nome,
                nick: userId,
                message: message,
                timestamp: new Date().toLocaleString()
            };
            listaMensagens.push(novaMensagem);
        }
        resp.redirect('/postarMensagens'); 
    } else {
        const users = listaUsuarios.map(user => `<option value="${user.nick}">${user.nome}</option>`).join('');
        const messagesHtml = listaMensagens.map(msg => `
            <li><strong>${msg.nick}</strong> (${msg.timestamp}): ${msg.message}</li>
        `).join('');
        
        resp.send(`
            <html>
            <head>
                <meta charset="UTF-8">

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <title>Bate-Papo</title>
            </head>
            <body>
                <div class="container">
                    <h1>Bate-Papo</h1>
                    <form action="/postarMensagem" method="POST">
                        <div class="mb-3">
                            <label for="user" class="form-label">Usuário:</label>
                            <select class="form-select" name="userId" id="user" required>
                                <option value="" disabled selected>Selecione um usuário</option>
                                ${users}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Mensagem:</label>
                            <textarea class="form-control" name="message" id="message" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                        <a class="btn btn-primary" href="/logout" role="button">Sair</a>
                        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
                    </form>
                    <hr>
                    <h2>Mensagens</h2>
                    <ul>
                        ${messagesHtml}
                    </ul>
                </div>
            </body>
            </html>
        `);
    }
}


function cadastraUsuario(req, resp) {

    const nome = req.body.nome;
    const data = req.body.data;
    const nick = req.body.nick;


    const dataHoraUltimoAcesso= req.cookies['dataHoraUltimoAcesso'];
    if(!dataHoraUltimoAcesso){
        dataHoraUltimoAcesso='';
    }

    if (nome && data && nick  ) {
        const usuario = {nome,data, nick };

    listaUsuarios.push(usuario);
    resp.write(`<html>
    <head>
        <title>Lista de Usuários</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXhW+ALEwIH" crossorigin="anonymous">
        <meta charset="utf-8">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f6f9;
                color: #343a40;
            }
            .container {
                max-width: 900px;
                margin-top: 50px;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            h1 {
                color: #2c3e50;
                text-align: center;
                margin-bottom: 20px;
                font-size: 1.8em;
            }
            .table {
                margin-top: 20px;
                border-collapse: collapse;
            }
            .table thead {
                background-color: #2c3e50;
                color: #ffffff;
                text-align: left;
            }
            .table th, .table td {
                padding: 12px 15px;
            }
            .table tbody tr {
                transition: background-color 0.3s ease;
            }
            .table tbody tr:hover {
                background-color: #f1f3f5;
            }
            .btn {
                margin-top: 20px;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 1em;
            }
            .btn-primary {
                background-color: #1e90ff;
                border: none;
                transition: background-color 0.3s;
                 color: white;

            }
            .btn-primary:hover {
                background-color: #0066cc;
                 color: white;
            }
            .btn-secondary {
                background-color: #6c757d;
                border: none;
                transition: background-color 0.3s;
                 color: white;
            }
            .btn-secondary:hover {
                background-color: #5a6268;
                 color: white;
            }
            .d-flex {
                justify-content: space-between;
                align-items: center;
            }
                
        </style>
    </head>
    <body>
    <center>
        <div class="container">
            <h1>Lista de Usuários</h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nome:</th>
                        <th scope="col">Data de Nascimento:</th>
                        <th scope="col">Nickname ou Apelido</th>
                    </tr>
                </thead>
                <tbody>
                    ${listaUsuarios.map(usuario => `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.data}</td>
                            <td>${usuario.nick}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="d-flex">
                <a class="btn btn-primary" href="/cadastrarUsuario">Continuar Cadastrando</a>
                <a class="btn btn-secondary" href="/">Voltar ao Menu</a>
            </div>
        </div>
        </center>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN6jIeHz" crossorigin="anonymous"></script>
    </body>
</html>

`);
    }else{
        resp.write(` <html>
            <head>
                <title>Cadastro de Usuário</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXhW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
                <style>
                  
                    body {
                        font-family: Georgia, serif;
                        background-color: #f7f9fc;
                        color: #343a40;
                    }
            
                  
                    .container {
                        max-width: 600px;
                        margin-top: 50px;
                        padding: 30px;
                        background-color: #ffffff;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }
            
                    
                    h1 {
                        font-size: 1.8em;
                        color: #2c3e50;
                        text-align: center;
                        margin-bottom: 20px;
                        font-weight: bold;
                    }
                    .btn-primary {
                        background-color: #2c3e50;;
                        color: white;
                        font-weight: bold;
                        transition: background-color 0.3s ease;
                        width: 50%;
                    }
            
                    .btn-primary:hover {
                        background-color: #C0C0C0;
                    }
            
                   
                    .form-label {
                        font-weight: 500;
                        color: #555;
                    }
            
                    .form-control, .form-select {
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
            <center>
                <div class="container">
                    <h1>Cadastro de Usuário</h1>
                   <form method="POST" action="/cadastrarUsuario" class="row g-3" novalidate>
            
                       <div class="col-md-12">
                            <label for="des" class="form-label">Nome:</label>
                            <input type="text" class="form-control" id="des" name="des" value="${nome}">
                            `);
                    if (!nome) {
                        resp.write(`
                                    <div>
                                       <span><p style="color: red;" >Você deve informar seu Nome</p></span> 
                                    </div>`);
                    }
                    resp.write(`</div>
            <div class="col-md-12">
                <label for="data" class="form-label">Data de Nascimento:</label>
                <input type="date" class="form-control" id="data" name="data" value="${data}" >`);
                    if (!data) {
                        resp.write(`
                          <div>
                              <span>
                               <p style="color: red;">Você deve informar sua data de Nascimento</p>
                              </span> 
                         </div>`);
                    }
                    resp.write(` </div>
                                <div class="col-md-12">
                                    <label for="nome" class="form-label">Nickname ou Apelido:</label>
                                    <input type="text" class="form-control" id="nome" name="nome" value="${nick}" >`);
                    if (!nick) {
                        resp.write(`
                                    <div>
                                       <span><p style="color: red;" >Você deve informar o seu Nickname ou Apelido</p></span> 
                                    </div>`);
                    }
                    resp.write(`</div>
                                    <br>
                                    <div class="col-12">
                                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <p>
                                    <span>Seu último acesso foi em ${dataHoraUltimoAcesso}</span>
                                </p>
                            </div>
                                </center>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                        </body>
                        </html>`);

                    }

        resp.end();
}
function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    const email = req.body.email;

    if(usuario === 'admin' && senha === '123' && email === 'emailadmin@gmail.com'){
        req.session.usuarioLogado= true;
        resp.cookie('dataHoraUltimoAcesso', new Date().toLocaleDateString(), {maxAge: 1000 * 60 * 24 * 30, httpOnly: true });
        resp.redirect('/');
    }else{
        resp.send(`
            <html>
                <head>
                     <meta charset="utf-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container w-25">
                        <div class="alert alert-danger" role="alert">
                            Usuário ou senha inválidos!
                        </div>
                        <div>
                        <a href="/login.html" class="bnt-primary">Tente Novamente</a>
                        </div>
                    </div>
                </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                        crossorigin="anonymous"></script>
            </html>`);
        }
 }

 function verificarAutenticacao(req, resp, next) {
    if (req.session.usuarioLogado) {
        next();
    } else {
        resp.redirect('/login.html');
    }
}

app.get('/login', (req, resp) => {
    resp.redirect('/login.html');
});


app.get('/logout',(req, resp)=>{
    req.session.destroy();
    resp.redirect('/login.html');
})
app.post('/login', autenticarUsuario);
app.get('/', verificarAutenticacao, menuView);
app.get('/cadastrarUsuario', verificarAutenticacao, cadastroUsuarioView);
app.post('/cadastrarUsuario', verificarAutenticacao, cadastraUsuario);
app.get('/postarMensagens', verificarAutenticacao, postarMensagem);
app.post('/postarMensagem', verificarAutenticacao, postarMensagem);



app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
