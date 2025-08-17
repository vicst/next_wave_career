-- Insert RIASEC test questions (10 questions per type, 60 total)
INSERT INTO questions (question_text_en, question_text_es, riasec_type) VALUES
-- Realistic (R) questions
('I enjoy working with tools and machinery', 'Disfruto trabajar con herramientas y maquinaria', 'R'),
('I like to build things with my hands', 'Me gusta construir cosas con mis manos', 'R'),
('I prefer practical, hands-on activities', 'Prefiero actividades prácticas y manuales', 'R'),
('I enjoy outdoor work and physical activities', 'Disfruto el trabajo al aire libre y las actividades físicas', 'R'),
('I like to repair and fix things', 'Me gusta reparar y arreglar cosas', 'R'),
('I enjoy working with plants and animals', 'Disfruto trabajar con plantas y animales', 'R'),
('I prefer concrete tasks over abstract ideas', 'Prefiero tareas concretas sobre ideas abstractas', 'R'),
('I like operating equipment and vehicles', 'Me gusta operar equipos y vehículos', 'R'),
('I enjoy athletic and physical challenges', 'Disfruto los desafíos atléticos y físicos', 'R'),
('I prefer working independently on projects', 'Prefiero trabajar independientemente en proyectos', 'R'),

-- Investigative (I) questions
('I enjoy solving complex problems', 'Disfruto resolver problemas complejos', 'I'),
('I like to analyze data and information', 'Me gusta analizar datos e información', 'I'),
('I enjoy conducting research and experiments', 'Disfruto realizar investigaciones y experimentos', 'I'),
('I like to understand how things work', 'Me gusta entender cómo funcionan las cosas', 'I'),
('I enjoy working with numbers and statistics', 'Disfruto trabajar con números y estadísticas', 'I'),
('I like to explore new ideas and theories', 'Me gusta explorar nuevas ideas y teorías', 'I'),
('I enjoy reading scientific journals', 'Disfruto leer revistas científicas', 'I'),
('I like to ask questions and seek answers', 'Me gusta hacer preguntas y buscar respuestas', 'I'),
('I enjoy working in laboratories', 'Disfruto trabajar en laboratorios', 'I'),
('I prefer logical and systematic approaches', 'Prefiero enfoques lógicos y sistemáticos', 'I'),

-- Artistic (A) questions
('I enjoy creative and artistic activities', 'Disfruto las actividades creativas y artísticas', 'A'),
('I like to express myself through art', 'Me gusta expresarme a través del arte', 'A'),
('I enjoy writing stories or poetry', 'Disfruto escribir historias o poesía', 'A'),
('I like to design and create visual content', 'Me gusta diseñar y crear contenido visual', 'A'),
('I enjoy music and performing arts', 'Disfruto la música y las artes escénicas', 'A'),
('I like to work in unstructured environments', 'Me gusta trabajar en ambientes no estructurados', 'A'),
('I enjoy brainstorming and generating ideas', 'Disfruto hacer lluvia de ideas y generar ideas', 'A'),
('I like to decorate and arrange spaces', 'Me gusta decorar y organizar espacios', 'A'),
('I enjoy photography and visual arts', 'Disfruto la fotografía y las artes visuales', 'A'),
('I prefer flexible and creative work', 'Prefiero trabajo flexible y creativo', 'A'),

-- Social (S) questions
('I enjoy helping and teaching others', 'Disfruto ayudar y enseñar a otros', 'S'),
('I like to work in teams and groups', 'Me gusta trabajar en equipos y grupos', 'S'),
('I enjoy counseling and advising people', 'Disfruto aconsejar y orientar a las personas', 'S'),
('I like to organize community events', 'Me gusta organizar eventos comunitarios', 'S'),
('I enjoy working with children or elderly', 'Disfruto trabajar con niños o ancianos', 'S'),
('I like to resolve conflicts between people', 'Me gusta resolver conflictos entre personas', 'S'),
('I enjoy volunteering for causes I believe in', 'Disfruto hacer voluntariado por causas en las que creo', 'S'),
('I like to provide emotional support', 'Me gusta brindar apoyo emocional', 'S'),
('I enjoy training and developing others', 'Disfruto entrenar y desarrollar a otros', 'S'),
('I prefer collaborative work environments', 'Prefiero ambientes de trabajo colaborativos', 'S'),

-- Enterprising (E) questions
('I enjoy leading and managing others', 'Disfruto liderar y gestionar a otros', 'E'),
('I like to persuade and influence people', 'Me gusta persuadir e influir en las personas', 'E'),
('I enjoy starting new business ventures', 'Disfruto iniciar nuevos emprendimientos', 'E'),
('I like to negotiate and make deals', 'Me gusta negociar y hacer tratos', 'E'),
('I enjoy public speaking and presentations', 'Disfruto hablar en público y hacer presentaciones', 'E'),
('I like to take risks for potential rewards', 'Me gusta tomar riesgos por recompensas potenciales', 'E'),
('I enjoy competing and winning', 'Disfruto competir y ganar', 'E'),
('I like to organize and coordinate projects', 'Me gusta organizar y coordinar proyectos', 'E'),
('I enjoy selling products or services', 'Disfruto vender productos o servicios', 'E'),
('I prefer fast-paced, dynamic environments', 'Prefiero ambientes dinámicos y de ritmo rápido', 'E'),

-- Conventional (C) questions
('I enjoy organizing and maintaining records', 'Disfruto organizar y mantener registros', 'C'),
('I like to follow established procedures', 'Me gusta seguir procedimientos establecidos', 'C'),
('I enjoy working with detailed information', 'Disfruto trabajar con información detallada', 'C'),
('I like to create systems and processes', 'Me gusta crear sistemas y procesos', 'C'),
('I enjoy budgeting and financial planning', 'Disfruto la elaboración de presupuestos y planificación financiera', 'C'),
('I like to work in structured environments', 'Me gusta trabajar en ambientes estructurados', 'C'),
('I enjoy data entry and record keeping', 'Disfruto la entrada de datos y el mantenimiento de registros', 'C'),
('I like to ensure accuracy and quality', 'Me gusta asegurar la precisión y calidad', 'C'),
('I enjoy administrative and clerical tasks', 'Disfruto las tareas administrativas y de oficina', 'C'),
('I prefer clear guidelines and expectations', 'Prefiero pautas y expectativas claras', 'C');
