window.AB_CONTENT = {
  "meta": {
    "title": "Androides BiÃ³nicos",
    "subtitle": "Academia personal de estudio",
    "description": "Una ruta interactiva para comprender los conceptos del webinar, relacionarlos con el examen y estudiar a tu ritmo.",
    "version": "1.0.0",
    "disclaimer": "Este material reconstruye y amplÃ­a los temas a partir del temario y los apuntes disponibles. No es una transcripciÃ³n oficial del webinar ni un banco oficial de respuestas de P4H Bionics.",
    "confidenceLegend": [
      {
        "id": "directo",
        "label": "Directo",
        "description": "El concepto aparece explÃ­citamente en el temario o en los apuntes compartidos."
      },
      {
        "id": "probable",
        "label": "Probable",
        "description": "La relaciÃ³n es muy consistente con las pistas del examen, pero no contamos con la diapositiva original."
      },
      {
        "id": "ampliacion",
        "label": "AmpliaciÃ³n",
        "description": "ExplicaciÃ³n tÃ©cnica agregada para que el concepto se entienda y pueda aplicarse."
      }
    ]
  },
  "examQuestions": [
    {
      "id": "q1",
      "number": 1,
      "title": "Ãrea de estudios o experiencia profesional",
      "points": null,
      "prompt": "Describe brevemente tu Ã¡rea de estudios o experiencia profesional.",
      "key": "Conectar tu experiencia real con la interacciÃ³n humano-tecnologÃ­a.",
      "mappedModules": [
        "simulacion"
      ],
      "recommendedTopics": [
        "DiseÃ±o UX/UI y productos digitales",
        "Flujos, interfaces y comprensiÃ³n de necesidades",
        "InteracciÃ³n humano-tecnologÃ­a",
        "Accesibilidad, feedback y seguridad percibida",
        "Realidad virtual como herramienta de evaluaciÃ³n"
      ],
      "structure": [
        "Nombrar tu Ã¡rea profesional.",
        "Explicar brevemente quÃ© tipo de problemas resolvÃ©s.",
        "Relacionarla honestamente con el webinar, sin afirmar experiencia robÃ³tica que no tenÃ©s."
      ],
      "caution": "No necesitÃ¡s introducir fÃ³rmulas, sensores ni manufactura. La pregunta busca ubicar desde quÃ© disciplina llegaste al curso."
    },
    {
      "id": "q2",
      "number": 2,
      "title": "Cinco de las nueve etapas",
      "points": 50,
      "prompt": "Menciona y describe 5 de las 9 etapas vistas en tu Webinar. Clave: una de ellas es el DiseÃ±o RobÃ³tico.",
      "key": "Explicar el objetivo de cada etapa, quÃ© se hace y un ejemplo.",
      "mappedModules": [
        "seleccion",
        "modelos-matematicos",
        "diseno-robotico",
        "biosensores",
        "aprendizaje-automatico",
        "motorizacion",
        "simulacion",
        "optimizacion",
        "manufactura"
      ],
      "recommendedTopics": [
        "MetodologÃ­a de selecciÃ³n del androide",
        "Modelos matemÃ¡ticos sugeridos",
        "DiseÃ±o robÃ³tico",
        "ProgramaciÃ³n enfocada a la motorizaciÃ³n",
        "Herramientas de simulaciÃ³n"
      ],
      "alternativeTopics": [
        "MetodologÃ­a de selecciÃ³n",
        "Modelos matemÃ¡ticos",
        "DiseÃ±o robÃ³tico",
        "Biosensores",
        "Manufactura y prototipaje"
      ],
      "structure": [
        "Nombrar la etapa.",
        "Explicar para quÃ© sirve dentro del proceso.",
        "Mencionar dos o tres acciones o conceptos propios de esa etapa.",
        "Cerrar con un ejemplo sencillo aplicado a un androide."
      ],
      "caution": "La divisiÃ³n exacta en nueve etapas es una reconstrucciÃ³n razonada. SimulaciÃ³n y optimizaciÃ³n se separan porque el examen pide nueve, aunque en el temario aparecen juntas."
    },
    {
      "id": "q3",
      "number": 3,
      "title": "Dos sensores del webinar",
      "points": 30,
      "prompt": "Menciona y describe los dos sensores vistos en tu webinar. Clave: uno de ellos usa la seÃ±al muscular.",
      "key": "La seÃ±al muscular identifica al EMG. El segundo mÃ¡s probable es EOG.",
      "mappedModules": [
        "biosensores"
      ],
      "recommendedTopics": [
        "Sensor o sistema mioelÃ©ctrico EMG",
        "Sensor o sistema electrooculogrÃ¡fico EOG",
        "Electrodos, filtrado e interpretaciÃ³n",
        "Ejemplos de control de mano robÃ³tica y animatrÃ³nico ocular"
      ],
      "structure": [
        "Indicar quÃ© seÃ±al biolÃ³gica detecta.",
        "Explicar cÃ³mo se obtiene de forma general.",
        "Aclarar que debe acondicionarse y procesarse.",
        "Dar un uso concreto dentro de un sistema biÃ³nico."
      ],
      "caution": "EMG es prÃ¡cticamente seguro por la pista de la seÃ±al muscular. EOG es la hipÃ³tesis mÃ¡s sÃ³lida por tus apuntes; EEG tambiÃ©n fue mencionado, pero registra actividad cerebral."
    },
    {
      "id": "q4",
      "number": 4,
      "title": "Manufactura para prototipaje",
      "points": 20,
      "prompt": "Menciona y describe el tipo de manufactura para prototipaje de androides visto en tu webinar. Clave: usa plÃ¡sticos.",
      "key": "Manufactura aditiva; el proceso plÃ¡stico mÃ¡s probable es FDM o FFF.",
      "mappedModules": [
        "manufactura"
      ],
      "recommendedTopics": [
        "Manufactura aditiva o impresiÃ³n 3D",
        "ConstrucciÃ³n capa por capa desde un modelo digital",
        "FDM/FFF mediante filamento termoplÃ¡stico",
        "IteraciÃ³n rÃ¡pida sin moldes industriales"
      ],
      "structure": [
        "Nombrar el tipo general: manufactura aditiva.",
        "Explicar que agrega material por capas.",
        "Describir FDM/FFF y el uso de filamentos plÃ¡sticos.",
        "Relacionarlo con falanges, soportes, carcasas o articulaciones."
      ],
      "caution": "SLA y SLS tambiÃ©n son manufactura aditiva, pero la pista de plÃ¡sticos y prototipaje accesible apunta con mayor fuerza a FDM/FFF."
    }
  ],
  "modules": [
    {
      "id": "seleccion",
      "order": 1,
      "title": "MetodologÃ­a de selecciÃ³n del androide",
      "shortTitle": "SelecciÃ³n",
      "kicker": "Definir antes de construir",
      "icon": "target",
      "duration": 14,
      "difficulty": "Inicial",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "Se define quÃ© androide se necesita, para quiÃ©n, en quÃ© entorno y con quÃ© restricciones. Es la etapa que transforma una idea general en un problema de diseÃ±o concreto.",
      "whyItMatters": "Una decisiÃ³n incorrecta al comienzo se multiplica despuÃ©s en motores innecesarios, mecanismos sobredimensionados, costos mayores o una interacciÃ³n difÃ­cil de usar.",
      "learningGoals": [
        "Distinguir androides orientados a destreza e interacciÃ³n.",
        "Reconocer los requisitos que condicionan el diseÃ±o.",
        "Entender quÃ© significa un grado de libertad.",
        "Explicar por quÃ© se investiga el estado del arte."
      ],
      "sections": [
        {
          "title": "La pregunta de partida",
          "paragraphs": [
            "El desarrollo no deberÃ­a comenzar eligiendo un motor o dibujando una carcasa. Primero se establece quÃ© tarea debe resolver el androide y por quÃ© una forma humanoide aporta valor.",
            "Un sistema pensado para tomar objetos necesita prioridades distintas a uno creado para conversar, guiar a una persona o representar un personaje. La selecciÃ³n define el alcance antes de que aparezcan las decisiones mecÃ¡nicas."
          ],
          "bullets": [
            "Objetivo principal y tareas secundarias.",
            "Usuario o poblaciÃ³n que interactuarÃ¡ con el sistema.",
            "Entorno: laboratorio, hogar, hospital, industria o escenario.",
            "Nivel de autonomÃ­a y supervisiÃ³n humana.",
            "Dimensiones, peso, energÃ­a, presupuesto y seguridad."
          ],
          "visual": "selection-map"
        },
        {
          "title": "Destreza e interacciÃ³n",
          "paragraphs": [
            "Una clasificaciÃ³n Ãºtil separa los sistemas cuya prioridad es actuar fÃ­sicamente de aquellos cuya prioridad es relacionarse con personas. No son categorÃ­as excluyentes, pero ayudan a decidir dÃ³nde invertir complejidad."
          ],
          "comparison": {
            "left": {
              "title": "Orientado a destreza",
              "items": [
                "Agarre y manipulaciÃ³n",
                "PrecisiÃ³n y repetibilidad",
                "Fuerza y control de contacto",
                "Equilibrio o locomociÃ³n"
              ]
            },
            "right": {
              "title": "Orientado a interacciÃ³n",
              "items": [
                "Gestos y expresividad",
                "ComprensiÃ³n de comandos",
                "Feedback claro para la persona",
                "Apariencia y conducta social"
              ]
            }
          }
        },
        {
          "title": "Requisitos y grados de libertad",
          "paragraphs": [
            "Un grado de libertad es un movimiento independiente que puede realizar una articulaciÃ³n o mecanismo. Una bisagra simple permite una rotaciÃ³n; un hombro robÃ³tico puede requerir varias rotaciones independientes.",
            "MÃ¡s grados de libertad aumentan la movilidad, pero tambiÃ©n la cantidad de actuadores, sensores, cÃ¡lculos, cableado y puntos de fallo. Por eso no se agregan por realismo, sino porque una tarea los necesita."
          ],
          "bullets": [
            "QuÃ© movimientos son indispensables.",
            "QuÃ© amplitud necesita cada articulaciÃ³n.",
            "QuÃ© carga debe soportar.",
            "QuÃ© velocidad y precisiÃ³n son aceptables.",
            "QuÃ© lÃ­mites evitan daÃ±os al robot o al usuario."
          ]
        },
        {
          "title": "Estado del arte, viabilidad y seguridad",
          "paragraphs": [
            "Investigar el estado del arte significa revisar robots existentes, artÃ­culos, patentes, mecanismos y experiencias anteriores. No se trata de copiar, sino de identificar quÃ© ya fue resuelto y quÃ© restricciones siguen abiertas.",
            "La viabilidad combina desempeÃ±o, costo, tiempo, materiales y capacidad tÃ©cnica. La seguridad debe contemplarse desde la selecciÃ³n: lÃ­mites de fuerza, velocidad, temperatura, recorrido y respuesta ante pÃ©rdida de energÃ­a o seÃ±al."
          ],
          "callout": {
            "title": "Pregunta guÃ­a",
            "text": "Â¿CuÃ¡l es la soluciÃ³n mÃ¡s simple que cumple la tarea sin introducir movimientos, sensores o apariencia que no aportan valor?"
          }
        }
      ],
      "concepts": [
        {
          "term": "Androide",
          "definition": "Robot diseÃ±ado para reproducir total o parcialmente la forma, el movimiento o la interacciÃ³n humana.",
          "example": "Una cabeza animatrÃ³nica puede ser un subsistema androide aunque no exista un cuerpo completo."
        },
        {
          "term": "Grado de libertad",
          "definition": "Movimiento independiente que puede adoptar una articulaciÃ³n o sistema.",
          "example": "La flexiÃ³n de un codo representa un grado de libertad rotacional."
        },
        {
          "term": "Estado del arte",
          "definition": "RevisiÃ³n de las soluciones y conocimientos mÃ¡s relevantes disponibles para un problema.",
          "example": "Comparar manos robÃ³ticas existentes antes de definir un nuevo mecanismo de dedos."
        },
        {
          "term": "Requisito",
          "definition": "CondiciÃ³n verificable que el sistema debe cumplir.",
          "example": "La mano debe sujetar un objeto de 500 gramos sin superar cierta fuerza."
        }
      ],
      "process": [
        "Definir problema y usuario.",
        "Elegir prioridad: destreza, interacciÃ³n o combinaciÃ³n.",
        "Identificar movimientos y grados de libertad.",
        "Establecer restricciones tÃ©cnicas y de seguridad.",
        "Comparar alternativas y seleccionar el concepto viable."
      ],
      "appliedExample": {
        "title": "Ejemplo: mano de asistencia",
        "text": "Si el objetivo es ayudar a sujetar objetos cotidianos, se priorizan agarre, peso y seguridad. No serÃ­a razonable invertir primero en piel artificial o expresiones faciales, porque no contribuyen a la tarea principal."
      },
      "quiz": [
        {
          "id": "m1q1",
          "prompt": "Â¿QuÃ© deberÃ­a definirse antes de seleccionar motores y mecanismos?",
          "options": [
            "El color final del prototipo",
            "La tarea, el usuario y las restricciones",
            "La marca de la impresora 3D",
            "La red neuronal que se utilizarÃ¡"
          ],
          "answer": 1,
          "explanation": "La selecciÃ³n comienza por el problema, el contexto y los requisitos; la tecnologÃ­a se elige despuÃ©s."
        },
        {
          "id": "m1q2",
          "prompt": "Â¿QuÃ© efecto suele tener aumentar los grados de libertad?",
          "options": [
            "Siempre reduce el costo",
            "Elimina la necesidad de sensores",
            "Aumenta movilidad y tambiÃ©n complejidad",
            "Impide usar servomotores"
          ],
          "answer": 2,
          "explanation": "MÃ¡s movimientos independientes permiten mayor destreza, pero demandan control, actuadores y validaciÃ³n adicionales."
        },
        {
          "id": "m1q3",
          "prompt": "Un androide orientado a interacciÃ³n prioriza especialmenteâ€¦",
          "options": [
            "Solamente la velocidad de giro",
            "Gestos, comprensiÃ³n y feedback para personas",
            "La eliminaciÃ³n de toda apariencia humana",
            "La fabricaciÃ³n sustractiva"
          ],
          "answer": 1,
          "explanation": "La interacciÃ³n requiere que la conducta del sistema sea perceptible, comprensible y segura para la persona."
        }
      ],
      "takeaways": [
        "Primero se define el problema; luego se elige la tecnologÃ­a.",
        "Destreza e interacciÃ³n generan prioridades distintas.",
        "Cada grado de libertad debe justificar su costo y complejidad.",
        "El estado del arte reduce riesgos y evita reinventar soluciones."
      ]
    },
    {
      "id": "modelos-matematicos",
      "order": 2,
      "title": "Modelos matemÃ¡ticos sugeridos",
      "shortTitle": "Modelos matemÃ¡ticos",
      "kicker": "Representar el movimiento antes de fabricarlo",
      "icon": "axis",
      "duration": 20,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "Los modelos matemÃ¡ticos describen posiciones, orientaciones, trayectorias y fuerzas. Permiten calcular cÃ³mo debe moverse el androide y detectar limitaciones antes de construirlo.",
      "whyItMatters": "Sin un modelo, el movimiento se ajusta por prueba y error. Con un modelo se puede predecir alcance, suavidad, torque y configuraciones imposibles.",
      "learningGoals": [
        "Diferenciar cinemÃ¡tica y dinÃ¡mica.",
        "Entender para quÃ© se usa Denavit-Hartenberg.",ÛO9öÚ$z{-®éÜj×$÷&–VçF6œ;6âFR62"À¢$W7W6÷"FR&VB"À¢%&VÆÆVæòòÆGF–6R"À¢%FöÆW&æ6–2’Væ67G&W2 ¢Ğ¢ÒÀ¢'&–v‡B#¢°¢'F—FÆR#¢$VfV7F÷2"À¢&—FV×2#¢°¢%&W6—7FVæ6–æ—6÷G,;7–6"À¢%F–V×ò’ÖFW&–Â"À¢%W6ò’&–v–FW¢"À¢$6Æ–FBFVÂVç6Ö&ÆR ¢Ğ¢Ğ¢Ğ¢Ğ¢ÒÀ¢&6öæ6WG2#¢°¢°¢'FW&Ò#¢$ÖçVf7GW&F—F—f"À¢&FVf–æ—F–öâ#¢$f'&–66œ;6â÷"–æ6÷'÷&6œ;6â7V6W6—fFRÖFW&–ÂFW6FRVâÖöFVÆòF–v—FÂâ"À¢&W†×ÆR#¢$–×&–Ö—"VæfÆævR6÷"6â ¢ÒÀ¢°¢'FW&Ò#¢$dDÒôddb"À¢&FVf–æ—F–öâ#¢$W‡G'W6œ;6âFRf–ÆÖVçFòFW&Ö÷Ì:7F–6ògVæF–FòG&l:—2FRVæ&÷V–ÆÆâ"À¢&W†×ÆR#¢$f'&–6"Vâ6÷÷'FR&6W'föÖ÷F÷"VâÄòUDrâ ¢ÒÀ¢°¢'FW&Ò#¢%4Ä"À¢&FVf–æ—F–öâ#¢$f÷F÷öÆ–ÖW&—¦6œ;6âFR&W6–æÌ:×V–FÖVF–çFRÇW¢â"À¢&W†×ÆR#¢$–×&–Ö—"Vâö¦òæ–ÖG,;6æ–6ò6öâÇFòFWFÆÆRâ ¢ÒÀ¢°¢'FW&Ò#¢%4Å2"À¢&FVf–æ—F–öâ#¢$gW6œ;6â6VÆV7F—fFRÖFW&–ÂVâöÇfòÖVF–çFRVæW&|:ÖÌ:6W"â"À¢&W†×ÆR#¢%&öGV6—"Væ'F–7VÆ6œ;6â6ö×ÆV¦Vâç–Æöââ ¢ÒÀ¢°¢'FW&Ò#¢%FöÆW&æ6–"À¢&FVf–æ—F–öâ#¢$Ö&vVâF–ÖVç6–öæÂVRW&Ö—FRVR–W¦2&VÆW2Væ6¦Vâ’gVæ6–öæVââ"À¢&W†×ÆR#¢$FV¦"6W&6œ;6âVçG&RVâV¦R’7RÆö¦Ö–VçFòâ ¢ÒÀ¢°¢'FW&Ò#¢$æ—6÷G&÷:Ö"À¢&FVf–æ—F–öâ#¢%&÷–VFBFRVâÖFW&–Âò–W¦VR6Ö&–6V|;¦âÆF—&V66œ;6ââ"À¢&W†×ÆR#¢%Væ–W¦dDÒVVFR&W6—7F—"ÖVæ÷2VçG&R62VRÆòÆ&vòFRVÆÆ2â ¢Ğ¢ÒÀ¢'&ö6W72#¢°¢$F—6\;"VÂÖöFVÆò4Bâ"À¢$VÆVv—"&ö6W6òÂÖFW&–Â’÷&–VçF6œ;6ââ"À¢%&W&"62’6÷÷'FW2â"À¢$f'&–6"’÷7G&ö6W6"â"À¢$Vç6Ö&Æ"ÂÖVF—"’6÷'&Vv—"Æ6–wV–VçFRfW'6œ;6ââ ¢ÒÀ¢&Æ–VDW†×ÆR#¢°¢'F—FÆR#¢$V¦V×Æó¢6÷÷'FRFR6W'fò"À¢'FW‡B#¢%6RF—6\;Vâ6÷÷'FRVâ4BÂ6R–×&–ÖRVâdDÒ’6R'VV&VÂVæ67G&Râ6’VÂ6W'fòVçG&FVÖ6–Fò§W7FFòòÆ&VBfÆW†–öæÂ6RÖöF–f–6âFöÆW&æ6–2’W7W6÷&W2çFW2FR–×&–Ö—"÷G&fW'6œ;6ââ ¢ÒÀ¢'V—¢#¢°¢°¢&–B#¢&Ó—"À¢'&ö×B#¢,+õ\:’6&7FW&—¦ÆÖçVf7GW&F—F—fò"À¢&÷F–öç2#¢°¢%&WF—&ÖFW&–ÂW†6ÇW6—fÖVçFR"À¢$w&VvÖFW&–Â&f÷&Ö"Æ–W¦"À¢%6öÆòWF–Æ—¦ÖWFÂ"À¢$æò'FRFRVâÖöFVÆòF–v—FÂ ¢ÒÀ¢&ç7vW"#¢À¢&W‡ÆæF–öâ#¢$Æ–W¦6Rf÷&Ö÷"–æ6÷'÷&6œ;6â7V6W6—fFRÖFW&–ÂÂg&V7VVçFVÖVçFR6÷"6â ¢ÒÀ¢°¢&–B#¢&Ó—""À¢'&ö×B#¢,+õ\:’ÖFW&–ÂFRÆ–ÖVçF6œ;6âWF–Æ—¦dDÒôddbæ÷&ÖÆÖVçFSò"À¢&÷F–öç2#¢°¢$f–ÆÖVçFòFW&Ö÷Ì:7F–6ò"À¢%6\;ÂTÔr"À¢%&W6–æÌ:×V–F;¦æ–6ÖVçFR"À¢%öÇfòÖWL:Æ–6òW†6ÇW6—fÖVçFR ¢ÒÀ¢&ç7vW"#¢À¢&W‡ÆæF–öâ#¢$dDÒôddbgVæFR’FW÷6—FVâf–ÆÖVçFòÌ:7F–6òG&l:—2FRVæ&÷V–ÆÆâ ¢ÒÀ¢°¢&–B#¢&Ó—2"À¢'&ö×B#¢,+õ\:’&ö6W6òG&&¦6öâ&W6–æÌ:×V–Ff÷F÷6Vç6–&ÆSò"À¢&÷F–öç2#¢°¢%4Ä"À¢$Tôr"À¢$6æç’"À¢$FVæf—BÔ†'FVæ&W&r ¢ÒÀ¢&ç7vW"#¢À¢&W‡ÆæF–öâ#¢%4ÄWF–Æ—¦ÇW¢&6öÆ–F–f–6"6VÆV7F—fÖVçFRVæ&W6–æâ ¢Ğ¢ÒÀ¢'F¶Vv—2#¢°¢$ÖçVf7GW&F—F—fw&VvÖFW&–ÂFW6FRVâÖöFVÆòF–v—FÂâ"À¢$dDÒôddbW2Æ÷6œ;6âÌ:7F–6Ü:2&ö&&ÆRFVÂW†ÖVââ"À¢%4ÄW6&W6–æ’4Å2W6VâÆV6†òFRöÇfòâ"À¢$÷&–VçF6œ;6â’FöÆW&æ6–26öæF–6–öæâVÂ&W7VÇFFò&VÂâ ¢Ğ¢Ğ¢ÒÀ¢&vÆ÷76'’#¢°¢°¢'FW&Ò#¢$7GVF÷""À¢&FVf–æ—F–öâ#¢$6ö×öæVçFRVR6öçf–W'FRVæW&|:ÖVâÖ÷f–Ö–VçFòògVW'¦â"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$Æv÷&—FÖòFR6æç’"À¢&FVf–æ—F–öâ#¢$Ü:—FöFòFRf—6œ;6â'F–f–6–Â&FWFV7F"&÷&FW2'F—"FR6Ö&–÷2FR–çFVç6–FBâ"À¢&ÖöGVÆR#¢&&VæF—¦¦RÖWFöÖF–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$×Æ–f–66œ;6â"À¢&FVf–æ—F–öâ#¢$VÖVçFò6öçG&öÆFòFRÆ×Æ—GVBFRVæ6\;ÂWV\;&öFW"&ö6W6&Æâ"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$æG&ö–FR"À¢&FVf–æ—F–öâ#¢%&ö&÷BVR&W&öGV6RF÷FÂò&6–ÆÖVçFRf÷&ÖÂÖ÷f–Ö–VçFòò–çFW&66œ;6â‡VÖæâ"À¢&ÖöGVÆR#¢'6VÆV66–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$æ—6÷G&÷:Ö"À¢&FVf–æ—F–öâ#¢%f&–6œ;6âFR&÷–VFFW26V|;¦âÆF—&V66œ;6ã²&VÆWfçFRVâ–W¦2–×&W62÷"62â"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$æ–ÖG,;6æ–6ò"À¢&FVf–æ—F–öâ#¢$F—7÷6—F—fòÖV6æ—¦FòVR–Ö—FÖ÷f–Ö–VçF÷2ò&–Væ6–FRVâ6W"f—fòâ"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$'FVf7FòFR6\;Â"À¢&FVf–æ—F–öâ#¢$ÇFW&6œ;6âæòFW6VF6W6F÷"Ö÷f–Ö–VçFòÂÖÆ6öæW†œ;6âò–çFW&fW&Væ6–â"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$,:—¦–W""À¢&FVf–æ—F–öâ#¢$7W'f&Ü:—G&–66öçG&öÆF÷"VçF÷2Â;§F–Â&G&–V7F÷&–27VfW2â"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$&–öÖ–Ü:—F–6"À¢&FVf–æ—F–öâ#¢$FF6œ;6âFR&–æ6—–÷2gVæ6–öæÆW2ö'6W'fF÷2VâÆæGW&ÆW¦ÂF—6\;òâ"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6VçG&òFRÖ6"À¢&FVf–æ—F–öâ#¢%VçFòWV—fÆVçFR&æÆ—¦"F—7G&–'V6œ;6âFRÖ6’WV–Æ–'&–òâ"À¢&ÖöGVÆR#¢'6–×VÆ6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6–æVÜ:F–6"À¢&FVf–æ—F–öâ#¢$W7GVF–òFR÷6–6–öæW2’Ö÷f–Ö–VçFò6–â6VçG&'6R&–ÖW&òVâÆ2gVW'¦2â"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6–æVÜ:F–6F—&V7F"À¢&FVf–æ—F–öâ#¢$<:Æ7VÆòFRÆ÷6Rf–æÂ'F—"FRfÆ÷&W2'F–7VÆ&W26öæö6–F÷2â"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6–æVÜ:F–6–çfW'6"À¢&FVf–æ—F–öâ#¢$<:Æ7VÆòFRfÆ÷&W2'F–7VÆ&W2æV6W6&–÷2&Æ6ç¦"Væ÷6RFW6VFâ"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6–6ÆòFRÖ&6†"À¢&FVf–æ—F–öâ#¢%6V7VVæ6–VçG&RF÷26öçF7F÷26öç6V7WF—f÷2FVÂÖ—6Öò–RÂ6öâ÷–ò’&Ææ6Vòâ"À¢&ÖöGVÆR#¢'6–×VÆ6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6öçG&öÂVâÆ¦ò&–W'Fò"À¢&FVf–æ—F–öâ#¢$Æ–6Væ÷&FVâ6–âÖVF—"F—&V7FÖVçFRVÂ&W7VÇFFòâ"À¢&ÖöGVÆR#¢&Ö÷F÷&—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$6öçG&öÂVâÆ¦ò6W'&Fò"À¢&FVf–æ—F–öâ#¢$Ö–FRÆ6Æ–FÂ6Æ7VÆVÂW'&÷"’6÷'&–vRÆ66œ;6ââ"À¢&ÖöGVÆR#¢&Ö÷F÷&—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$FVæf—BÔ†'FVæ&W&r"À¢&FVf–æ—F–öâ#¢$6öçfVæ6œ;6â&FW67&–&—"ÖFVÜ:F–6ÖVçFRW6Æ&öæW2’'F–7VÆ6–öæW26öç6V7WF—f2â"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$F–ì:Ö–6"À¢&FVf–æ—F–öâ#¢$W7GVF–òFVÂÖ÷f–Ö–VçFò6öç6–FW&æFògVW'¦2ÂÖ62Âw&fVFBR–æW&6–â"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$TTr"À¢&FVf–æ—F–öâ#¢$VÆV7G&öVæ6VfÆöw&l:Ö¢&Vv—7G&òFR7F—f–FBVÌ:–7G&–66W&V'&Ââ"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$VÆV7G&öFò"À¢&FVf–æ—F–öâ#¢$VÆVÖVçFò6öæGV7F÷"WF–Æ—¦Fò&6F"F–fW&Væ6–2FR÷FVæ6–ÂFVÂ7VW'òâ"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$TÔr"À¢&FVf–æ—F–öâ#¢$VÆV7G&öÖ–öw&l:Ö¢&Vv—7G&òFR7F—f–FBVÌ:–7G&–6f–æ7VÆF6öâÆ7F—f6œ;6â×W67VÆ"â"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$Væw&æ¦R"À¢&FVf–æ—F–öâ#¢$VÆVÖVçFòFVçFFòVRG&ç6Ö—FRv—&ò’FFfVÆö6–FBòF÷'VRâ"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$Tôr"À¢&FVf–æ—F–öâ#¢$VÆV7G&öö7VÆöw&l:Ö¢&Vv—7G&òFRf&–6–öæW2VÌ:–7G&–62&VÆ6–öæF26öâÖ÷f–Ö–VçFòö7VÆ"â"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$W7FFòFVÂ'FR"À¢&FVf–æ—F–öâ#¢%&Wf—6œ;6âFRÆ26öÇV6–öæW2’6öæö6–Ö–VçF÷2&VÆWfçFW2–W†—7FVçFW2â"À¢&ÖöGVÆR#¢'6VÆV66–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$W7FFò6VwW&ò"À¢&FVf–æ—F–öâ#¢$6öæf–wW&6œ;6âFW7F–æF&VGV6—"&–W6vò7VæFòö7W'&RVâW'&÷"ò–æ6W'F–GVÖ'&Râ"À¢&ÖöGVÆR#¢&Ö÷F÷&—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$dDÒôddb"À¢&FVf–æ—F–öâ#¢%&ö6W6òFR–×&W6œ;6âVRgVæFR’FW÷6—Ff–ÆÖVçFòFW&Ö÷Ì:7F–6ò÷"62â"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$f–ÇG&Fò"À¢&FVf–æ—F–öâ#¢%&ö6W6Ö–VçFòFW7F–æFò&VGV6—"6ö×öæVçFW2æòFW6VF÷2FRVæ6\;Ââ"À¢&ÖöGVÆR#¢&&–÷6Vç6÷&W2"À¢&W†Ò#¢°¢'2 ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$w&FòFRÆ–&W'FB"À¢&FVf–æ—F–öâ#¢$Ö÷f–Ö–VçFò–æFWVæF–VçFRVRVVFRF÷F"Væ'F–7VÆ6œ;6âòÖV6æ—6Öòâ"À¢&ÖöGVÆR#¢'6VÆV66–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$–æfW&Væ6–"À¢&FVf–æ—F–öâ#¢%W6òFRVâÖöFVÆòVçG&VæFò&&VFV6—"6ö'&RFF÷2çVWf÷2â"À¢&ÖöGVÆR#¢&&VæF—¦¦RÖWFöÖF–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$ÆGF–6R"À¢&FVf–æ—F–öâ#¢$'V—FV7GW&&WF–7VÆ"–çFW&æVRF—7G&–'W–RÖFW&–Â’&÷–VFFW2â"À¢&ÖöGVÆR#¢&÷F–Ö—¦6–öâ"À¢&W†Ò#¢°¢'""À¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$Æ”D""À¢&FVf–æ—F–öâ#¢%FV6æöÆö|:ÖVRW7F–ÖF—7Fæ6–2ÖVF–çFRVÇ6÷2FRÇW¢&W&6–&—"VÂVçF÷&æòâ"À¢&ÖöGVÆR#¢'6–×VÆ6–öâ"À¢&W†Ò#¢µĞ¢ÒÀ¢°¢'FW&Ò#¢$ÖçVf7GW&F—F—f"À¢&FVf–æ—F–öâ#¢$f'&–66œ;6âÖVF–çFR–æ6÷'÷&6œ;6â7V6W6—fFRÖFW&–ÂFW6FRVâÖöFVÆòF–v—FÂâ"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$Ü:V–æFRW7FF÷2"À¢&FVf–æ—F–öâ#¢$ÖöFVÆòVR÷&væ—¦VÂ6ö×÷'FÖ–VçFòVâW7FF÷2’G&ç6–6–öæW2FVf–æ–F2â"À¢&ÖöGVÆR#¢&Ö÷F÷&—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$ÖV6æ—6ÖòFR7VG&ò&'&2"À¢&FVf–æ—F–öâ#¢$6FVæ6W'&FFR7VG&òVÆVÖVçF÷2'F–7VÆF÷2VRG&ç6f÷&ÖÖ÷f–Ö–VçFòâ"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$ÖV6æ—6ÖòFR&WF÷&æò,:–Fò"À¢&FVf–æ—F–öâ#¢$ÖV6æ—6Öò6öâ6'&W&2÷VW7F2FRF—7F–çFGW&6œ;6ââ"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢$÷F–Ö—¦6œ;6â"À¢&FVf–æ—F–öâ#¢$,;§7VVFFRVæÖV¦÷"6öÇV6œ;6â6V|;¦âVâö&¦WF—fò’&W7G&–66–öæW2â"À¢&ÖöGVÆR#¢&÷F–Ö—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%&÷F÷F—ò"À¢&FVf–æ—F–öâ#¢%fW'6œ;6âFR'VV&WF–Æ—¦F&&VæFW"ÂfÆ–F"’6÷'&Vv—"çFW2FRÆ6öÇV6œ;6âf–æÂâ"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%&VÆ–ÖVçF6œ;6â"À¢&FVf–æ—F–öâ#¢$–æf÷&Ö6œ;6â6ö'&RÆ6Æ–F&VÂVRgVVÇfRÂ6öçG&öÆF÷"â"À¢&ÖöGVÆR#¢&Ö÷F÷&—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%&VBæWW&öæÂ"À¢&FVf–æ—F–öâ#¢$ÖöFVÆòFR626öæV7FF27W–÷2,:ÖWG&÷26R§W7FâGW&çFRVÂVçG&VæÖ–VçFòâ"À¢&ÖöGVÆR#¢&&VæF—¦¦RÖWFöÖF–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%&–v–FW¢"À¢&FVf–æ—F–öâ#¢%&W6—7FVæ6–FRVæW7G'V7GW&FVf÷&Ö'6R&¦ò6&vâ"À¢&ÖöGVÆR#¢&÷F–Ö—¦6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%4Ä"À¢&FVf–æ—F–öâ#¢%&ö6W6òVR6öÆ–F–f–66VÆV7F—fÖVçFRVæ&W6–æÌ:×V–Ff÷F÷6Vç6–&ÆRâ"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%4Å2"À¢&FVf–æ—F–öâ#¢%&ö6W6òVRgW6–öæ6VÆV7F—fÖVçFRÖFW&–ÂVâöÇfòÖVF–çFRVæW&|:ÖÌ:6W"â"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%6W'föÖ÷F÷""À¢&FVf–æ—F–öâ#¢$7GVF÷"6öâ6öçG&öÂFR÷6–6œ;6âÖVF–çFR&VÆ–ÖVçF6œ;6â–çFW&æâ"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%6–×VÆ6œ;6âF–ì:Ö–6"À¢&FVf–æ—F–öâ#¢$ÖöFVÆòf—'GVÂVR–æ6÷'÷&Ö62ÂgVW'¦2Âw&fVFBR–æW&6–â"À¢&ÖöGVÆR#¢'6–×VÆ6–öâ"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%7V&7GV6œ;6â"À¢&FVf–æ—F–öâ#¢%W6òFRÖVæ÷27GVF÷&W2VRw&F÷2FRÆ–&W'FBÂ6ö÷&F–æF÷2÷"ÆÖV<:æ–6â"À¢&ÖöGVÆR#¢&F—6Væò×&ö&÷F–6ò"À¢&W†Ò#¢°¢'" ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%FöÆW&æ6–"À¢&FVf–æ—F–öâ#¢$Ö&vVâF–ÖVç6–öæÂæV6W6&–ò&VRÆ2–W¦2&VÆW2Væ6¦Vâ’gVæ6–öæVââ"À¢&ÖöGVÆR#¢&ÖçVf7GW&"À¢&W†Ò#¢°¢'B ¢Ğ¢ÒÀ¢°¢'FW&Ò#¢%F÷'VR"À¢&FVf–æ—F–öâ#¢$VfV7Fò&÷F6–öæÂFRVægVW'¦Ç&VFVF÷"FRVâV¦Râ"À¢&ÖöGVÆR#¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&W†Ò#¢°¢'" ¢Ğ¢Ğ¢ÒÀ¢'7GVG•F‡2#¢°¢°¢&–B#¢&W†ÒÖf7B"À¢'F—FÆR#¢%'WF,:–F&VÂW†ÖVâ"À¢&FW67&—F–öâ#¢%&–÷&—¦Æ÷2FVÖ26öâ&VÆ6œ;6âF—&V7FÆ26öç6–væ2â"À¢&ÖöGVÆW2#¢°¢&F—6Væò×&ö&÷F–6ò"À¢&&–÷6Vç6÷&W2"À¢&ÖçVf7GW&"À¢'6VÆV66–öâ"À¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2 ¢ÒÀ¢&W7F–ÖFVDÖ–çWFW2#¢P¢ÒÀ¢°¢&–B#¢&6ö×ÆWFR"À¢'F—FÆR#¢%'WF6ö×ÆWFFVÂæG&ö–FR"À¢&FW67&—F–öâ#¢%&V6÷'&RVÂ&ö6W6òFW6FRÆFVf–æ–6œ;6â†7FÆf'&–66œ;6ââ"À¢&ÖöGVÆW2#¢°¢'6VÆV66–öâ"À¢&ÖöFVÆ÷2ÖÖFVÖF–6÷2"À¢&F—6Væò×&ö&÷F–6ò"À¢&&–÷6Vç6÷&W2"À¢&&VæF—¦¦RÖWFöÖF–6ò"À¢&Ö÷F÷&—¦6–öâ"À¢'6–×VÆ6–öâ"À¢&÷F–Ö—¦6–öâ"À¢&ÖçVf7GW& ¢ÒÀ¢&W7F–ÖFVDÖ–çWFW2#¢ƒP¢ÒÀ¢°¢&–B#¢'6–væÇ2"À¢'F—FÆR#¢%'WFFR6\;ÆW2’6öçG&öÂ"À¢&FW67&—F–öâ#¢$Væfö6FVâ&–÷6Vç6÷&W2Â6Æ6–f–66œ;6â’Ö÷F÷&—¦6œ;6ââ"À¢&ÖöGVÆW2#¢°¢&&–÷6Vç6÷&W2"À¢&&VæF—¦¦RÖWFöÖF–6ò"À¢&Ö÷F÷&—¦6–öâ ¢ÒÀ¢&W7F–ÖFVDÖ–çWFW2#¢c@¢Ğ¢Ğ§Ó°