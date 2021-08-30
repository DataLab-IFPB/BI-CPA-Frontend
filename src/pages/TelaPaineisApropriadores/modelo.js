// {
//   escala: [
//     {
//       valorQuantitativo: 0,
//       valorQualitativo: "PRÉ-INDICADA",
//       descricao: "Quando, no ciclo avaliativo, a ação de melhoria foi APENAS CADASTRADA, mais ainda não é monitorável para fins de avaliação."
//     },
//     {
//       valorQuantitativo: 1,
//       valorQualitativo: "EM IMPLANTAÇÃO",
//       descricao: "Quando, no ciclo avaliativo, a ação de melhoria está MONITORADA e EM ANDAMENTO, sob supervisão do nível organizacional (NDE, cood. curso, ou direções)"
//     },
//     {
//       valorQuantitativo: 2,
//       valorQualitativo: "NÃO IMPLANTADA",
//       descricao: "Quando, no ciclo avaliativo, a ação de melhoria MONITORADA foi CANCELADA pelo nível organizacional (NDE, coord. curso, ou direções), justificável por impedimentos."
//     },
//     {
//       valorQuantitativo: 2,
//       valorQualitativo: "IMPLANTADA PARCIALMENTE",
//       descricao: "Quando, no ciclo avaliativo, a ação de melhoria MONITORADA foi FINALIZADA EM PARTE pelo nível organizacional (NDE, coord. curso, ou direções), justificável por impedimentos."
//     },
//     {
//       valorQuantitativo: 3,
//       valorQualitativo: "IMPLANTADA TOTALMENTE",
//       descricao: "Quando, no ciclo avaliativo, a ação de melhoria MONITORADA foi FINALIZADA pelo nível organizacional (NDE, coord. curso, ou direções), sem quaisquer restrições."
//     }
//   ],
export const paineisApropriadores = [
    {
        id: 'dsdsd',
        inicioAplicacao: "2021-07-02T00:00:00-0300",
        terminoAplicacao: "2021-09-30T23:59:00-0300",
        segmento: "DOCENTE",
        nivelOrganizacional: {
            "CAMPUS": "CAMPUS-MT",
            "CURSO": "516 - Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas - Monteiro (CAMPUS MONTEIRO)"
        },
        topicos: [
            {
                topico: "Recepção de eventos do curso",
                tipo: "REIVINDICAÇÃO", //AVALIAÇÃO INERNA //AVALIAÇÃO EXTERNA
                sentimento: "POTENCIALIDADE", //POTENCIALIDADE
                eixoNumero: 3,
                dimensaoNumero: 2,
                contexto: {
                    tipoNivelOrganizacional: "CURSO",//INSTITUCIONAL, CAMPUS, CURSO, DISCIPLINA, SETOR
                    segmentos: ["DISCENTE", "DOCENTE"] //DISCENTE, DOCENTE, TECNICO_ADMINITRATIVO
                },
                criacao: {
                    data: "2021-07-02T00:00:00-0300",
                    usuario: "giuseppe.lima@ifpb.edu.br"
                },
                revisao: {
                    data: "2021-07-02T00:00:00-0300",
                    usuario: "giuseppe.lima@ifpb.edu.br"
                }
            },
            {
                topico: "Oportunidades do estágio",
                tipo: "REIVINDICAÇÃO", //AVALIAÇÃO INERNA //AVALIAÇÃO EXTERNA
                sentimento: "FRAGILIDADE", //POTENCIALIDADE
                eixoNumero: 3,
                dimensaoNumero: 4,
                contexto: {
                    tipoNivelOrganizacional: "INSTITUCIONAL",//INSTITUCIONAL, CAMPUS, CURSO, DISCIPLINA, SETOR
                    segmentos: ["DISCENTE", "DOCENTE"] //DISCENTE, DOCENTE, TECNICO_ADMINITRATIVO
                },
                criacao: {
                    data: "2021-07-02T00:00:00-0300",
                    usuario: "giuseppe.lima@ifpb.edu.br"
                },
                revisao: {
                    data: "2021-07-02T00:00:00-0300",
                    usuario: "giuseppe.lima@ifpb.edu.br"
                }
            }
        ]
    }
]