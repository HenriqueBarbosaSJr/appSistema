import { api } from '../../services/api.js';


// Referências do DOM HTM
const tbodyList = document.getElementById('tbodyList');
const modalProdutos = document.getElementById('modalProdutos');
const inputId = document.getElementById('inputId');
const inputNome = document.getElementById('inputNome');
const inputDep = document.getElementById('inputDep');
const inputFunc = document.getElementById('inputFunc');
const inputSal = document.getElementById('inputSal');

//Lógica

function limparModal(){
    inputId.value = '';
    inputNome.value = '';
    inputDep.value = '';
    inputFunc.value = '';
    inputSal.value = '';
}


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

export async function cadastrar(dados){
    try {
        const response = await api.post('createfunc', dados);
        
        if (response.status == 201){
            limparModal();
            modalProdutos.close();
            Swal.fire({
                title: "Cadastro efetuado com sucesso !",
                icon: "success"
              });
            consultaAPI(); 
        }
        
    } catch (error) {
        console.log({'MSG':error});  
    }
}

export async function deletar(id){
    try {    
        const response =  await api.delete(`func/${id}`);
        console.log(response);
        
        if (response.status == 200){
            Swal.fire({
                title: "Registro deletado com sucesso !",
                icon: "success"
              });
            consultaAPI(); 
        }

    } catch (error) {
        console.log({'MSG':error});  
    }
}


export function exibirDadosModal(dados){
    modalProdutos.showModal();
    inputId.value = dados.id;
    inputNome.value = dados.nome;
    inputDep.value = dados.dep;
    inputFunc.value = dados.funcao;
    inputSal.value = dados.sal;
}


export function pegarDados(){
    const nome = inputNome.value;
    const dep = inputDep.value;
    const funcao = inputFunc.value;
    const sal = parseFloat(inputSal.value);
    
    const dados ={
        nome : nome,
        dep : dep,
        funcao : funcao,
        sal : sal,
    }
    return dados;
}

export async function editar(dados) {
    console.log('Editando produto...');
    console.log(dados.id);
    
    console.log(dados);
    
    try {
        const response = await api.put(`func/${dados.id}`, dados);
        if (response.status === 201) {
            console.log('Funionário alterado com sucesso');
            Swal.fire({
                title: "Funionário Alterado com sucesso!",
                icon: "success"
              });
            consultaAPI();
        }
    } catch (error) {
        console.error('Erro ao deletar funionário:', error);
    }
} 