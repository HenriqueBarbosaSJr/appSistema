import { consultaAPI, filtrar } from './funcionarios/funcionarios.js';


// Referências do DOM HTML
const btnIncluir = document.getElementById('btnIncluir');
const modalProdutos = document.getElementById('modalProdutos');
const btnFecharModal = document.getElementById('btnFecharModal');
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
        console.log(dados);
          
        if (target.id == 'btnTrash') {
            exibirDadosModal(dados , 1)
            
        }
       
        else if (target.id == 'btnEdit') {
            exibirDadosModal(dados, 2)
        }
    }
});

