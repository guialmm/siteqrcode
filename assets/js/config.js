/*
 * ============================================================
 *  TUDO QUE VOCÊ PRECISA EDITAR FICA AQUI.
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
    titulo: "", // ex.: "Nome da música · Artista" (aparece no botão)
    volume: 0.6,
  },

  // Linha do tempo: a seção só aparece com 2 ou mais marcos.
  // data no formato "AAAA-MM-DD"; foto é opcional.
  marcos: [
    {
      data: "2022-05-16",
      titulo: "O começo de tudo",
      texto: "O dia em que a nossa história começou.",
      foto: "",
    },
  ],

  // Galeria: a seção só aparece com 2 ou mais fotos.
  fotos: [
    { src: "assets/img/casal.jpg", legenda: "" },
  ],
};
