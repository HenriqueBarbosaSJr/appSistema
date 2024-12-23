import { cadastrar, consultaAPI, deletar, editar, exibirDadosModal, filtrar, limparModal, pegarDados } from './funcionarios/funcionarios.js';


// Referências do DOM HTML
const btnIncluir = document.getElementById('btnIncluir');

const modalProdutos = document.getElementById('modalProdutos');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnIncluirModal = document.getElementById('btnIncluirModal');

const inputId = document.getElementById('inputId');
const inputNome = document.getElementById('inputNome');
const inputDep = document.getElementById('inputDep');
const inputFunc = document.getElementById('inputFunc');
const inputSal = document.getElementById('inputSal');

const btnFiltrar = document.getElementById('btnFiltrar');
const inpFiltrarNome = document.getElementById('inpFiltrarNome');
const tbodyList = document.getElementById('tbodyList');

// Lógica
let response = await consultaAPI();

btnIncluir.onclick = ()=>{
    limparModal();
    modalProdutos.showModal();
};

btnFecharModal.onclick = ()=>{
    modalProdutos.close();
};

btnFiltrar.onclick = ()=>{
    let busca = inpFiltrarNome.value;
    filtrar(busca , response);
};

btnIncluirModal.onclick = ()=>{
    let dados ={
        'nome' : inputNome.value,
        'departamento' : inputDep.value,
        'funcao' : inputFunc.value,
        'salario' : inputSal.value,
    }
    //console.log(dados);
    cadastrar(dados)
};


tbodyList.addEventListener('click', (event) => {
    const target = event.target;
    let dados;
    
    // Verifica se o clique foi em uma imagem
    if (target.tagName === 'IMG') { 
        const row = target.closest('tr');  
        
        dados = {
            id: row.cells[0].innerHTML,
            nome: row.cells[1].innerHTML,
            departamento: row.cells[2].innerHTML,
            funcao: row.cells[3].innerHTML,
            salario: row.cells[4].innerHTML
            
        }     
          
        if (target.id == 'btnTrash') {
            deletar(dados.id)
        }
       
        else if (target.id == 'btnEdit') {
            inputId.disabled = true;
            exibirDadosModal(dados) ;
        }
    }
});


btnAlterarModal.onclick = ()=>{
    const dados = pegarDados();
    editar(dados);
};