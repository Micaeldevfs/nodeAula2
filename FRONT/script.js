const nome = document.querySelector("#username");
const email = document.querySelector("#email");
const senha = document.querySelector("#password");
const cpf = document.querySelector("#cpf");
const botao = document.querySelector("#botao");

async function enviarDados(){

    const dados_f = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        cpf: cpf.value
    };

    console.log(dados_f);

    try{
        const request = await fetch("http://localhost:3000/inserir_usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados_f)
        })

        const response = await request.json();
        console.log(response);
    }catch(error){
        console.log(error)
    }
}

botao.addEventListener("click", enviarDados)


