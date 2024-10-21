// Referências do DOM HTML

const btnIncluir = document.getElementById('btnIncluir');
const modalProdutos = document.getElementById('modalProdutos');
const btnFecharModal = document.getElementById('btnFecharModal');

// Lógica

btnIncluir.onclick = ()=>{
    modalProdutos.show();
};

btnFecharModal.onclick = ()=>{
    modalProdutos.close();
};