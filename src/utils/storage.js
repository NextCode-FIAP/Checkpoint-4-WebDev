const CHAVE_ARMAZENAMENTO = "proximo-ep:itens";
const CHAVE_TITULO_SELECIONADO = "proximo-ep:titulo-selecionado";

// Lê a lista salva no localStorage. Retorna um array.
export const listarItens = () => {
  const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);

  if (bruto) {
    return JSON.parse(bruto);
  }

  return [];
};

// Procura um item específico usando um laço for em vez de .find()
export const obterItem = (id, tipo) => {
  const itens = listarItens();

  for (let i = 0; i < itens.length; i++) {
    if (itens[i].id === id && itens[i].tipo === tipo) {
      return itens[i];
    }
  }

  return null;
};

// Salva um item novo ou atualiza se já existir na lista
export const salvarItem = (itemNovo) => {
  const itens = listarItens();
  let encontrado = false;

  for (let i = 0; i < itens.length; i++) {
    if (itens[i].id === itemNovo.id && itens[i].tipo === itemNovo.tipo) {
      itens[i] = itemNovo;
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    itens.push(itemNovo);
  }

  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(itens));
  return itens;
};

// Remove um item criando uma nova lista com laço for em vez de .filter()
export const removerItem = (id, tipo) => {
  const itens = listarItens();
  const novaLista = [];

  for (let i = 0; i < itens.length; i++) {
    // Adiciona na nova lista apenas os itens que NÃO são o que queremos remover
    if (itens[i].id !== id || itens[i].tipo !== tipo) {
      novaLista.push(itens[i]);
    }
  }

  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(novaLista));
  return novaLista;
};

// Guarda qual título foi clicado (tipo e id), para a página de Detalhes
// saber qual título ela deve mostrar (sem precisar ler a URL).
export const salvarTituloSelecionado = (tipo, id) => {
  localStorage.setItem(
    CHAVE_TITULO_SELECIONADO,
    JSON.stringify({ tipo: tipo, id: id })
  );
};

// Lê qual foi o último título clicado.
export const obterTituloSelecionado = () => {
  const bruto = localStorage.getItem(CHAVE_TITULO_SELECIONADO);

  if (bruto) {
    return JSON.parse(bruto);
  }

  return null;
};