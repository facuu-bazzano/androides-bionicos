window.AB_CONTENT = {
  "meta": {
    "title": "Androides Biónicos",
    "subtitle": "Academia personal de estudio",
    "description": "Una ruta interactiva para comprender los conceptos del webinar, relacionarlos con el examen y estudiar a tu ritmo.",
    "version": "1.0.0",
    "disclaimer": "Este material reconstruye y amplía los temas a partir del temario y los apuntes disponibles. No es una transcripción oficial del webinar ni un banco oficial de respuestas de P4H Bionics.",
    "confidenceLegend": [
      {
        "id": "directo",
        "label": "Directo",
        "description": "El concepto aparece explícitamente en el temario o en los apuntes compartidos."
      },
      {
        "id": "probable",
        "label": "Probable",
        "description": "La relación es muy consistente con las pistas del examen, pero no contamos con la diapositiva original."
      },
      {
        "id": "ampliacion",
        "label": "Ampliación",
        "description": "Explicación técnica agregada para que el concepto se entienda y pueda aplicarse."
      }
    ]
  },
  "examQuestions": [
    {
      "id": "q1",
      "number": 1,
      "title": "Área de estudios o experiencia profesional",
      "points": null,
      "prompt": "Describe brevemente tu área de estudios o experiencia profesional.",
      "key": "Conectar tu experiencia real con la interacción humano-tecnología.",
      "mappedModules": [
        "simulacion"
      ],
      "recommendedTopics": [
        "Diseño UX/UI y productos digitales",
        "Flujos, interfaces y comprensión de necesidades",
        "Interacción humano-tecnología",
        "Accesibilidad, feedback y seguridad percibida",
        "Realidad virtual como herramienta de evaluación"
      ],
      "structure": [
        "Nombrar tu área profesional.",
        "Explicar brevemente qué tipo de problemas resolvés.",
        "Relacionarla honestamente con el webinar, sin afirmar experiencia robótica que no tenés."
      ],
      "caution": "No necesitás introducir fórmulas, sensores ni manufactura. La pregunta busca ubicar desde qué disciplina llegaste al curso."
    },
    {
      "id": "q2",
      "number": 2,
      "title": "Cinco de las nueve etapas",
      "points": 50,
      "prompt": "Menciona y describe 5 de las 9 etapas vistas en tu Webinar. Clave: una de ellas es el Diseño Robótico.",
      "key": "Explicar el objetivo de cada etapa, qué se hace y un ejemplo.",
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
        "Metodología de selección del androide",
        "Modelos matemáticos sugeridos",
        "Diseño robótico",
        "Programación enfocada a la motorización",
        "Herramientas de simulación"
      ],
      "alternativeTopics": [
        "Metodología de selección",
        "Modelos matemáticos",
        "Diseño robótico",
        "Biosensores",
        "Manufactura y prototipaje"
      ],
      "structure": [
        "Nombrar la etapa.",
        "Explicar para qué sirve dentro del proceso.",
        "Mencionar dos o tres acciones o conceptos propios de esa etapa.",
        "Cerrar con un ejemplo sencillo aplicado a un androide."
      ],
      "caution": "La división exacta en nueve etapas es una reconstrucción razonada. Simulación y optimización se separan porque el examen pide nueve, aunque en el temario aparecen juntas."
    },
    {
      "id": "q3",
      "number": 3,
      "title": "Dos sensores del webinar",
      "points": 30,
      "prompt": "Menciona y describe los dos sensores vistos en tu webinar. Clave: uno de ellos usa la señal muscular.",
      "key": "La señal muscular identifica al EMG. El segundo más probable es EOG.",
      "mappedModules": [
        "biosensores"
      ],
      "recommendedTopics": [
        "Sensor o sistema mioeléctrico EMG",
        "Sensor o sistema electrooculográfico EOG",
        "Electrodos, filtrado e interpretación",
        "Ejemplos de control de mano robótica y animatrónico ocular"
      ],
      "structure": [
        "Indicar qué señal biológica detecta.",
        "Explicar cómo se obtiene de forma general.",
        "Aclarar que debe acondicionarse y procesarse.",
        "Dar un uso concreto dentro de un sistema biónico."
      ],
      "caution": "EMG es prácticamente seguro por la pista de la señal muscular. EOG es la hipótesis más sólida por tus apuntes; EEG también fue mencionado, pero registra actividad cerebral."
    },
    {
      "id": "q4",
      "number": 4,
      "title": "Manufactura para prototipaje",
      "points": 20,
      "prompt": "Menciona y describe el tipo de manufactura para prototipaje de androides visto en tu webinar. Clave: usa plásticos.",
      "key": "Manufactura aditiva; el proceso plástico más probable es FDM o FFF.",
      "mappedModules": [
        "manufactura"
      ],
      "recommendedTopics": [
        "Manufactura aditiva o impresión 3D",
        "Construcción capa por capa desde un modelo digital",
        "FDM/FFF mediante filamento termoplástico",
        "Iteración rápida sin moldes industriales"
      ],
      "structure": [
        "Nombrar el tipo general: manufactura aditiva.",
        "Explicar que agrega material por capas.",
        "Describir FDM/FFF y el uso de filamentos plásticos.",
        "Relacionarlo con falanges, soportes, carcasas o articulaciones."
      ],
      "caution": "SLA y SLS también son manufactura aditiva, pero la pista de plásticos y prototipaje accesible apunta con mayor fuerza a FDM/FFF."
    }
  ],
  "modules": [
    {
      "id": "seleccion",
      "order": 1,
      "title": "Metodología de selección del androide",
      "shortTitle": "Selección",
      "kicker": "Definir antes de construir",
      "icon": "target",
      "duration": 14,
      "difficulty": "Inicial",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "Se define qué androide se necesita, para quién, en qué entorno y con qué restricciones. Es la etapa que transforma una idea general en un problema de diseño concreto.",
      "whyItMatters": "Una decisión incorrecta al comienzo se multiplica después en motores innecesarios, mecanismos sobredimensionados, costos mayores o una interacción difícil de usar.",
      "learningGoals": [
        "Distinguir androides orientados a destreza e interacción.",
        "Reconocer los requisitos que condicionan el diseño.",
        "Entender qué significa un grado de libertad.",
        "Explicar por qué se investiga el estado del arte."
      ],
      "sections": [
        {
          "title": "La pregunta de partida",
          "paragraphs": [
            "El desarrollo no debería comenzar eligiendo un motor o dibujando una carcasa. Primero se establece qué tarea debe resolver el androide y por qué una forma humanoide aporta valor.",
            "Un sistema pensado para tomar objetos necesita prioridades distintas a uno creado para conversar, guiar a una persona o representar un personaje. La selección define el alcance antes de que aparezcan las decisiones mecánicas."
          ],
          "bullets": [
            "Objetivo principal y tareas secundarias.",
            "Usuario o población que interactuará con el sistema.",
            "Entorno: laboratorio, hogar, hospital, industria o escenario.",
            "Nivel de autonomía y supervisión humana.",
            "Dimensiones, peso, energía, presupuesto y seguridad."
          ],
          "visual": "selection-map"
        },
        {
          "title": "Destreza e interacción",
          "paragraphs": [
            "Una clasificación útil separa los sistemas cuya prioridad es actuar físicamente de aquellos cuya prioridad es relacionarse con personas. No son categorías excluyentes, pero ayudan a decidir dónde invertir complejidad."
          ],
          "comparison": {
            "left": {
              "title": "Orientado a destreza",
              "items": [
                "Agarre y manipulación",
                "Precisión y repetibilidad",
                "Fuerza y control de contacto",
                "Equilibrio o locomoción"
              ]
            },
            "right": {
              "title": "Orientado a interacción",
              "items": [
                "Gestos y expresividad",
                "Comprensión de comandos",
                "Feedback claro para la persona",
                "Apariencia y conducta social"
              ]
            }
          }
        },
        {
          "title": "Requisitos y grados de libertad",
          "paragraphs": [
            "Un grado de libertad es un movimiento independiente que puede realizar una articulación o mecanismo. Una bisagra simple permite una rotación; un hombro robótico puede requerir varias rotaciones independientes.",
            "Más grados de libertad aumentan la movilidad, pero también la cantidad de actuadores, sensores, cálculos, cableado y puntos de fallo. Por eso no se agregan por realismo, sino porque una tarea los necesita."
          ],
          "bullets": [
            "Qué movimientos son indispensables.",
            "Qué amplitud necesita cada articulación.",
            "Qué carga debe soportar.",
            "Qué velocidad y precisión son aceptables.",
            "Qué límites evitan daños al robot o al usuario."
          ]
        },
        {
          "title": "Estado del arte, viabilidad y seguridad",
          "paragraphs": [
            "Investigar el estado del arte significa revisar robots existentes, artículos, patentes, mecanismos y experiencias anteriores. No se trata de copiar, sino de identificar qué ya fue resuelto y qué restricciones siguen abiertas.",
            "La viabilidad combina desempeño, costo, tiempo, materiales y capacidad técnica. La seguridad debe contemplarse desde la selección: límites de fuerza, velocidad, temperatura, recorrido y respuesta ante pérdida de energía o señal."
          ],
          "callout": {
            "title": "Pregunta guía",
            "text": "¿Cuál es la solución más simple que cumple la tarea sin introducir movimientos, sensores o apariencia que no aportan valor?"
          }
        }
      ],
      "concepts": [
        {
          "term": "Androide",
          "definition": "Robot diseñado para reproducir total o parcialmente la forma, el movimiento o la interacción humana.",
          "example": "Una cabeza animatrónica puede ser un subsistema androide aunque no exista un cuerpo completo."
        },
        {
          "term": "Grado de libertad",
          "definition": "Movimiento independiente que puede adoptar una articulación o sistema.",
          "example": "La flexión de un codo representa un grado de libertad rotacional."
        },
        {
          "term": "Estado del arte",
          "definition": "Revisión de las soluciones y conocimientos más relevantes disponibles para un problema.",
          "example": "Comparar manos robóticas existentes antes de definir un nuevo mecanismo de dedos."
        },
        {
          "term": "Requisito",
          "definition": "Condición verificable que el sistema debe cumplir.",
          "example": "La mano debe sujetar un objeto de 500 gramos sin superar cierta fuerza."
        }
      ],
      "process": [
        "Definir problema y usuario.",
        "Elegir prioridad: destreza, interacción o combinación.",
        "Identificar movimientos y grados de libertad.",
        "Establecer restricciones técnicas y de seguridad.",
        "Comparar alternativas y seleccionar el concepto viable."
      ],
      "appliedExample": {
        "title": "Ejemplo: mano de asistencia",
        "text": "Si el objetivo es ayudar a sujetar objetos cotidianos, se priorizan agarre, peso y seguridad. No sería razonable invertir primero en piel artificial o expresiones faciales, porque no contribuyen a la tarea principal."
      },
      "quiz": [
        {
          "id": "m1q1",
          "prompt": "¿Qué debería definirse antes de seleccionar motores y mecanismos?",
          "options": [
            "El color final del prototipo",
            "La tarea, el usuario y las restricciones",
            "La marca de la impresora 3D",
            "La red neuronal que se utilizará"
          ],
          "answer": 1,
          "explanation": "La selección comienza por el problema, el contexto y los requisitos; la tecnología se elige después."
        },
        {
          "id": "m1q2",
          "prompt": "¿Qué efecto suele tener aumentar los grados de libertad?",
          "options": [
            "Siempre reduce el costo",
            "Elimina la necesidad de sensores",
            "Aumenta movilidad y también complejidad",
            "Impide usar servomotores"
          ],
          "answer": 2,
          "explanation": "Más movimientos independientes permiten mayor destreza, pero demandan control, actuadores y validación adicionales."
        },
        {
          "id": "m1q3",
          "prompt": "Un androide orientado a interacción prioriza especialmente…",
          "options": [
            "Solamente la velocidad de giro",
            "Gestos, comprensión y feedback para personas",
            "La eliminación de toda apariencia humana",
            "La fabricación sustractiva"
          ],
          "answer": 1,
          "explanation": "La interacción requiere que la conducta del sistema sea perceptible, comprensible y segura para la persona."
        }
      ],
      "takeaways": [
        "Primero se define el problema; luego se elige la tecnología.",
        "Destreza e interacción generan prioridades distintas.",
        "Cada grado de libertad debe justificar su costo y complejidad.",
        "El estado del arte reduce riesgos y evita reinventar soluciones."
      ]
    },
    {
      "id": "modelos-matematicos",
      "order": 2,
      "title": "Modelos matemáticos sugeridos",
      "shortTitle": "Modelos matemáticos",
      "kicker": "Representar el movimiento antes de fabricarlo",
      "icon": "axis",
      "duration": 20,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "Los modelos matemáticos describen posiciones, orientaciones, trayectorias y fuerzas. Permiten calcular cómo debe moverse el androide y detectar limitaciones antes de construirlo.",
      "whyItMatters": "Sin un modelo, el movimiento se ajusta por prueba y error. Con un modelo se puede predecir alcance, suavidad, torque y configuraciones imposibles.",
      "learningGoals": [
        "Diferenciar cinemática y dinámica.",
        "Entender para qué se usa Denavit-Hartenberg.",
        "Distinguir cinemática directa e inversa.",
        "Relacionar curvas de Bézier con trayectorias suaves."
      ],
      "sections": [
        {
          "title": "Cinemática y dinámica",
          "paragraphs": [
            "La cinemática estudia posiciones, orientaciones, velocidades y aceleraciones sin concentrarse primero en las fuerzas que producen el movimiento. La dinámica incorpora masas, gravedad, inercia, fuerzas y torque.",
            "Un modelo cinemático puede indicar dónde quedará la mano según los ángulos del hombro y el codo. Un modelo dinámico ayuda a saber si los motores tienen fuerza suficiente para moverla sosteniendo una carga."
          ],
          "comparison": {
            "left": {
              "title": "Cinemática",
              "items": [
                "Posición y orientación",
                "Ángulos y desplazamientos",
                "Velocidad y aceleración",
                "Alcance del mecanismo"
              ]
            },
            "right": {
              "title": "Dinámica",
              "items": [
                "Masa e inercia",
                "Gravedad y fuerzas",
                "Torque requerido",
                "Respuesta ante cargas"
              ]
            }
          }
        },
        {
          "title": "Convención de Denavit-Hartenberg",
          "paragraphs": [
            "Denavit-Hartenberg es una forma sistemática de describir una cadena robótica colocando sistemas de coordenadas en articulaciones y eslabones consecutivos. Cada relación se expresa mediante distancias y rotaciones.",
            "Al encadenar esas transformaciones se calcula la posición y orientación de la parte final, por ejemplo una mano, con respecto a la base del robot. Para una respuesta descriptiva no es necesario desarrollar las matrices; sí explicar qué problema resuelven."
          ],
          "visual": "dh-chain",
          "callout": {
            "title": "Idea esencial",
            "text": "Denavit-Hartenberg convierte una cadena física de eslabones y articulaciones en una representación matemática ordenada."
          }
        },
        {
          "title": "Cinemática directa e inversa",
          "paragraphs": [
            "La cinemática directa parte de los valores de las articulaciones y calcula la posición final. La inversa parte de una posición deseada y busca qué valores articulares permiten alcanzarla.",
            "La cinemática inversa puede tener varias soluciones, ninguna solución o soluciones que violan límites físicos. Un brazo podría alcanzar el mismo punto con el codo hacia arriba o hacia abajo, pero una de esas configuraciones quizá choque con el cuerpo."
          ],
          "comparison": {
            "left": {
              "title": "Directa",
              "items": [
                "Entrada: ángulos articulares",
                "Salida: posición final",
                "Pregunta: ¿dónde queda la mano?"
              ]
            },
            "right": {
              "title": "Inversa",
              "items": [
                "Entrada: destino deseado",
                "Salida: ángulos necesarios",
                "Pregunta: ¿cómo llego a la taza?"
              ]
            }
          }
        },
        {
          "title": "Curvas y polinomios de Bézier",
          "paragraphs": [
            "Una curva de Bézier se controla mediante puntos que definen la forma del recorrido. En robótica puede representar la trayectoria que seguirá una mano, un pie o un dron.",
            "En lugar de saltar entre posiciones, el sistema interpola un recorrido continuo. Esto ayuda a evitar cambios bruscos, rodear obstáculos y controlar la aproximación al destino."
          ],
          "visual": "bezier",
          "bullets": [
            "Movimiento visualmente más natural.",
            "Continuidad en posición y, según el diseño, en velocidad.",
            "Control intuitivo mediante puntos intermedios.",
            "Posibilidad de optimizar la forma de la trayectoria."
          ]
        }
      ],
      "concepts": [
        {
          "term": "Cinemática",
          "definition": "Estudio geométrico del movimiento sin centrarse inicialmente en las fuerzas que lo causan.",
          "example": "Calcular el alcance de una mano robótica."
        },
        {
          "term": "Dinámica",
          "definition": "Estudio del movimiento considerando masas, fuerzas, gravedad e inercia.",
          "example": "Estimar el torque requerido en el hombro."
        },
        {
          "term": "Denavit-Hartenberg",
          "definition": "Convención para relacionar matemáticamente eslabones y articulaciones mediante transformaciones coordinadas.",
          "example": "Obtener la posición de la muñeca respecto a la base del torso."
        },
        {
          "term": "Curva de Bézier",
          "definition": "Curva paramétrica gobernada por puntos de control, útil para diseñar recorridos suaves.",
          "example": "Guiar la mano por encima de un obstáculo."
        },
        {
          "term": "Torque",
          "definition": "Efecto rotacional de una fuerza alrededor de un eje.",
          "example": "El motor del codo necesita torque suficiente para levantar el antebrazo y la carga."
        }
      ],
      "process": [
        "Representar eslabones y articulaciones.",
        "Definir sistemas de referencia y límites.",
        "Resolver posición mediante cinemática directa o inversa.",
        "Diseñar una trayectoria suave.",
        "Incorporar cargas y torque para validar la dinámica."
      ],
      "appliedExample": {
        "title": "Ejemplo: alcanzar una taza",
        "text": "La cinemática inversa calcula los ángulos del hombro, codo y muñeca para llegar a la taza. Una trayectoria de Bézier puede elevar primero la mano y aproximarla sin golpear objetos intermedios."
      },
      "quiz": [
        {
          "id": "m2q1",
          "prompt": "¿Qué calcula la cinemática directa?",
          "options": [
            "La posición final a partir de valores articulares",
            "El material de una pieza",
            "La actividad muscular",
            "La imagen de un contorno"
          ],
          "answer": 0,
          "explanation": "La directa toma la configuración conocida del robot y calcula la pose resultante."
        },
        {
          "id": "m2q2",
          "prompt": "¿Para qué sirve principalmente Denavit-Hartenberg?",
          "options": [
            "Imprimir piezas en resina",
            "Describir relaciones entre eslabones y articulaciones",
            "Filtrar una señal EMG",
            "Detectar bordes de una imagen"
          ],
          "answer": 1,
          "explanation": "La convención organiza la geometría de una cadena articulada mediante transformaciones."
        },
        {
          "id": "m2q3",
          "prompt": "Una trayectoria de Bézier resulta útil cuando se busca…",
          "options": [
            "Un cambio instantáneo de posición",
            "Un recorrido suave y controlable",
            "Una pieza completamente maciza",
            "Eliminar todos los sensores"
          ],
          "answer": 1,
          "explanation": "Los puntos de control permiten construir recorridos continuos y ajustar su forma."
        }
      ],
      "takeaways": [
        "La cinemática describe el movimiento; la dinámica agrega fuerzas y masas.",
        "Denavit-Hartenberg ordena matemáticamente una cadena articulada.",
        "La directa calcula dónde llega; la inversa calcula cómo llegar.",
        "Bézier permite planificar trayectorias suaves y modificables."
      ]
    },
    {
      "id": "diseno-robotico",
      "order": 3,
      "title": "Diseño robótico, manos y animatrónicos",
      "shortTitle": "Diseño robótico",
      "kicker": "Convertir el movimiento en mecanismos reales",
      "icon": "hand",
      "duration": 24,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "Esta etapa define la estructura física: falanges, articulaciones, transmisiones, engranajes, servomotores y mecanismos que convierten la energía en movimiento útil.",
      "whyItMatters": "El software puede ordenar un movimiento, pero la geometría y la transmisión determinan qué movimiento es físicamente posible, con qué fuerza y con qué precisión.",
      "learningGoals": [
        "Comprender cómo se simplifica una mano humana en un mecanismo robótico.",
        "Explicar el funcionamiento general de un mecanismo de cuatro barras.",
        "Relacionar engranajes y servomotores con torque y posición.",
        "Diferenciar un animatrónico de un androide autónomo."
      ],
      "sections": [
        {
          "title": "De la anatomía al mecanismo",
          "paragraphs": [
            "La mano humana integra huesos, articulaciones, músculos, tendones, ligamentos y receptores sensoriales. Una mano robótica no suele copiar cada componente; abstrae la función y la resuelve con piezas fabricables.",
            "Las falanges se convierten en cuerpos rígidos, las articulaciones en pasadores o bisagras, los músculos en actuadores y los tendones en cables. El retorno puede resolverse con elásticos, resortes o actuadores antagonistas."
          ],
          "bullets": [
            "Falanges y articulaciones definen la geometría.",
            "Cables o bielas transmiten el movimiento.",
            "Actuadores aportan energía.",
            "Sensores informan posición, contacto o fuerza.",
            "Topes mecánicos protegen el rango de movimiento."
          ],
          "visual": "robotic-hand"
        },
        {
          "title": "Actuación completa y subactuación",
          "paragraphs": [
            "En un sistema totalmente actuado, cada movimiento relevante dispone de un actuador independiente. En uno subactuado, hay menos actuadores que movimientos y la mecánica distribuye el esfuerzo entre varias articulaciones.",
            "La subactuación reduce peso, costo y controladores. A cambio, limita el control individual. En una mano puede permitir que un único motor cierre varias falanges y que los dedos se adapten al objeto."
          ],
          "comparison": {
            "left": {
              "title": "Totalmente actuado",
              "items": [
                "Control individual mayor",
                "Más motores y cableado",
                "Mayor peso y consumo",
                "Programación más compleja"
              ]
            },
            "right": {
              "title": "Subactuado",
              "items": [
                "Menos actuadores",
                "Adaptación mecánica al objeto",
                "Menor control independiente",
                "Diseño mecánico más determinante"
              ]
            }
          }
        },
        {
          "title": "Mecanismo de cuatro barras",
          "paragraphs": [
            "Está formado por cuatro elementos rígidos unidos en un lazo cerrado. Una barra permanece fija, otra recibe el movimiento y las restantes transmiten una trayectoria determinada por la geometría.",
            "Puede convertir una rotación en oscilación, coordinar articulaciones o mantener una orientación. En dedos y mandíbulas, permite obtener movimientos coordinados con pocos actuadores."
          ],
          "visual": "four-bar",
          "callout": {
            "title": "La geometría también controla",
            "text": "Un mecanismo bien diseñado produce parte del comportamiento por su forma física, reduciendo lo que debe resolver el software."
          }
        },
        {
          "title": "Engranajes y servomotores",
          "paragraphs": [
            "Los engranajes transmiten rotación y modifican la relación entre velocidad y torque. Una reducción suele disminuir la velocidad de salida y aumentar el torque disponible.",
            "Un servomotor integra motor, reducción, sensor de posición y control. Recibe una posición deseada e intenta llevar su eje hasta ella, por eso es frecuente en ojos, mandíbulas, dedos y pequeñas articulaciones."
          ],
          "bullets": [
            "Más reducción: normalmente más torque y menos velocidad.",
            "La holgura de engranajes reduce precisión.",
            "El servo necesita límites para no forzar la articulación.",
            "La carga real determina si el servo seleccionado es suficiente."
          ]
        },
        {
          "title": "Retorno rápido, animatrónicos y biomimética",
          "paragraphs": [
            "Un mecanismo de retorno rápido produce dos recorridos opuestos con tiempos distintos: una carrera de trabajo controlada y un regreso más veloz. Es un ejemplo de cómo la geometría modifica la velocidad sin cambiar continuamente el motor.",
            "Un animatrónico reproduce movimientos o apariencia de un ser vivo, como ojos, párpados, mandíbula o cuello. Puede seguir secuencias preprogramadas sin ser autónomo.",
            "La biomimética estudia principios de la naturaleza y los adapta. No exige copiar literalmente un dedo o un hueso; busca entender qué función resuelve su estructura y traducirla a materiales y mecanismos disponibles."
          ]
        }
      ],
      "concepts": [
        {
          "term": "Mecanismo de cuatro barras",
          "definition": "Cadena cerrada de cuatro elementos articulados que transforma o coordina movimiento.",
          "example": "Coordinar dos falanges de un dedo con un único accionamiento."
        },
        {
          "term": "Servomotor",
          "definition": "Actuador con control de posición integrado mediante realimentación interna.",
          "example": "Orientar el ojo de un animatrónico a un ángulo concreto."
        },
        {
          "term": "Subactuación",
          "definition": "Configuración con menos actuadores que grados de libertad controlados por la mecánica.",
          "example": "Un motor cierra varias articulaciones de un dedo mediante un cable."
        },
        {
          "term": "Biomimética",
          "definition": "Diseño inspirado en principios funcionales observados en sistemas biológicos.",
          "example": "Usar una estructura interna ligera inspirada en hueso trabecular."
        },
        {
          "term": "Animatrónico",
          "definition": "Dispositivo mecanizado que reproduce apariencia o movimiento de un ser vivo, a menudo mediante secuencias programadas.",
          "example": "Un rostro que mueve ojos y mandíbula sincronizado con audio."
        }
      ],
      "process": [
        "Descomponer la función en movimientos.",
        "Definir eslabones, articulaciones y topes.",
        "Elegir mecanismo y transmisión.",
        "Dimensionar actuadores según carga y velocidad.",
        "Prototipar, medir holguras y ajustar."
      ],
      "appliedExample": {
        "title": "Ejemplo: dedo subactuado",
        "text": "Un servomotor tira de un cable. El cable flexiona las falanges conectadas por articulaciones y elásticos. Al tocar un objeto, cada falange puede adaptarse ligeramente a su forma sin disponer de un motor propio."
      },
      "quiz": [
        {
          "id": "m3q1",
          "prompt": "¿Qué ventaja ofrece un sistema subactuado?",
          "options": [
            "Control individual absoluto de cada articulación",
            "Menos actuadores y menor peso",
            "Eliminación de todo mecanismo",
            "Mayor consumo por definición"
          ],
          "answer": 1,
          "explanation": "La subactuación reduce actuadores y aprovecha la mecánica para coordinar movimientos."
        },
        {
          "id": "m3q2",
          "prompt": "¿Qué función cumplen los engranajes en un androide?",
          "options": [
            "Detectar actividad cerebral",
            "Transmitir giro y modificar velocidad/torque",
            "Generar una imagen de profundidad",
            "Curar una resina"
          ],
          "answer": 1,
          "explanation": "Los trenes de engranajes adaptan la salida del motor a las necesidades del mecanismo."
        },
        {
          "id": "m3q3",
          "prompt": "¿Qué caracteriza a un animatrónico?",
          "options": [
            "Debe tomar decisiones autónomas complejas",
            "Reproduce movimientos o apariencia de un ser vivo",
            "Solo puede fabricarse en metal",
            "No utiliza motores"
          ],
          "answer": 1,
          "explanation": "Puede ser visualmente convincente aunque ejecute secuencias predefinidas y no sea autónomo."
        }
      ],
      "takeaways": [
        "La estructura física condiciona el comportamiento del robot.",
        "Cuatro barras y engranajes transforman o coordinan movimiento.",
        "Un servo controla posición, pero debe dimensionarse para la carga.",
        "La biomimética adapta principios naturales, no copias literales."
      ]
    },
    {
      "id": "biosensores",
      "order": 4,
      "title": "Biosensores e interfaces bioeléctricas",
      "shortTitle": "Biosensores",
      "kicker": "Convertir señales del cuerpo en comandos",
      "icon": "pulse",
      "duration": 23,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q2",
        "q3"
      ],
      "summary": "Los sistemas bioeléctricos registran señales del cuerpo, las acondicionan y las interpretan para controlar una prótesis, una mano robótica, un animatrónico o una interfaz.",
      "whyItMatters": "Una señal biológica no es una orden lista para usar. Es débil, variable y sensible al ruido; requiere electrodos, amplificación, filtrado, calibración y una regla de interpretación.",
      "learningGoals": [
        "Comprender el recorrido desde la señal corporal hasta el actuador.",
        "Explicar qué registra un sistema EMG.",
        "Explicar qué registra un sistema EOG.",
        "Distinguir EMG, EOG y EEG."
      ],
      "sections": [
        {
          "title": "Cadena de adquisición bioeléctrica",
          "paragraphs": [
            "Las señales bioeléctricas tienen amplitud baja y se mezclan con interferencias del entorno, movimiento de electrodos y actividad de otros tejidos. Por eso deben pasar por una cadena de acondicionamiento.",
            "El sistema registra la señal, la amplifica, elimina parte del ruido, la digitaliza y extrae una característica. Recién después puede aplicar un umbral o un clasificador para generar un comando."
          ],
          "visual": "signal-pipeline",
          "bullets": [
            "Electrodos: captan diferencias de potencial.",
            "Amplificación: eleva una señal pequeña.",
            "Filtrado: reduce interferencias no deseadas.",
            "Conversión digital: permite procesarla por software.",
            "Interpretación: transforma patrón en intención o comando."
          ]
        },
        {
          "title": "EMG: señal muscular",
          "paragraphs": [
            "La electromiografía registra actividad eléctrica asociada con la activación muscular. En EMG superficial se colocan electrodos sobre la piel, próximos al músculo de interés.",
            "Una aplicación básica compara reposo y contracción. Si la señal procesada supera un umbral, puede ordenarse el cierre de una mano robótica. Sistemas más avanzados clasifican varios gestos a partir de patrones."
          ],
          "callout": {
            "title": "Pista del examen",
            "text": "El sensor que «usa la señal muscular» corresponde al EMG o sensor mioeléctrico."
          },
          "bullets": [
            "Requiere calibración para cada persona y colocación.",
            "El movimiento del cable o electrodo puede introducir artefactos.",
            "La amplitud no equivale automáticamente a fuerza exacta.",
            "Puede controlar prótesis, manos o exoesqueletos."
          ]
        },
        {
          "title": "EOG: movimiento ocular",
          "paragraphs": [
            "La electrooculografía aprovecha la diferencia de potencial entre la región anterior y posterior del ojo. Al girar el ojo cambia la señal registrada por electrodos colocados alrededor de él.",
            "Con una disposición adecuada se distinguen movimientos horizontales, verticales y ciertos parpadeos. Esas variaciones pueden controlar ojos animatrónicos, un cursor o una interfaz asistiva."
          ],
          "bullets": [
            "Mirada izquierda/derecha mediante canal horizontal.",
            "Mirada arriba/abajo mediante canal vertical.",
            "Parpadeos como eventos detectables.",
            "Necesidad de filtrar deriva y movimientos involuntarios."
          ]
        },
        {
          "title": "EMG, EOG y EEG no son lo mismo",
          "paragraphs": [
            "Tus apuntes mencionan los tres. Es importante diferenciarlos por el origen de la señal y por el tipo de interfaz que permiten construir.",
            "En el examen, EMG es seguro por la pista. EOG es el segundo más probable por el contenido anotado sobre control ocular. EEG sigue siendo una posibilidad mencionada, pero corresponde a actividad cerebral."
          ],
          "comparison": {
            "left": {
              "title": "Señales periféricas",
              "items": [
                "EMG: actividad muscular",
                "EOG: movimiento ocular",
                "Electrodos cercanos al tejido objetivo"
              ]
            },
            "right": {
              "title": "Señal cerebral",
              "items": [
                "EEG: actividad eléctrica cerebral",
                "Electrodos sobre cuero cabelludo",
                "Interfaz cerebro-computadora"
              ]
            }
          }
        },
        {
          "title": "Calidad de señal y calibración",
          "paragraphs": [
            "La misma contracción no produce exactamente el mismo registro en todas las personas ni en todas las sesiones. La ubicación del electrodo, la piel, la fatiga y el movimiento cambian la señal.",
            "Calibrar significa registrar referencias del usuario y ajustar umbrales o modelos. Un sistema fiable también detecta pérdida de contacto y evita activar motores cuando la señal es ambigua."
          ]
        }
      ],
      "concepts": [
        {
          "term": "EMG",
          "definition": "Electromiografía: registro de actividad eléctrica asociada con la activación muscular.",
          "example": "Contraer el antebrazo para cerrar una mano robótica."
        },
        {
          "term": "EOG",
          "definition": "Electrooculografía: registro de variaciones eléctricas relacionadas con el movimiento ocular.",
          "example": "Mirar a la derecha para orientar un ojo animatrónico."
        },
        {
          "term": "EEG",
          "definition": "Electroencefalografía: registro de actividad eléctrica cerebral desde el cuero cabelludo.",
          "example": "Detectar patrones utilizados por una interfaz cerebro-computadora."
        },
        {
          "term": "Electrodo",
          "definition": "Elemento conductor que permite captar diferencias de potencial eléctrico desde el cuerpo.",
          "example": "Par de electrodos colocados sobre el antebrazo."
        },
        {
          "term": "Artefacto",
          "definition": "Alteración de la señal causada por movimiento, mala conexión o interferencia, no por la actividad que se desea medir.",
          "example": "Un cable que se mueve genera un pico falso."
        }
      ],
      "process": [
        "Colocar electrodos y comprobar contacto.",
        "Registrar una línea base y ejemplos de activación.",
        "Amplificar y filtrar la señal.",
        "Extraer una característica o clasificar un patrón.",
        "Generar un comando con límites de seguridad."
      ],
      "appliedExample": {
        "title": "Ejemplo: control mioeléctrico de una mano",
        "text": "El usuario contrae el antebrazo. El EMG registra la actividad, el software filtra la señal y detecta que supera el umbral calibrado. Entonces ordena cerrar los servos hasta una posición segura."
      },
      "quiz": [
        {
          "id": "m4q1",
          "prompt": "¿Qué señal utiliza un sistema EMG?",
          "options": [
            "Actividad muscular",
            "Profundidad LiDAR",
            "Temperatura del filamento",
            "Contornos de imagen"
          ],
          "answer": 0,
          "explanation": "EMG registra actividad eléctrica vinculada con la activación de músculos."
        },
        {
          "id": "m4q2",
          "prompt": "¿Qué puede detectar un sistema EOG?",
          "options": [
            "Torque del motor",
            "Movimiento ocular",
            "Resistencia de una pieza",
            "Velocidad de impresión"
          ],
          "answer": 1,
          "explanation": "EOG registra cambios de potencial asociados con la orientación del ojo y parpadeos."
        },
        {
          "id": "m4q3",
          "prompt": "¿Por qué una señal bioeléctrica suele filtrarse?",
          "options": [
            "Para convertirla en plástico",
            "Para reducir interferencias y artefactos",
            "Para aumentar los grados de libertad",
            "Para evitar usar electrodos"
          ],
          "answer": 1,
          "explanation": "Las señales son pequeñas y contienen ruido; el filtrado mejora su interpretabilidad."
        }
      ],
      "takeaways": [
        "La señal corporal necesita una cadena de adquisición y procesamiento.",
        "EMG se relaciona con músculos; EOG con ojos; EEG con cerebro.",
        "La calibración es parte del sistema, no un detalle opcional.",
        "El comando final debe incluir condiciones de seguridad."
      ]
    },
    {
      "id": "aprendizaje-automatico",
      "order": 5,
      "title": "Aprendizaje automático y visión artificial",
      "shortTitle": "Aprendizaje automático",
      "kicker": "Reconocer patrones en señales e imágenes",
      "icon": "network",
      "duration": 21,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "El aprendizaje automático permite clasificar señales variables y la visión artificial extrae información del entorno. Canny aparece como técnica para detectar bordes y contornos.",
      "whyItMatters": "Los patrones humanos y visuales cambian entre situaciones. Un modelo puede aprender regularidades, pero solamente si los datos, etiquetas y validación representan el uso real.",
      "learningGoals": [
        "Entender el flujo datos-entrenamiento-inferencia.",
        "Explicar qué hace una red neuronal sin atribuirle capacidades mágicas.",
        "Describir los pasos generales de Canny.",
        "Reconocer limitaciones de datos y generalización."
      ],
      "sections": [
        {
          "title": "De ejemplos a clasificaciones",
          "paragraphs": [
            "Una señal EMG puede variar aun cuando la intención sea la misma. En lugar de depender de un único umbral, se pueden recopilar ejemplos de diferentes gestos y entrenar un modelo para separarlos.",
            "Cada ejemplo se etiqueta, se transforma en características útiles y se utiliza para ajustar parámetros. Durante la inferencia, el modelo recibe una señal nueva y estima a qué clase pertenece."
          ],
          "visual": "ml-pipeline",
          "bullets": [
            "Datos representativos del uso real.",
            "Etiquetas correctas y consistentes.",
            "Separación entre entrenamiento y evaluación.",
            "Medición de errores, no solo aciertos.",
            "Recalibración cuando cambia el usuario o sensor."
          ]
        },
        {
          "title": "Redes neuronales",
          "paragraphs": [
            "Una red neuronal es un modelo compuesto por capas de unidades conectadas. Durante el entrenamiento ajusta pesos para reducir el error entre su predicción y la etiqueta conocida.",
            "En androides puede clasificar gestos musculares, reconocer objetos, estimar una fase de marcha o detectar patrones oculares. No comprende automáticamente el contexto; aprende correlaciones a partir de los datos disponibles."
          ],
          "callout": {
            "title": "Evitar una idea engañosa",
            "text": "Agregar una red neuronal no vuelve inteligente al sistema por sí sola. La calidad del comportamiento depende de datos, objetivo, evaluación y límites."
          }
        },
        {
          "title": "Canny y análisis de contornos",
          "paragraphs": [
            "El detector de Canny identifica cambios importantes de intensidad dentro de una imagen. Esos cambios suelen corresponder a bordes, aunque también pueden provenir de sombras o textura.",
            "El resultado es un mapa de bordes que puede alimentar etapas posteriores: segmentación, cálculo de forma, reconocimiento de objetos o navegación. Canny por sí solo no sabe qué objeto está viendo."
          ],
          "visual": "canny",
          "bullets": [
            "Suavizado para reducir ruido.",
            "Cálculo del gradiente de intensidad.",
            "Afinado de bordes.",
            "Umbrales fuerte y débil.",
            "Conexión de bordes coherentes."
          ]
        },
        {
          "title": "Generalización y errores",
          "paragraphs": [
            "Un modelo puede memorizar los ejemplos de entrenamiento y fallar fuera de ellos. Generalizar significa mantener un rendimiento útil con personas, iluminación, posturas o escenarios no idénticos a los datos originales.",
            "En un sistema físico los falsos positivos importan: confundir ruido con una orden puede mover un actuador. Por eso se usan umbrales de confianza, estados seguros y confirmaciones."
          ]
        }
      ],
      "concepts": [
        {
          "term": "Entrenamiento",
          "definition": "Proceso de ajustar los parámetros de un modelo utilizando ejemplos conocidos.",
          "example": "Aprender diferencias entre reposo, cierre y apertura de mano."
        },
        {
          "term": "Inferencia",
          "definition": "Uso del modelo entrenado para producir una predicción sobre un dato nuevo.",
          "example": "Clasificar una nueva ventana de señal EMG."
        },
        {
          "term": "Red neuronal",
          "definition": "Modelo de capas conectadas cuyos parámetros se ajustan para aproximar una relación entre entradas y salidas.",
          "example": "Reconocer un gesto muscular entre varias clases."
        },
        {
          "term": "Canny",
          "definition": "Algoritmo de detección de bordes basado en gradientes, afinado y doble umbral.",
          "example": "Extraer el contorno de objetos sobre una mesa."
        },
        {
          "term": "Falso positivo",
          "definition": "Detección de un evento que en realidad no ocurrió.",
          "example": "Mover la mano porque el sistema confundió ruido con una contracción."
        }
      ],
      "process": [
        "Recolectar y etiquetar ejemplos.",
        "Limpiar y representar los datos.",
        "Entrenar un modelo.",
        "Evaluar con datos separados.",
        "Integrar la predicción con reglas de seguridad."
      ],
      "appliedExample": {
        "title": "Ejemplo: tres gestos de antebrazo",
        "text": "Se registran reposo, cierre y apertura. Un clasificador aprende sus patrones. Si la probabilidad de una clase supera el umbral, el controlador ejecuta el movimiento; si la señal es dudosa, mantiene el estado seguro."
      },
      "quiz": [
        {
          "id": "m5q1",
          "prompt": "¿Qué ocurre durante la inferencia?",
          "options": [
            "Se imprime una pieza",
            "El modelo predice sobre un dato nuevo",
            "Se cambia el engranaje",
            "Se colocan los electrodos"
          ],
          "answer": 1,
          "explanation": "La inferencia es el uso operativo del modelo ya entrenado."
        },
        {
          "id": "m5q2",
          "prompt": "¿Qué produce directamente Canny?",
          "options": [
            "Un mapa de bordes",
            "Una clasificación semántica completa",
            "Una señal muscular",
            "Un modelo CAD"
          ],
          "answer": 0,
          "explanation": "Canny detecta bordes; reconocer el objeto requiere etapas adicionales."
        },
        {
          "id": "m5q3",
          "prompt": "¿Por qué un falso positivo puede ser crítico en robótica?",
          "options": [
            "Porque cambia el color de la interfaz",
            "Porque puede activar un movimiento no solicitado",
            "Porque mejora el torque",
            "Porque reduce el ruido"
          ],
          "answer": 1,
          "explanation": "Una predicción errónea puede transformarse en una acción física, por lo que se requieren límites."
        }
      ],
      "takeaways": [
        "El modelo aprende de ejemplos, no de intenciones abstractas.",
        "Una red neuronal depende de datos y evaluación adecuados.",
        "Canny detecta bordes, no identidades completas.",
        "La predicción debe integrarse con reglas de seguridad."
      ]
    },
    {
      "id": "motorizacion",
      "order": 6,
      "title": "Programación enfocada a la motorización",
      "shortTitle": "Motorización",
      "kicker": "Traducir intención en movimiento controlado",
      "icon": "code",
      "duration": 20,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q2"
      ],
      "summary": "La programación coordina sensores, estados y actuadores. Define posiciones, velocidades, secuencias y respuestas seguras ante errores o pérdida de señal.",
      "whyItMatters": "Encender un motor no equivale a controlar una articulación. El sistema debe conocer límites, medir resultados y decidir qué hacer cuando el movimiento no ocurre como se esperaba.",
      "learningGoals": [
        "Distinguir control en lazo abierto y cerrado.",
        "Comprender cómo se gobierna un servomotor.",
        "Relacionar sensores con realimentación.",
        "Reconocer la importancia de estados seguros."
      ],
      "sections": [
        {
          "title": "Del comando al actuador",
          "paragraphs": [
            "Una orden como «cerrar la mano» debe convertirse en posiciones, velocidades y límites concretos para cada actuador. Además, debe coordinarse con el estado actual y con información de sensores.",
            "Un controlador puede recibir una señal EMG, validar que sea estable, seleccionar una secuencia y enviar referencias a los servos. Durante el movimiento vigila tiempo, posición, corriente o contacto."
          ],
          "visual": "command-chain",
          "bullets": [
            "Lectura y validación de entradas.",
            "Selección de estado o movimiento.",
            "Generación de referencias para actuadores.",
            "Monitoreo de límites y fallos.",
            "Confirmación o retorno a estado seguro."
          ]
        },
        {
          "title": "Lazo abierto y lazo cerrado",
          "paragraphs": [
            "En lazo abierto se envía una acción sin comprobar directamente su resultado. En lazo cerrado se mide la salida, se calcula el error respecto al objetivo y se corrige.",
            "Los servomotores incorporan una realimentación interna de posición. Sin embargo, un robot puede necesitar sensores externos para fuerza, contacto, orientación o corriente."
          ],
          "visual": "control-loop",
          "comparison": {
            "left": {
              "title": "Lazo abierto",
              "items": [
                "Orden sin medición de resultado",
                "Implementación simple",
                "Sensible a carga y variaciones",
                "Menor capacidad de corregir"
              ]
            },
            "right": {
              "title": "Lazo cerrado",
              "items": [
                "Mide la salida real",
                "Calcula y reduce error",
                "Compensa perturbaciones",
                "Requiere sensores y control"
              ]
            }
          }
        },
        {
          "title": "Secuencias, sincronización y estados",
          "paragraphs": [
            "Los movimientos complejos se organizan en estados: reposo, preparación, acción, confirmación y retorno. Cada estado admite ciertas entradas y tiene una salida segura.",
            "En un rostro animatrónico, mirada, parpadeo y mandíbula deben sincronizarse. En una mano, los dedos pueden cerrar hasta detectar contacto y después mantener una fuerza limitada."
          ],
          "bullets": [
            "Máquinas de estados para ordenar el comportamiento.",
            "Interpolación para evitar saltos de posición.",
            "Temporización y sincronización de articulaciones.",
            "Prioridad para comandos de parada."
          ]
        },
        {
          "title": "Seguridad y manejo de fallos",
          "paragraphs": [
            "La programación debe considerar pérdida de señal, sensores fuera de rango, atasco mecánico, sobrecorriente, sobretemperatura o posición imposible.",
            "Una conducta segura puede detener el motor, liberar el agarre, volver lentamente a neutral o solicitar intervención humana. La decisión depende del riesgo del sistema."
          ],
          "callout": {
            "title": "Principio práctico",
            "text": "Cuando la información es ambigua, el robot no debería improvisar una acción física de alto riesgo."
          }
        }
      ],
      "concepts": [
        {
          "term": "Control en lazo abierto",
          "definition": "Control que aplica una orden sin medir directamente el resultado.",
          "example": "Encender un motor por medio segundo y asumir el recorrido."
        },
        {
          "term": "Control en lazo cerrado",
          "definition": "Control que compara la salida medida con el objetivo y corrige el error.",
          "example": "Ajustar el servo hasta alcanzar el ángulo solicitado."
        },
        {
          "term": "Realimentación",
          "definition": "Información de la salida que vuelve al controlador para evaluar el resultado.",
          "example": "Un sensor de posición informa el ángulo actual."
        },
        {
          "term": "Máquina de estados",
          "definition": "Modelo que organiza el comportamiento en estados y transiciones definidas.",
          "example": "Reposo → cierre → agarre → liberación."
        },
        {
          "term": "Estado seguro",
          "definition": "Configuración destinada a reducir el riesgo ante un error o incertidumbre.",
          "example": "Detener motores y liberar presión al perder la señal."
        }
      ],
      "process": [
        "Leer entradas y validar calidad.",
        "Determinar el estado del sistema.",
        "Calcular referencias de posición o velocidad.",
        "Enviar comandos a actuadores.",
        "Supervisar resultado y aplicar seguridad."
      ],
      "appliedExample": {
        "title": "Ejemplo: agarre con límite",
        "text": "El usuario activa el cierre. Los dedos avanzan lentamente hasta que un sensor detecta contacto. El controlador limita la fuerza y mantiene el agarre. Si la corriente supera el máximo, libera parcialmente."
      },
      "quiz": [
        {
          "id": "m6q1",
          "prompt": "¿Qué diferencia principal tiene el lazo cerrado?",
          "options": [
            "No utiliza ninguna salida",
            "Mide el resultado y corrige el error",
            "Siempre es más barato",
            "Solo funciona con impresión 3D"
          ],
          "answer": 1,
          "explanation": "La realimentación permite comparar la salida real con la referencia."
        },
        {
          "id": "m6q2",
          "prompt": "¿Para qué sirve una máquina de estados?",
          "options": [
            "Organizar secuencias y transiciones de comportamiento",
            "Fundir filamento",
            "Detectar bordes",
            "Calcular densidad de resina"
          ],
          "answer": 0,
          "explanation": "Los estados estructuran qué acciones y transiciones son válidas en cada momento."
        },
        {
          "id": "m6q3",
          "prompt": "Ante una señal ambigua, una estrategia segura es…",
          "options": [
            "Ejecutar el movimiento máximo",
            "Mantener o volver a un estado seguro",
            "Aumentar automáticamente la fuerza",
            "Ignorar los límites"
          ],
          "answer": 1,
          "explanation": "La incertidumbre no debería traducirse en una acción física riesgosa."
        }
      ],
      "takeaways": [
        "La programación traduce intención en referencias concretas.",
        "La realimentación permite corregir errores.",
        "Los estados ordenan secuencias y excepciones.",
        "La seguridad es parte de la lógica de control."
      ]
    },
    {
      "id": "simulacion",
      "order": 7,
      "title": "Herramientas de simulación",
      "shortTitle": "Simulación",
      "kicker": "Probar antes de fabricar",
      "icon": "cube",
      "duration": 22,
      "difficulty": "Intermedio",
      "confidence": "directo",
      "exam": [
        "q1",
        "q2"
      ],
      "summary": "La simulación permite analizar movimiento, fuerzas, colisiones, estructuras y experiencia de uso en un entorno virtual antes de asumir el costo de un prototipo físico.",
      "whyItMatters": "Modificar una trayectoria o una pieza virtual es más rápido y barato que descubrir después que el motor no puede moverla, que dos componentes chocan o que el androide resulta intimidante.",
      "learningGoals": [
        "Distinguir simulación cinemática, dinámica y estructural.",
        "Comprender las fases generales del ciclo de marcha.",
        "Relacionar realidad virtual con evaluación de experiencia.",
        "Reconocer que una simulación depende de sus supuestos."
      ],
      "sections": [
        {
          "title": "Qué puede simularse",
          "paragraphs": [
            "La simulación cinemática verifica recorridos, alcance, límites y colisiones. La dinámica incorpora masas, gravedad, fuerzas y torque. El análisis estructural estima tensiones y deformaciones en piezas.",
            "Cada modelo responde preguntas diferentes. Una articulación puede alcanzar una posición en cinemática y aun así requerir más torque del disponible cuando se incorpora el peso real."
          ],
          "comparison": {
            "left": {
              "title": "Movimiento",
              "items": [
                "Alcance y trayectorias",
                "Colisiones y límites",
                "Velocidades y aceleraciones",
                "Coordinación de articulaciones"
              ]
            },
            "right": {
              "title": "Física y estructura",
              "items": [
                "Gravedad y torque",
                "Fuerzas de contacto",
                "Tensión y deformación",
                "Zonas débiles"
              ]
            }
          }
        },
        {
          "title": "Simulación del ciclo de marcha",
          "paragraphs": [
            "El ciclo de marcha se mide desde un contacto de un pie hasta el siguiente contacto del mismo pie. Se divide de forma general en fase de apoyo y fase de balanceo.",
            "En un androide bípedo deben coordinarse cadera, rodilla y tobillo mientras el centro de masa se mantiene dentro de una región estable. No basta con adelantar una pierna y después la otra."
          ],
          "visual": "gait-cycle",
          "bullets": [
            "Apoyo: el pie sostiene o transfiere peso.",
            "Balanceo: el pie se eleva y avanza.",
            "Transferencia: el centro de masa cambia de lado.",
            "Contacto: el pie debe llegar con orientación y velocidad controladas."
          ]
        },
        {
          "title": "Realidad virtual y experiencia de usuario",
          "paragraphs": [
            "La realidad virtual permite experimentar escala, distancia, velocidad y comportamiento antes de construir el androide completo. Puede utilizarse para entrenamiento, pruebas de control o evaluación de interacción.",
            "Desde UX interesa saber si la persona comprende qué hará el robot, si el feedback es suficiente, si los movimientos generan confianza y si los controles son accesibles. Un sistema puede ser correcto mecánicamente y fallar en experiencia."
          ],
          "bullets": [
            "Probar distancia interpersonal.",
            "Comparar velocidades de movimiento.",
            "Evaluar señales de intención y feedback.",
            "Ensayar situaciones de riesgo sin exponer personas.",
            "Validar interfaces de control."
          ],
          "callout": {
            "title": "Conexión con UX/UI",
            "text": "La interacción humano-robot también necesita affordances, feedback, prevención de errores y modelos mentales comprensibles."
          }
        },
        {
          "title": "Una simulación no es la realidad",
          "paragraphs": [
            "Los resultados dependen de masas, materiales, fricción, rigidez y condiciones de contacto correctamente modeladas. Si esos valores son incorrectos, la simulación puede parecer precisa y aun así predecir mal.",
            "Por eso se compara el modelo con pruebas físicas, se ajustan parámetros y se repite. Simular reduce riesgo, pero no elimina la validación del prototipo."
          ]
        }
      ],
      "concepts": [
        {
          "term": "Simulación cinemática",
          "definition": "Evaluación virtual de posiciones y movimientos sin centrarse primero en fuerzas.",
          "example": "Comprobar si el pulgar alcanza los demás dedos."
        },
        {
          "term": "Simulación dinámica",
          "definition": "Evaluación del movimiento incorporando masa, gravedad, fuerzas e inercia.",
          "example": "Ver si el motor sostiene el brazo extendido."
        },
        {
          "term": "Análisis estructural",
          "definition": "Estimación de esfuerzos y deformaciones de una pieza ante cargas.",
          "example": "Detectar una zona débil en el soporte del hombro."
        },
        {
          "term": "Ciclo de marcha",
          "definition": "Secuencia completa entre dos contactos consecutivos del mismo pie.",
          "example": "Apoyo seguido de balanceo de la pierna."
        },
        {
          "term": "Centro de masa",
          "definition": "Punto equivalente donde puede considerarse concentrada la masa del sistema para analizar equilibrio.",
          "example": "Desplazar el torso antes de levantar un pie."
        }
      ],
      "process": [
        "Construir el modelo virtual.",
        "Definir articulaciones, materiales y cargas.",
        "Ejecutar escenarios de movimiento o interacción.",
        "Analizar colisiones, esfuerzos y percepción.",
        "Comparar con prototipo y ajustar parámetros."
      ],
      "appliedExample": {
        "title": "Ejemplo: validar un saludo",
        "text": "En VR se prueba la distancia, amplitud y velocidad con la que el androide eleva el brazo. La simulación mecánica verifica que no choque con el torso y la evaluación UX determina si el gesto se percibe amistoso o invasivo."
      },
      "quiz": [
        {
          "id": "m7q1",
          "prompt": "¿Qué agrega una simulación dinámica respecto a una cinemática?",
          "options": [
            "Colores de interfaz",
            "Masas, fuerzas, gravedad e inercia",
            "Solo archivos de audio",
            "Etiquetas de entrenamiento"
          ],
          "answer": 1,
          "explanation": "La dinámica analiza el efecto físico de cargas y fuerzas sobre el movimiento."
        },
        {
          "id": "m7q2",
          "prompt": "¿Cuáles son las dos fases generales de la marcha?",
          "options": [
            "Extrusión y curado",
            "Apoyo y balanceo",
            "Entrenamiento e inferencia",
            "Captura y filtrado"
          ],
          "answer": 1,
          "explanation": "El pie alterna un período de contacto con el suelo y otro de avance."
        },
        {
          "id": "m7q3",
          "prompt": "¿Por qué la realidad virtual es útil para UX en androides?",
          "options": [
            "Porque sustituye para siempre las pruebas físicas",
            "Porque permite evaluar interacción, escala y seguridad percibida",
            "Porque fabrica engranajes",
            "Porque mide EMG"
          ],
          "answer": 1,
          "explanation": "VR permite experimentar el comportamiento antes de disponer del sistema completo."
        }
      ],
      "takeaways": [
        "Cada tipo de simulación responde preguntas distintas.",
        "La marcha implica equilibrio y transferencia de peso.",
        "VR permite evaluar interacción y percepción tempranamente.",
        "Los modelos deben contrastarse con pruebas físicas."
      ]
    },
    {
      "id": "optimizacion",
      "order": 8,
      "title": "Optimización estructural y funcional",
      "shortTitle": "Optimización",
      "kicker": "Mejorar con objetivos y restricciones",
      "icon": "optimize",
      "duration": 17,
      "difficulty": "Intermedio",
      "confidence": "probable",
      "exam": [
        "q2"
      ],
      "summary": "Optimizar consiste en mejorar una solución según una métrica: reducir peso, material o consumo; aumentar resistencia, precisión o autonomía; y respetar restricciones físicas y económicas.",
      "whyItMatters": "No existe un diseño mejor en términos absolutos. Cada mejora suele producir un costo en otra variable, por lo que el objetivo debe ser explícito y medible.",
      "learningGoals": [
        "Diferenciar objetivo, restricción y variable de diseño.",
        "Reconocer compromisos entre peso, fuerza, velocidad y costo.",
        "Explicar qué es una estructura lattice.",
        "Relacionar elementos óseos con biomimética estructural."
      ],
      "sections": [
        {
          "title": "Qué significa optimizar",
          "paragraphs": [
            "Optimizar no significa agregar tecnología ni hacer que el diseño se vea más complejo. Significa buscar la mejor solución posible de acuerdo con un objetivo y dentro de restricciones.",
            "Por ejemplo, se puede minimizar el peso de un antebrazo siempre que resista la carga, mantenga sus zonas de unión y pueda fabricarse con el proceso disponible."
          ],
          "bullets": [
            "Objetivo: lo que se quiere mejorar.",
            "Restricciones: límites que no pueden violarse.",
            "Variables: dimensiones, material, geometría o parámetros que pueden cambiar.",
            "Criterio de validación: cómo se demuestra la mejora."
          ]
        },
        {
          "title": "Compromisos de diseño",
          "paragraphs": [
            "Aumentar el motor puede mejorar torque, pero agrega peso y consumo. Reducir material aligera una pieza, pero puede aumentar deformación. Elevar velocidad puede reducir precisión o seguridad.",
            "La optimización obliga a comparar alternativas con métricas y no solamente con preferencias."
          ],
          "comparison": {
            "left": {
              "title": "Posible mejora",
              "items": [
                "Menor peso",
                "Más torque",
                "Mayor velocidad",
                "Más autonomía"
              ]
            },
            "right": {
              "title": "Costo asociado",
              "items": [
                "Menor rigidez posible",
                "Motor más pesado",
                "Menor control o seguridad",
                "Batería más grande"
              ]
            }
          }
        },
        {
          "title": "Estructuras lattice",
          "paragraphs": [
            "Una estructura lattice es una red interna formada por celdas repetidas o diseñadas localmente. Sustituye una masa sólida por una arquitectura que distribuye material donde resulta útil.",
            "Puede reducir peso, ajustar rigidez, absorber energía o mejorar ventilación. Su desempeño depende de la geometría, orientación, densidad, material y proceso de impresión."
          ],
          "visual": "lattice",
          "callout": {
            "title": "No todo lattice es biomimético",
            "text": "Una retícula puede ser puramente geométrica. Se considera biomimética cuando adapta un principio funcional observado en un sistema biológico."
          }
        },
        {
          "title": "Elementos óseos y biomimética",
          "paragraphs": [
            "Los huesos combinan capas externas más compactas con regiones internas porosas y orientadas según cargas. Esa lógica inspira estructuras robóticas ligeras y resistentes.",
            "La inspiración no implica reproducir tejido vivo. Se estudia cómo el sistema distribuye material y se adapta el principio a polímeros, metales o composiciones imprimibles."
          ]
        },
        {
          "title": "Validar la mejora",
          "paragraphs": [
            "Una geometría optimizada debe volver a simularse y fabricarse. Las piezas lattice pueden comportarse de manera distinta según la orientación de capas, las tolerancias y los defectos de impresión.",
            "El resultado se mide con pruebas de carga, deformación, peso, consumo o precisión, según el objetivo definido."
          ]
        }
      ],
      "concepts": [
        {
          "term": "Optimización",
          "definition": "Búsqueda de una solución que mejora un objetivo respetando restricciones.",
          "example": "Reducir peso sin exceder la deformación permitida."
        },
        {
          "term": "Restricción",
          "definition": "Condición que una solución no puede violar.",
          "example": "El soporte debe resistir 200 N y encajar en el volumen disponible."
        },
        {
          "term": "Lattice",
          "definition": "Arquitectura reticular interna formada por celdas que distribuyen material y propiedades.",
          "example": "Relleno estructural ligero dentro de un antebrazo impreso."
        },
        {
          "term": "Rigidez",
          "definition": "Resistencia de una estructura a deformarse bajo carga.",
          "example": "Un brazo ligero debe mantener suficiente rigidez para posicionar la mano."
        },
        {
          "term": "Compromiso de diseño",
          "definition": "Intercambio en el que mejorar una variable afecta otra.",
          "example": "Más velocidad a costa de torque o precisión."
        }
      ],
      "process": [
        "Definir el objetivo medible.",
        "Establecer restricciones.",
        "Elegir variables que pueden cambiar.",
        "Simular y comparar alternativas.",
        "Fabricar y validar la solución seleccionada."
      ],
      "appliedExample": {
        "title": "Ejemplo: antebrazo más liviano",
        "text": "Se mantiene la forma exterior y los puntos de fijación. El interior se reemplaza por una estructura lattice. Se simula la carga, se imprime y se compara peso y deformación con la versión maciza."
      },
      "quiz": [
        {
          "id": "m8q1",
          "prompt": "¿Qué requiere una optimización bien planteada?",
          "options": [
            "Un objetivo medible y restricciones",
            "Solo una forma más compleja",
            "Eliminar toda validación",
            "Usar siempre una red neuronal"
          ],
          "answer": 0,
          "explanation": "Sin objetivo y límites no se puede determinar qué alternativa es mejor."
        },
        {
          "id": "m8q2",
          "prompt": "¿Qué es una estructura lattice?",
          "options": [
            "Una señal cerebral",
            "Una arquitectura reticular interna",
            "Un algoritmo de bordes",
            "Un tipo de electrodo"
          ],
          "answer": 1,
          "explanation": "Lattice distribuye material mediante celdas o elementos repetidos."
        },
        {
          "id": "m8q3",
          "prompt": "¿Por qué una pieza optimizada debe probarse físicamente?",
          "options": [
            "Porque la fabricación introduce orientación, tolerancias y defectos",
            "Porque la simulación siempre es inútil",
            "Porque no puede imprimirse",
            "Porque elimina las restricciones"
          ],
          "answer": 0,
          "explanation": "El comportamiento real depende del proceso y debe contrastarse con el modelo."
        }
      ],
      "takeaways": [
        "Optimizar exige un objetivo y restricciones explícitas.",
        "Toda mejora implica compromisos entre variables.",
        "Lattice permite controlar peso y rigidez mediante geometría interna.",
        "La mejora simulada debe validarse en piezas reales."
      ]
    },
    {
      "id": "manufactura",
      "order": 9,
      "title": "Manufactura aditiva y prototipaje",
      "shortTitle": "Manufactura",
      "kicker": "Fabricar, probar y volver a iterar",
      "icon": "printer",
      "duration": 24,
      "difficulty": "Inicial",
      "confidence": "directo",
      "exam": [
        "q2",
        "q4"
      ],
      "summary": "La manufactura aditiva convierte un modelo digital en una pieza agregando material, generalmente por capas. Para prototipos plásticos, FDM/FFF es la opción más probable del examen.",
      "whyItMatters": "Los androides requieren muchas piezas personalizadas. Imprimirlas permite comprobar medidas, movimiento y ensamble sin fabricar moldes costosos para cada versión.",
      "learningGoals": [
        "Explicar qué distingue la manufactura aditiva.",
        "Describir el proceso FDM/FFF con termoplásticos.",
        "Diferenciar FDM, SLA y SLS.",
        "Reconocer tolerancias y orientación como decisiones de diseño."
      ],
      "sections": [
        {
          "title": "Manufactura aditiva",
          "paragraphs": [
            "La manufactura aditiva construye una geometría a partir de un modelo digital mediante la incorporación sucesiva de material. En muchas tecnologías, la pieza se forma capa por capa.",
            "A diferencia de un proceso sustractivo, no se parte necesariamente de un bloque para retirar material. Esta libertad facilita geometrías internas, canales y piezas personalizadas."
          ],
          "visual": "additive",
          "bullets": [
            "Modelo 3D digital.",
            "Preparación y división en capas.",
            "Fabricación automática.",
            "Retiro de soportes o polvo.",
            "Postproceso y verificación."
          ]
        },
        {
          "title": "FDM o FFF: filamento termoplástico",
          "paragraphs": [
            "Un filamento plástico entra en un cabezal caliente, se funde y se deposita mediante una boquilla siguiendo el recorrido de cada capa. Las capas se unen hasta formar la pieza.",
            "Es frecuente en prototipaje por su costo relativamente bajo, disponibilidad y rapidez para iterar. Puede fabricar falanges, carcasas, soportes, engranajes de prueba y piezas estructurales."
          ],
          "callout": {
            "title": "Pista del examen",
            "text": "La respuesta general es manufactura aditiva. La técnica que mejor encaja con «usa plásticos» es FDM/FFF mediante filamento termoplástico."
          },
          "bullets": [
            "PLA: fácil de imprimir y útil para prototipos.",
            "PETG: mayor tenacidad y resistencia práctica.",
            "ABS: resistente, pero exige más control térmico.",
            "TPU: flexible para recubrimientos o piezas deformables."
          ]
        },
        {
          "title": "SLA: fotopolimerización en resina",
          "paragraphs": [
            "SLA solidifica selectivamente una resina líquida fotosensible mediante luz. Produce detalles finos y superficies lisas, por lo que resulta útil en piezas pequeñas o visuales.",
            "Las piezas suelen requerir lavado, retiro de soportes y curado posterior. La resina líquida debe manipularse con protección y siguiendo las indicaciones del fabricante."
          ]
        },
        {
          "title": "SLS: fusión de lecho de polvo",
          "paragraphs": [
            "SLS utiliza un lecho de material en polvo, frecuentemente polímeros como nylon. Un láser fusiona las zonas de cada capa y el polvo no fusionado sostiene las geometrías durante el proceso.",
            "Permite piezas complejas y funcionales, aunque requiere equipos y manejo de polvo más especializados que una impresora FDM de escritorio."
          ]
        },
        {
          "title": "Diseñar para imprimir",
          "paragraphs": [
            "Una pieza imprimible no se diseña igual que una pieza mecanizada o moldeada. La orientación modifica resistencia, acabado y necesidad de soportes. Las tolerancias determinan si dos componentes encajan o se bloquean.",
            "El prototipaje es iterativo: imprimir, ensamblar, medir, corregir el modelo y fabricar una nueva versión. El archivo digital facilita cambios rápidos, pero no elimina la prueba física."
          ],
          "comparison": {
            "left": {
              "title": "Decisiones de diseño",
              "items": [
                "Orientación de capas",
                "Espesor de pared",
                "Relleno o lattice",
                "Tolerancias y encastres"
              ]
            },
            "right": {
              "title": "Efectos",
              "items": [
                "Resistencia anisotrópica",
                "Tiempo y material",
                "Peso y rigidez",
                "Calidad del ensamble"
              ]
            }
          }
        }
      ],
      "concepts": [
        {
          "term": "Manufactura aditiva",
          "definition": "Fabricación por incorporación sucesiva de material desde un modelo digital.",
          "example": "Imprimir una falange capa por capa."
        },
        {
          "term": "FDM/FFF",
          "definition": "Extrusión de filamento termoplástico fundido a través de una boquilla.",
          "example": "Fabricar un soporte para servomotor en PLA o PETG."
        },
        {
          "term": "SLA",
          "definition": "Fotopolimerización de resina líquida mediante luz.",
          "example": "Imprimir un ojo animatrónico con alto detalle."
        },
        {
          "term": "SLS",
          "definition": "Fusión selectiva de material en polvo mediante energía láser.",
          "example": "Producir una articulación compleja en nylon."
        },
        {
          "term": "Tolerancia",
          "definition": "Margen dimensional que permite que piezas reales encajen y funcionen.",
          "example": "Dejar separación entre un eje y su alojamiento."
        },
        {
          "term": "Anisotropía",
          "definition": "Propiedad de un material o pieza que cambia según la dirección.",
          "example": "Una pieza FDM puede resistir menos entre capas que a lo largo de ellas."
        }
      ],
      "process": [
        "Diseñar el modelo 3D.",
        "Elegir proceso, material y orientación.",
        "Preparar capas y soportes.",
        "Fabricar y postprocesar.",
        "Ensamblar, medir y corregir la siguiente versión."
      ],
      "appliedExample": {
        "title": "Ejemplo: soporte de servo",
        "text": "Se diseña un soporte en CAD, se imprime en FDM y se prueba el encastre. Si el servo entra demasiado ajustado o la pared flexiona, se modifican tolerancias y espesores antes de imprimir otra versión."
      },
      "quiz": [
        {
          "id": "m9q1",
          "prompt": "¿Qué caracteriza a la manufactura aditiva?",
          "options": [
            "Retira material exclusivamente",
            "Agrega material para formar la pieza",
            "Solo utiliza metal",
            "No parte de un modelo digital"
          ],
          "answer": 1,
          "explanation": "La pieza se forma por incorporación sucesiva de material, frecuentemente capa por capa."
        },
        {
          "id": "m9q2",
          "prompt": "¿Qué material de alimentación utiliza FDM/FFF normalmente?",
          "options": [
            "Filamento termoplástico",
            "Señal EMG",
            "Resina líquida únicamente",
            "Polvo metálico exclusivamente"
          ],
          "answer": 0,
          "explanation": "FDM/FFF funde y deposita un filamento plástico a través de una boquilla."
        },
        {
          "id": "m9q3",
          "prompt": "¿Qué proceso trabaja con resina líquida fotosensible?",
          "options": [
            "SLA",
            "EOG",
            "Canny",
            "Denavit-Hartenberg"
          ],
          "answer": 0,
          "explanation": "SLA utiliza luz para solidificar selectivamente una resina."
        }
      ],
      "takeaways": [
        "Manufactura aditiva agrega material desde un modelo digital.",
        "FDM/FFF es la opción plástica más probable del examen.",
        "SLA usa resina y SLS usa un lecho de polvo.",
        "Orientación y tolerancias condicionan el resultado real."
      ]
    }
  ],
  "glossary": [
    {
      "term": "Actuador",
      "definition": "Componente que convierte energía en movimiento o fuerza.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Algoritmo de Canny",
      "definition": "Método de visión artificial para detectar bordes a partir de cambios de intensidad.",
      "module": "aprendizaje-automatico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Amplificación",
      "definition": "Aumento controlado de la amplitud de una señal pequeña para poder procesarla.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "Androide",
      "definition": "Robot que reproduce total o parcialmente forma, movimiento o interacción humana.",
      "module": "seleccion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Anisotropía",
      "definition": "Variación de propiedades según la dirección; relevante en piezas impresas por capas.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "Animatrónico",
      "definition": "Dispositivo mecanizado que imita movimientos o apariencia de un ser vivo.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Artefacto de señal",
      "definition": "Alteración no deseada causada por movimiento, mala conexión o interferencia.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "Bézier",
      "definition": "Curva paramétrica controlada por puntos, útil para trayectorias suaves.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Biomimética",
      "definition": "Adaptación de principios funcionales observados en la naturaleza al diseño.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Centro de masa",
      "definition": "Punto equivalente para analizar distribución de masa y equilibrio.",
      "module": "simulacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Cinemática",
      "definition": "Estudio de posiciones y movimiento sin centrarse primero en las fuerzas.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Cinemática directa",
      "definition": "Cálculo de la pose final a partir de valores articulares conocidos.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Cinemática inversa",
      "definition": "Cálculo de valores articulares necesarios para alcanzar una pose deseada.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Ciclo de marcha",
      "definition": "Secuencia entre dos contactos consecutivos del mismo pie, con apoyo y balanceo.",
      "module": "simulacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Control en lazo abierto",
      "definition": "Aplica una orden sin medir directamente el resultado.",
      "module": "motorizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Control en lazo cerrado",
      "definition": "Mide la salida, calcula el error y corrige la acción.",
      "module": "motorizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Denavit-Hartenberg",
      "definition": "Convención para describir matemáticamente eslabones y articulaciones consecutivas.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Dinámica",
      "definition": "Estudio del movimiento considerando fuerzas, masas, gravedad e inercia.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "EEG",
      "definition": "Electroencefalografía: registro de actividad eléctrica cerebral.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "Electrodo",
      "definition": "Elemento conductor utilizado para captar diferencias de potencial del cuerpo.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "EMG",
      "definition": "Electromiografía: registro de actividad eléctrica vinculada con la activación muscular.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "Engranaje",
      "definition": "Elemento dentado que transmite giro y adapta velocidad o torque.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "EOG",
      "definition": "Electrooculografía: registro de variaciones eléctricas relacionadas con movimiento ocular.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "Estado del arte",
      "definition": "Revisión de las soluciones y conocimientos relevantes ya existentes.",
      "module": "seleccion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Estado seguro",
      "definition": "Configuración destinada a reducir riesgo cuando ocurre un error o incertidumbre.",
      "module": "motorizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "FDM/FFF",
      "definition": "Proceso de impresión que funde y deposita filamento termoplástico por capas.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "Filtrado",
      "definition": "Procesamiento destinado a reducir componentes no deseados de una señal.",
      "module": "biosensores",
      "exam": [
        "q3"
      ]
    },
    {
      "term": "Grado de libertad",
      "definition": "Movimiento independiente que puede adoptar una articulación o mecanismo.",
      "module": "seleccion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Inferencia",
      "definition": "Uso de un modelo entrenado para predecir sobre datos nuevos.",
      "module": "aprendizaje-automatico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Lattice",
      "definition": "Arquitectura reticular interna que distribuye material y propiedades.",
      "module": "optimizacion",
      "exam": [
        "q2",
        "q4"
      ]
    },
    {
      "term": "LiDAR",
      "definition": "Tecnología que estima distancias mediante pulsos de luz para percibir el entorno.",
      "module": "simulacion",
      "exam": []
    },
    {
      "term": "Manufactura aditiva",
      "definition": "Fabricación mediante incorporación sucesiva de material desde un modelo digital.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "Máquina de estados",
      "definition": "Modelo que organiza el comportamiento en estados y transiciones definidas.",
      "module": "motorizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Mecanismo de cuatro barras",
      "definition": "Cadena cerrada de cuatro elementos articulados que transforma movimiento.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Mecanismo de retorno rápido",
      "definition": "Mecanismo con carreras opuestas de distinta duración.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Optimización",
      "definition": "Búsqueda de una mejor solución según un objetivo y restricciones.",
      "module": "optimizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Prototipo",
      "definition": "Versión de prueba utilizada para aprender, validar y corregir antes de la solución final.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "Realimentación",
      "definition": "Información sobre la salida real que vuelve al controlador.",
      "module": "motorizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Red neuronal",
      "definition": "Modelo de capas conectadas cuyos parámetros se ajustan durante el entrenamiento.",
      "module": "aprendizaje-automatico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Rigidez",
      "definition": "Resistencia de una estructura a deformarse bajo carga.",
      "module": "optimizacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "SLA",
      "definition": "Proceso que solidifica selectivamente una resina líquida fotosensible.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "SLS",
      "definition": "Proceso que fusiona selectivamente material en polvo mediante energía láser.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "Servomotor",
      "definition": "Actuador con control de posición mediante realimentación interna.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Simulación dinámica",
      "definition": "Modelo virtual que incorpora masas, fuerzas, gravedad e inercia.",
      "module": "simulacion",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Subactuación",
      "definition": "Uso de menos actuadores que grados de libertad, coordinados por la mecánica.",
      "module": "diseno-robotico",
      "exam": [
        "q2"
      ]
    },
    {
      "term": "Tolerancia",
      "definition": "Margen dimensional necesario para que las piezas reales encajen y funcionen.",
      "module": "manufactura",
      "exam": [
        "q4"
      ]
    },
    {
      "term": "Torque",
      "definition": "Efecto rotacional de una fuerza alrededor de un eje.",
      "module": "modelos-matematicos",
      "exam": [
        "q2"
      ]
    }
  ],
  "studyPaths": [
    {
      "id": "exam-fast",
      "title": "Ruta rápida para el examen",
      "description": "Prioriza los temas con relación directa a las consignas.",
      "modules": [
        "diseno-robotico",
        "biosensores",
        "manufactura",
        "seleccion",
        "modelos-matematicos"
      ],
      "estimatedMinutes": 105
    },
    {
      "id": "complete",
      "title": "Ruta completa del androide",
      "description": "Recorre el proceso desde la definición hasta la fabricación.",
      "modules": [
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
      "estimatedMinutes": 185
    },
    {
      "id": "signals",
      "title": "Ruta de señales y control",
      "description": "Enfocada en biosensores, clasificación y motorización.",
      "modules": [
        "biosensores",
        "aprendizaje-automatico",
        "motorizacion"
      ],
      "estimatedMinutes": 64
    }
  ]
};
