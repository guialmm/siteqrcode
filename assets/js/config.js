/*
 * ============================================================
 *  TUDO QUE VOCÊ PRECISA EDITAR FICA AQUI.
 *  Para ver as seções com conteúdo de exemplo, abra o site com ?demo no fim
 *  do endereço (ex.: http://localhost:5510/?demo). O exemplo nunca aparece
 *  no site normal.
 * ============================================================
 */
window.CONFIG = {
  ele: "Gui",
  ela: "Anna",

  // Data e hora em que tudo começou (ano-mês-diaThora:minuto)
  inicio: "2022-05-16T19:30:00",

  // Música de fundo: coloque o arquivo em assets/audio/
  musica: {
    arquivo: "assets/audio/musica.mp3",
    titulo: "The Night We Met · Lord Huron", // aparece ao lado do disco
    // Onde a música começa na primeira vez (minuto:segundo). "1:26" cai logo antes
    // da entrada da banda inteira. Vazio = começa do início.
    comecoEm: "1:26",
    // Onde ela "acaba": daqui volta para 0:00 e fica repetindo inteira.
    // "3:12" pula os ~16 s de silêncio do fim do arquivo. Vazio = toca até o fim.
    terminaEm: "3:12",
    volume: 0.6,
  },

  // Nossa história. Os aniversários de namoro entram sozinhos;
  // aqui você adiciona os momentos especiais. data = "AAAA-MM-DD", foto é opcional.
  marcos: [
    {
      data: "2022-05-16",
      titulo: "O começo de tudo",
      texto: "Às 19h30 do dia 16 de maio de 2022, a nossa história começou.",
      foto: "",
    },
  ],

  // Pilha de fotos (a seção aparece com 2 fotos ou mais).
  fotos: [
    { src: "assets/img/casal.jpg", legenda: "" },
  ],

  // Bilhetes: cada um é um motivo. A seção aparece com 1 bilhete ou mais.
  bilhetes: [
    // "Porque você ...",
  ],
};
