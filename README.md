ElasticMooc
===========

ElasticMooc foi planejado para ser um MOOC (Massive Open Online Course) que seja elástico, ou seja consiga crescer ou diminuir a capacidade a atender a qualquer número de alunos, seja um número já planejado ou conseguir suprir um crescimento rápido de alunos matriculados.

Para tal, estamos desenvolvendo para que o ElasticMooc se trabalhe em nós, podendo acrescentar ou retirar instâncias em tempo de execução, sem perda de dados.

O projeto foi iniciado a partir de um fork do Moodle 2.7, e alterado para trabalhar com conceitos de NewSQL, Sessão Distribuida em Memória, e partição de arquivos distribuídas.

No momento estamos em fase de definição, e não estamos aceitando contribuições em código, porém, patrocinadores e divulgadores serão bem vindos.

   Durante todo o projeto, o projeto deverá ser orientado, e deverá atender 100% as seguintes premissas:
   
     1. Ser totalmente OpenSource
     2. Ter um código limpo, legível, e de fácil entendimento para humanos
     3. Suportar poucas tecnologias, não ser muito abrangente, fazendo assim o melhor produto possível para aquela tecnologia, portanto será suportado 1 banco de dados, 1 gerenciador de sessões, 1 sistema de arquivos distribuidos. Nossa ideologia nesse ponto é desenvolver o melhor, pois quando mais abrangente, mais se perde em qualidade. Porém para uma tecnologia ser aceita ela deverá:
     
         - Ter o código aberto;
         - Ter pelo menos uma opção de uso gratuito; (Poderá ter versões pagas, porém a versão gratuita deverá atender a demanda). 
         - O projeto estar ativo;
         
         
## Equipe (Em ordem alfabética)

 - Fabio Covolo Mazzo (fabiocmazzo)
 - Gustavo Nicolau (gustavonj)
 - Ralph Humberto ()
 

## Tecnologia

  O LMS é desenvolvido em PHP 5.4, a base de dados suportada é o NuoDB e o gerenciador de sessões é o Redis.
