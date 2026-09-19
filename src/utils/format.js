// Pequenas funções puras de formatação, reutilizadas em várias páginas.

// Recebe minutos totais e devolve um texto no formato "2h 15min".
export const formatarDuracao = (minutosTotais = 0) => {
  const horas = Math.floor(minutosTotais / 60);
  const minutos = minutosTotais % 60;

  if (horas === 0) {
    return `${minutos}min`;
  }

  return `${horas}h ${minutos}min`;
};

// Extrai apenas o ano de uma data no formato "AAAA-MM-DD" vinda da API.
export const formatarAno = (dataString) => {
  if (!dataString) {
    return "—";
  }

  return dataString.slice(0, 4);
};
