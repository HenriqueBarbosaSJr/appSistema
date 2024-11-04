import { api } from '../../services/api.js';


// Referências do DOM HTM
const tbodyList = document.getElementById('tbodyList');


//Lógica

export async function consultaAPI(){
    console.log('consultando...');
    try {
        const response = await api.get('listfunc');
        //console.log(response);
        atualizarTabela(response.data.result);
        return response.data.result;
    } catch (error) {
        console.log({'MSG':error});   
    }
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
                            '<img id="btnTrash" src="../assets/trash.png" class="icons">' +
                            '<img id="btnEdit" src="../assets/edit2.png" class="icons">' +
                        '</td>' +
                  '</tr>'
        rows += tr;   
    }
    tbodyList.innerHTML = rows
}

export function filtrar(nomeBusca, response){
    console.log('filtrando...');
    console.log(response);
    
    const produtosFiltrados = response.filter(funcionario =>
        funcionario.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );
    atualizarTabela(produtosFiltrados);  
}

export function cadastrar(dados){
    try {
        const response = api.post('createfunc', dados);
        
    } catch (error) {
        console.log({'MSG':error});  
    }
}