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
    volume: 0.25, // de 0 a 1; 0.25 deixa a música de fundo
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

  // Pilha de fotos (a seção aparece com 2 fotos ou mais), na ordem em que aparecem.
  // As fotos ficam em assets/img/fotos/, já recortadas: 4:5 em pé, ou 4:3 com deitada: true.
  fotos: [
    { src: "assets/img/fotos/01.jpg", legenda: "A primeira de todas" },
    { src: "assets/img/fotos/02.jpg", legenda: "Nossa primeira festa" },
    { src: "assets/img/fotos/03.jpg", legenda: "Clube de Campo Umuarama" },
    { src: "assets/img/fotos/04.jpg", legenda: "O dia do pedido" },
    { src: "assets/img/fotos/05.jpg", legenda: "Nossa primeira viagem" },
    { src: "assets/img/fotos/06.jpg", legenda: "", deitada: true },
    { src: "assets/img/fotos/07.jpg", legenda: "Indo pro meu aniversário, 2022" },
    { src: "assets/img/fotos/08.jpg", legenda: "Nossa primeira Copa", deitada: true },
    { src: "assets/img/fotos/09.jpg", legenda: "Nossa segunda viagem" },
    { src: "assets/img/fotos/10.jpg", legenda: "Festa das cores em Floripa" },
    { src: "assets/img/fotos/11.jpg", legenda: "" },
    { src: "assets/img/fotos/12.jpg", legenda: "" },
    { src: "assets/img/fotos/13.jpg", legenda: "Show em Floripa", deitada: true },
    { src: "assets/img/fotos/14.jpg", legenda: "Sua formatura" },
    { src: "assets/img/fotos/15.jpg", legenda: "A festa da sua formatura" },
    { src: "assets/img/fotos/16.jpg", legenda: "Nosso primeiro Natal", deitada: true },
    { src: "assets/img/fotos/17.jpg", legenda: "Nosso primeiro Ano-Novo", deitada: true },
    { src: "assets/img/fotos/18.jpg", legenda: "Poços de Caldas", deitada: true },
    { src: "assets/img/fotos/19.jpg", legenda: "Seus 18 anos" },
    { src: "assets/img/fotos/20.jpg", legenda: "" },
    { src: "assets/img/fotos/21.jpg", legenda: "São Thomé das Letras" },
    { src: "assets/img/fotos/22.jpg", legenda: "Casamento do seu primo" },
    { src: "assets/img/fotos/23.jpg", legenda: "Formatura da sua prima", deitada: true },
    { src: "assets/img/fotos/24.jpg", legenda: "Nosso segundo Natal", deitada: true },
    { src: "assets/img/fotos/25.jpg", legenda: "Ano-Novo em Capitólio" },
    { src: "assets/img/fotos/26.jpg", legenda: "Nosso terceiro Natal", deitada: true },
    { src: "assets/img/fotos/27.jpg", legenda: "Nosso terceiro Ano-Novo", deitada: true },
    { src: "assets/img/fotos/28.jpg", legenda: "Riviera", deitada: true },
    { src: "assets/img/fotos/29.jpg", legenda: "Pôr do sol na Riviera", deitada: true },
    { src: "assets/img/fotos/30.jpg", legenda: "Casamento da sua prima", deitada: true },
    { src: "assets/img/fotos/31.jpg", legenda: "Varginha, só pra comer juntos", deitada: true },
    { src: "assets/img/fotos/32.jpg", legenda: "" },
    { src: "assets/img/fotos/33.jpg", legenda: "Natal de 2025" },
    { src: "assets/img/fotos/34.jpg", legenda: "Ano-Novo de 2025" },
    { src: "assets/img/fotos/35.jpg", legenda: "Passeio de UTV" },
    { src: "assets/img/fotos/36.jpg", legenda: "" },
    { src: "assets/img/fotos/37.jpg", legenda: "" },
    { src: "assets/img/fotos/38.jpg", legenda: "" },
    { src: "assets/img/fotos/39.jpg", legenda: "" },
    { src: "assets/img/fotos/40.jpg", legenda: "" },
    { src: "assets/img/fotos/41.jpg", legenda: "Nossa primeira corrida" },
    { src: "assets/img/fotos/42.jpg", legenda: "Campos do Jordão" },
    { src: "assets/img/fotos/43.jpg", legenda: "" },
  ],

  // Bilhetes: cada um é um motivo. A seção aparece com 1 bilhete ou mais.
  bilhetes: [
    // "Porque você ...",
  ],
};
