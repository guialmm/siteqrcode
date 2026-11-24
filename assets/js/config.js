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
    "Porque a nossa primeira foto foi na cozinha, sem produção nenhuma, e ainda é uma das minhas favoritas.",
    "Porque até a foto tremida da nossa primeira festa eu guardo como se fosse perfeita.",
    "Porque aquele beijo no pôr do sol do Clube de Campo virou silhueta e virou lembrança.",
    "Porque o dia da caixinha com o anel é um dos dias que eu mais repito na cabeça.",
    "Porque você topou orelha de dálmata comigo no carro e ainda fez pose.",
    "Porque o Brasil perdeu aquela Copa, mas eu fiquei com a foto de você sorrindo com a camisa da seleção.",
    "Porque até no avião, de máscara e cansado, eu estava feliz: era viagem com você.",
    "Porque na festa das cores você saiu toda pintada e ainda me abraçou.",
    "Porque te ver de beca, com aquela faixa laranja, me deu um orgulho que eu nem sabia que cabia em mim.",
    "Porque eu te peguei no colo na sua festa de formatura e você abriu os braços como se fosse voar.",
    "Porque na foto da careta você riu de mim do jeito mais bonito possível.",
    "Porque você consegue ficar linda até na foto escura de Poços de Caldas, que ninguém enxerga direito.",
    "Porque nos seus 18 anos eu só queria ficar do seu lado. E fiquei.",
    "Porque a gente subiu até o alto de São Thomé só pra ver o céu mudar de cor juntos.",
    "Porque na Riviera eu fiz careta pro sol e você sorriu como se fosse a foto mais bonita do mundo.",
    "Porque a gente foi até Varginha só pra comer juntos, e pra mim isso já conta como viagem.",
    "Porque você topa tudo comigo: UTV na lama, cachoeira gelada, trilha até o topo.",
    "Porque você terminou a nossa primeira corrida sorrindo, com a medalha na mão.",
    "Porque você sabe ser elegante num casamento e descabelada numa cachoeira, e eu amo as duas.",
    "Porque você faz biquinho pras fotos comigo sem a menor vergonha. Eu também não.",
    "Porque você fica linda de vestido vermelho, de camiseta, de óculos escuros e de cara lavada no carro.",
    "Porque nas fotos de família você já faz parte do enquadramento, sem ninguém precisar pedir.",
    "Porque já são três Natais e três Anos-Novos, e eu continuo ansioso pelo próximo.",
    "Porque você me fez gostar de casamento. Dos outros, por enquanto.",
    "Às 19h30 de 16 de maio de 2022 começou uma coisa que nunca mais parou.",
    "Porque todo 16 de maio vira festa, e todo dia 16 vira um pouquinho também.",
    "Porque você aguenta eu querer foto de tudo, e ainda sorri em quase todas.",
    "Porque com você até um dia comum vira uma foto que eu não apago.",
    "Porque você me mostrou que dá pra ser engraçado e romântico na mesma foto.",
    "Porque você é a primeira pessoa pra quem eu quero contar qualquer coisa boa.",
    "Porque Poços, Riviera, Campos do Jordão: todo lugar novo fica melhor com você do lado.",
    "Porque a gente já tem quatro anos e meio de fotos, e eu ainda quero mais umas mil.",
    "Porque eu quero você do lado na próxima corrida, na próxima viagem e na próxima cachoeira.",
    "Porque daqui a uns anos eu quero rever essas fotos com você e rir de como a gente era novo.",
    "Porque eu sei que o próximo marco dessa linha do tempo vai ter você nele.",
    "Porque, de todas as fotos daqui, a minha favorita é sempre a próxima que a gente vai tirar.",
    "Porque perto de você eu fico com mais vontade de sair de casa: trilha, praia, show, corrida.",
    "Porque com você do lado eu fico mais corajoso. Inclusive em cachoeira gelada.",
    "Porque a gente combina até sem combinar. Repara em quantas fotos nossas estamos de preto.",
    "Porque em quatro anos e meio eu aprendi seu sorriso de verdade e seu sorriso de foto. Os dois me ganham.",
    "Porque você me faz querer ser alguém de quem você se orgulhe tanto quanto eu me orgulho de você.",
    "Porque eu ainda te procuro primeiro em qualquer foto, até nas que têm seis pessoas.",
    "Porque este maço acaba, mas a lista de motivos não.",
  ],
};
