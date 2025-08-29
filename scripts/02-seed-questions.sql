-- Insert RIASEC test questions (10 questions per type, 60 total)
-- Added Romanian translations (question_text_ro column)
INSERT INTO questions (question_text_en, question_text_es, question_text_ro, riasec_type) VALUES
-- Realistic (R) questions
('I enjoy working with tools and machinery', 'Disfruto trabajar con herramientas y maquinaria', 'Îmi place să lucrez cu unelte și mașinării', 'R'),
('I like to build things with my hands', 'Me gusta construir cosas con mis manos', 'Îmi place să construiesc lucruri cu mâinile mele', 'R'),
('I prefer practical, hands-on activities', 'Prefiero actividades prácticas y manuales', 'Prefer activități practice, hands-on', 'R'),
('I enjoy outdoor work and physical activities', 'Disfruto el trabajo al aire libre y las actividades físicas', 'Îmi place munca în aer liber și activitățile fizice', 'R'),
('I like to repair and fix things', 'Me gusta reparar y arreglar cosas', 'Îmi place să repar și să aranjez lucruri', 'R'),
('I enjoy working with plants and animals', 'Disfruto trabajar con plantas y animales', 'Îmi place să lucrez cu plante și animale', 'R'),
('I prefer concrete tasks over abstract ideas', 'Prefiero tareas concretas sobre ideas abstractas', 'Prefer sarcini concrete în locul ideilor abstracte', 'R'),
('I like operating equipment and vehicles', 'Me gusta operar equipos y vehículos', 'Îmi place să operez echipamente și vehicule', 'R'),
('I enjoy athletic and physical challenges', 'Disfruto los desafíos atléticos y físicos', 'Îmi plac provocările atletice și fizice', 'R'),
('I prefer working independently on projects', 'Prefiero trabajar independientemente en proyectos', 'Prefer să lucrez independent la proiecte', 'R'),

-- Investigative (I) questions
('I enjoy solving complex problems', 'Disfruto resolver problemas complejos', 'Îmi place să rezolv probleme complexe', 'I'),
('I like to analyze data and information', 'Me gusta analizar datos e información', 'Îmi place să analizez date și informații', 'I'),
('I enjoy conducting research and experiments', 'Disfruto realizar investigaciones y experimentos', 'Îmi place să fac cercetări și experimente', 'I'),
('I like to understand how things work', 'Me gusta entender cómo funcionan las cosas', 'Îmi place să înțeleg cum funcționează lucrurile', 'I'),
('I enjoy working with numbers and statistics', 'Disfruto trabajar con números y estadísticas', 'Îmi place să lucrez cu numere și statistici', 'I'),
('I like to explore new ideas and theories', 'Me gusta explorar nuevas ideas y teorías', 'Îmi place să explorez idei și teorii noi', 'I'),
('I enjoy reading scientific journals', 'Disfruto leer revistas científicas', 'Îmi place să citesc reviste științifice', 'I'),
('I like to ask questions and seek answers', 'Me gusta hacer preguntas y buscar respuestas', 'Îmi place să pun întrebări și să caut răspunsuri', 'I'),
('I enjoy working in laboratories', 'Disfruto trabajar en laboratorios', 'Îmi place să lucrez în laboratoare', 'I'),
('I prefer logical and systematic approaches', 'Prefiero enfoques lógicos y sistemáticos', 'Prefer abordări logice și sistematice', 'I'),

-- Artistic (A) questions
('I enjoy creative and artistic activities', 'Disfruto las actividades creativas y artísticas', 'Îmi plac activitățile creative și artistice', 'A'),
('I like to express myself through art', 'Me gusta expresarme a través del arte', 'Îmi place să mă exprim prin artă', 'A'),
('I enjoy writing stories or poetry', 'Disfruto escribir historias o poesía', 'Îmi place să scriu povești sau poezii', 'A'),
('I like to design and create visual content', 'Me gusta diseñar y crear contenido visual', 'Îmi place să proiectez și să creez conținut vizual', 'A'),
('I enjoy music and performing arts', 'Disfruto la música y las artes escénicas', 'Îmi plac muzica și artele spectacolului', 'A'),
('I like to work in unstructured environments', 'Me gusta trabajar en ambientes no estructurados', 'Îmi place să lucrez în medii nestructurate', 'A'),
('I enjoy brainstorming and generating ideas', 'Disfruto hacer lluvia de ideas y generar ideas', 'Îmi place brainstorming-ul și generarea de idei', 'A'),
('I like to decorate and arrange spaces', 'Me gusta decorar y organizar espacios', 'Îmi place să decorez și să aranjez spații', 'A'),
('I enjoy photography and visual arts', 'Disfruto la fotografía y las artes visuales', 'Îmi plac fotografia și artele vizuale', 'A'),
('I prefer flexible and creative work', 'Prefiero trabajo flexible y creativo', 'Prefer munca flexibilă și creativă', 'A'),

-- Social (S) questions
('I enjoy helping and teaching others', 'Disfruto ayudar y enseñar a otros', 'Îmi place să ajut și să învăț pe alții', 'S'),
('I like to work in teams and groups', 'Me gusta trabajar en equipos y grupos', 'Îmi place să lucrez în echipe și grupuri', 'S'),
('I enjoy counseling and advising people', 'Disfruto aconsejar y orientar a las personas', 'Îmi place să consiliez și să sfătuiesc oamenii', 'S'),
('I like to organize community events', 'Me gusta organizar eventos comunitarios', 'Îmi place să organizez evenimente comunitare', 'S'),
('I enjoy working with children or elderly', 'Disfruto trabajar con niños o ancianos', 'Îmi place să lucrez cu copii sau vârstnici', 'S'),
('I like to resolve conflicts between people', 'Me gusta resolver conflictos entre personas', 'Îmi place să rezolv conflictele dintre oameni', 'S'),
('I enjoy volunteering for causes I believe in', 'Disfruto hacer voluntariado por causas en las que creo', 'Îmi place să fac voluntariat pentru cauze în care cred', 'S'),
('I like to provide emotional support', 'Me gusta brindar apoyo emocional', 'Îmi place să ofer suport emotional', 'S'),
('I enjoy training and developing others', 'Disfruto entrenar y desarrollar a otros', 'Îmi place să antrenez și să dezvolt pe alții', 'S'),
('I prefer collaborative work environments', 'Prefiero ambientes de trabajo colaborativos', 'Prefer medii de lucru colaborative', 'S'),

-- Enterprising (E) questions
('I enjoy leading and managing others', 'Disfruto liderar y gestionar a otros', 'Îmi place să conduc și să gestionez pe alții', 'E'),
('I like to persuade and influence people', 'Me gusta persuadir e influir en las personas', 'Îmi place să persuadez și să influențez oamenii', 'E'),
('I enjoy starting new business ventures', 'Disfruto iniciar nuevos emprendimientos', 'Îmi place să încep noi afaceri', 'E'),
('I like to negotiate and make deals', 'Me gusta negociar y hacer tratos', 'Îmi place să negociez și să fac afaceri', 'E'),
('I enjoy public speaking and presentations', 'Disfruto hablar en público y hacer presentaciones', 'Îmi place să vorbesc în public și să fac prezentări', 'E'),
('I like to take risks for potential rewards', 'Me gusta tomar riesgos por recompensas potenciales', 'Îmi place să iau riscuri pentru recompense potențiale', 'E'),
('I enjoy competing and winning', 'Disfruto competir y ganar', 'Îmi place să concurez și să câștig', 'E'),
('I like to organize and coordinate projects', 'Me gusta organizar y coordinar proyectos', 'Îmi place să organizez și să coordonez proiecte', 'E'),
('I enjoy selling products or services', 'Disfruto vender productos o servicios', 'Îmi place să vând produse sau servicii', 'E'),
('I prefer fast-paced, dynamic environments', 'Prefiero ambientes dinámicos y de ritmo rápido', 'Prefer medii dinamice, cu ritm rapid', 'E'),

-- Conventional (C) questions
('I enjoy organizing and maintaining records', 'Disfruto organizar y mantener registros', 'Îmi place să organizez și să mențin înregistrări', 'C'),
('I like to follow established procedures', 'Me gusta seguir procedimientos establecidos', 'Îmi place să urmez proceduri stabilite', 'C'),
('I enjoy working with detailed information', 'Disfruto trabajar con información detallada', 'Îmi place să lucrez cu informații detaliate', 'C'),
('I like to create systems and processes', 'Me gusta crear sistemas y procesos', 'Îmi place să creez sisteme și procese', 'C'),
('I enjoy budgeting and financial planning', 'Disfruto la elaboración de presupuestos y planificación financiera', 'Îmi plac bugetarea și planificarea financiară', 'C'),
('I like to work in structured environments', 'Me gusta trabajar en ambientes estructurados', 'Îmi place să lucrez în medii structurate', 'C'),
('I enjoy data entry and record keeping', 'Disfruto la entrada de datos y el mantenimiento de registros', 'Îmi plac introducerea datelor și păstrarea înregistrărilor', 'C'),
('I like to ensure accuracy and quality', 'Me gusta asegurar la precisión y calidad', 'Îmi place să asigur acuratețea și calitatea', 'C'),
('I enjoy administrative and clerical tasks', 'Disfruto las tareas administrativas y de oficina', 'Îmi plac sarcinile administrative și de birou', 'C'),
('I prefer clear guidelines and expectations', 'Prefiero pautas y expectativas claras', 'Prefer ghiduri și așteptări clare', 'C');
