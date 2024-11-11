import { cadastrar, consultaAPI, deletar, filtrar } from './funcionarios/funcionarios.js';


// Referências do DOM HTML
const btnIncluir = document.getElementById('btnIncluir');

const modalProdutos = document.getElementById('modalProdutos');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnIncluirModal = document.getElementById('btnIncluirModal');
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
    
    
    // Verifica se o clique foi em uma imagem
    if (target.tagName === 'IMG') { 
        const row = target.closest('tr');  
        
        const dados = {
            id: row.cells[0].innerHTML,
            nome: row.cells[1].innerHTML,
            dep: row.cells[2].innerHTML,
            funcao: row.cells[3].innerHTML,
            sal: row.cells[4].innerHTML
            
        }     
          
        if (target.id == 'btnTrash') {
            deletar(dados.id)
        }
       
        else if (target.id == 'btnEdit') {
            exibirDadosModal(dados, 2)
        }
    }
});

