# Gui & Anna

Uma carta para a Anna: um envelope lacrado que ela abre, a carta com o tempo juntos contado
ao vivo, a nossa história, uma pilha de fotos e uma música de fundo.

No ar em **https://guialmm.github.io/siteqrcode/**. O QR code para imprimir está em
[`impressao/`](impressao/) (PNG e SVG; o SVG não perde qualidade em nenhum tamanho).

## Editar o conteúdo

Tudo o que muda fica em [`assets/js/config.js`](assets/js/config.js):

| Campo | O que é |
|---|---|
| `ele`, `ela` | Os nomes. "Anna," e "Gui" têm escrita à mão animada; outro nome aparece como texto normal. |
| `inicio` | Data e hora em que tudo começou. O contador, o P.S. e os aniversários saem daqui. |
| `musica` | Arquivo, nome, volume (0 a 1), onde começa na primeira vez (`comecoEm`) e onde volta ao início (`terminaEm`). |
| `marcos` | Momentos da linha do tempo "Nossa história" (`data`, `titulo`, `texto`, `foto` opcional). Os aniversários de namoro entram sozinhos. |
| `fotos` | A pilha de fotos, na ordem. `legenda` pode ficar vazia; `deitada: true` para foto horizontal. |
| `bilhetes` | Os motivos, um por bilhete. A seção só aparece com pelo menos um. |

Para ver as seções com conteúdo de exemplo, abra o site com `?demo` no fim do endereço.
O exemplo nunca aparece no site normal.

## Colocar uma foto nova

As fotos da pilha ficam em `assets/img/fotos/`, com o nome pela data (`2022-05-16.jpg`; `-2` se houver outra no mesmo dia), já recortadas e leves:

- em pé: 900 × 1125 px (4:5);
- deitada: 1100 × 825 px (4:3), com `deitada: true` no `config.js`;
- JPG com qualidade em torno de 80 (cada uma fica com 100 a 200 KB).

Os originais do WhatsApp em `assets/img/` ficam fora do Git de propósito.

## Ver no computador

```bash
python3 -m http.server 5510
```

Abra http://localhost:5510/. O servidor simples do Python não deixa a música começar no meio
(ela sempre começa do 0:00); no GitHub Pages isso funciona.

## Publicar

O GitHub Pages publica a branch `main` sozinho. Depois de um `git push`, o site atualiza em um
ou dois minutos. Ao trocar CSS ou JS, aumente o `?v=` nos links do `index.html` para o
celular não usar a versão antiga guardada.

## Por dentro

- `index.html`: estrutura (envelope, carta, história, fotos, bilhetes, toca-discos).
- `assets/js/main.js`: contador, abertura, pilha, bilhetes, sons e música.
- `assets/js/tinta.js`: traçado da escrita à mão de "Anna," e "Gui" (gerado a partir da fonte).
- `assets/audio/efeitos.mp3`: sons de papel, lacre e lápis (Pixabay, licença livre).
- O site fica fora dos buscadores (`noindex`), mas quem tiver o link consegue abrir.
