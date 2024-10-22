import { consultaAPI } from './funcionarios/funcionarios.js';


// Referências do DOM HTML
const btnIncluir = document.getElementById('btnIncluir');
const modalProdutos = document.getElementById('modalProdutos');
const btnFecharModal = document.getElementById('btnFecharModal');

// Lógica

consultaAPI();

btnIncluir.onclick = ()=>{
    modalProdutos.show();
};

btnFecharModal.onclick = ()=>{
    modalProdutos.close();
};