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
    { src: "assets/img/fotos/03.jpg", legenda: "" },
    { src: "assets/img/fotos/04.jpg", legenda: "O dia do pedido" },
    { src: "assets/img/fotos/05.jpg", legenda: "Nossa primeira viagem" },
    { src: "assets/img/fotos/06.jpg", legenda: "", deitada: true },
    { src: "assets/img/fotos/07.jpg", legenda: "" },
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
    { src: "assets/img/fotos/22.jpg", legenda: "" },
    { src: "assets/img/fotos/23.jpg", legenda: "", deitada: true },
    { src: "assets/img/fotos/24.jpg", legenda: "Nosso segundo Natal", deitada: true },
    { src: "assets/img/fotos/25.jpg", legenda: "Ano-Novo em Capitólio" },
    { src: "assets/img/fotos/26.jpg", legenda: "Nosso terceiro Natal", deitada: true },
    { src: "assets/img/fotos/27.jpg", legenda: "Nosso terceiro Ano-Novo", deitada: true },
    { src: "assets/img/fotos/28.jpg", legenda: "Riviera", deitada: true },
    { src: "assets/img/fotos/29.jpg", legenda: "Pôr do sol na Riviera", deitada: true },
    { src: "assets/img/fotos/30.jpg", legenda: "", deitada: true },
    { src: "assets/img/fotos/31.jpg", legenda: "", deitada: true },
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
    "Eu te amo porque você me faz rir até nos dias em que eu não queria.",
    "Amo o jeito que você me olha quando acha que eu não estou vendo.",
    "Com você, até o silêncio fica confortável.",
    "Eu te amo porque você me aceita do jeito que eu sou e, mesmo assim, me faz querer ser melhor.",
    "Amo o seu abraço. É o lugar mais calmo que eu conheço.",
    "Você é a parte tranquila dos meus dias mais difíceis.",
    "Eu te amo porque você cuida de mim até quando eu digo que estou bem.",
    "Amo quando você ri da própria piada antes de terminar de contar.",
    "Eu te amo porque você nunca desistiu da gente, nem nos dias ruins.",
    "Amo a sensação de saber que daqui a pouco eu vou te ver.",
    "Eu te escolho todo dia, não só no dia 16.",
    "Amo o seu cheiro. Fico procurando ele nas minhas blusas depois que você vai embora.",
    "Eu te amo porque você sabe exatamente o que fazer quando eu estou de mau humor.",
    "Amo quando você dorme no meio do filme e jura que estava assistindo.",
    "Você é a primeira pessoa pra quem eu quero contar as coisas boas. E as ruins também.",
    "Eu te amo porque, com você, eu sou eu mesmo sem esforço nenhum.",
    "Amo quem eu me torno quando estou do seu lado.",
    "Eu te amo porque você me dá coragem pra tentar coisas que sozinho eu não tentaria.",
    "Amo o jeito que você fala o meu nome.",
    "Eu te amo porque a gente briga, se entende e continua de mãos dadas.",
    "Amo até sentir saudade de você. Isso faz sentido?",
    "Você fica linda brava. Mas não precisa ficar brava pra eu reparar.",
    "Eu te amo porque você lembra das coisas que eu só falei uma vez.",
    "Amo os nossos domingos sem plano nenhum.",
    "Eu te amo porque você torce por mim mais alto do que eu mesmo.",
    "Amo o seu sorriso de manhã, antes até do café.",
    "Eu te amo porque você é minha namorada e também a minha melhor amiga.",
    "Amo quando você segura a minha mão sem perceber.",
    "Com você eu aprendi que amor também é paciência.",
    "Eu te amo porque você faz qualquer lugar parecer casa.",
    "Amo que a gente tenha piadas que ninguém mais entende.",
    "Eu te amo porque você é gentil com todo mundo, até com quem não merece.",
    "Amo como você me acalma só de dizer que vai dar certo.",
    "Eu te amo porque você faz planos comigo como quem já sabe que vão dar certo.",
    "Amo te ver feliz. É o meu jeito favorito de ficar feliz também.",
    "Eu te amo porque você me conhece melhor do que eu mesmo.",
    "Amo todas as suas versões: a animada, a cansada, a brava e a com sono.",
    "Eu te amo porque, depois de tanto tempo, eu ainda fico ansioso antes de te ver.",
    "Às vezes eu nem sei explicar por que te amo. Só sei que amo, e muito.",
    "Se eu pudesse escolher de novo, eu te escolheria de novo. Sempre.",
  ],
};
