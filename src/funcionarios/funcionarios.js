import funcionarios from '../../databases/banco.js';

// Referências do DOM HTM
const tbodyList = document.getElementById('tbodyList');


//Lógica

export async function consultaAPI(){
    console.log('consultando...');
    const response = await funcionarios;
    atualizarTabela(response.banco);
    return response.banco
}


export function atualizarTabela(dados){
    console.log(dados);
    let rows='';
    for (let i=0; i < dados.length; i++){
        let tr = '<tr>' +
                        '<td>' + dados[i].id + '</td>' +
                        '<td>' + dados[i].nome + '</td>' +
                        '<td>' + dados[i].departamento + '</td>' +
                        '<td>' + dados[i].funcao + '</td>' +
                        '<td>' + dados[i].salario + '</td>' +
                        '<td id="tbControler">' +
                            '<a id="btnTrash" onclick="deletePro(this)"><img src="../assets/trash.png" class="icons"></a>' +
                            '<a id="btnEdit" onclick="alteraPro(this)"><img src="../assets/edit2.png" class="icons"></a>' +
                        '</td>' +
                  '</tr>'
        rows += tr;   
    }
    tbodyList.innerHTML = rows
}