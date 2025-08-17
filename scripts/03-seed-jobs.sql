-- Insert sample traditional jobs
-- Added Romanian translations (job_title_ro, description_ro columns)
INSERT INTO jobs_traditional (job_title_en, job_title_es, job_title_ro, description_en, description_es, description_ro, riasec_code, salary_range, education_level, growth_outlook) VALUES
-- Realistic jobs
('Mechanical Engineer', 'Ingeniero Mecánico', 'Inginer Mecanic', 'Design and develop mechanical systems', 'Diseñar y desarrollar sistemas mecánicos', 'Proiectează și dezvoltă sisteme mecanice', 'RIE', '$60,000-$90,000', 'Bachelor''s Degree', 'Stable'),
('Electrician', 'Electricista', 'Electrician', 'Install and maintain electrical systems', 'Instalar y mantener sistemas eléctricos', 'Instalează și întreține sisteme electrice', 'REC', '$45,000-$70,000', 'Trade School', 'Growing'),
('Carpenter', 'Carpintero', 'Tâmplar', 'Build and repair wooden structures', 'Construir y reparar estructuras de madera', 'Construiește și repară structuri din lemn', 'RCI', '$35,000-$55,000', 'Apprenticeship', 'Stable'),

-- Investigative jobs
('Data Scientist', 'Científico de Datos', 'Scientist de Date', 'Analyze complex data to extract insights', 'Analizar datos complejos para extraer información', 'Analizează date complexe pentru a extrage informații', 'IRC', '$80,000-$120,000', 'Master''s Degree', 'High Growth'),
('Research Scientist', 'Científico Investigador', 'Cercetător Științific', 'Conduct scientific research and experiments', 'Realizar investigación científica y experimentos', 'Efectuează cercetări științifice și experimente', 'IRE', '$70,000-$100,000', 'PhD', 'Growing'),
('Software Developer', 'Desarrollador de Software', 'Dezvoltator Software', 'Create and maintain software applications', 'Crear y mantener aplicaciones de software', 'Creează și întreține aplicații software', 'IRA', '$70,000-$110,000', 'Bachelor''s Degree', 'High Growth'),

-- Artistic jobs
('Graphic Designer', 'Diseñador Gráfico', 'Designer Grafic', 'Create visual content for various media', 'Crear contenido visual para varios medios', 'Creează conținut vizual pentru diverse medii', 'AES', '$40,000-$65,000', 'Bachelor''s Degree', 'Stable'),
('Writer', 'Escritor', 'Scriitor', 'Create written content for publications', 'Crear contenido escrito para publicaciones', 'Creează conținut scris pentru publicații', 'AIS', '$35,000-$60,000', 'Bachelor''s Degree', 'Declining'),
('Interior Designer', 'Diseñador de Interiores', 'Designer de Interior', 'Design interior spaces for functionality and aesthetics', 'Diseñar espacios interiores para funcionalidad y estética', 'Proiectează spații interioare pentru funcționalitate și estetică', 'AER', '$45,000-$70,000', 'Bachelor''s Degree', 'Growing'),

-- Social jobs
('Teacher', 'Maestro', 'Profesor', 'Educate and guide students in learning', 'Educar y guiar a los estudiantes en el aprendizaje', 'Educă și ghidează studenții în învățare', 'SAI', '$40,000-$60,000', 'Bachelor''s Degree', 'Stable'),
('Social Worker', 'Trabajador Social', 'Asistent Social', 'Help individuals and families overcome challenges', 'Ayudar a individuos y familias a superar desafíos', 'Ajută indivizii și familiile să depășească provocările', 'SEC', '$45,000-$65,000', 'Master''s Degree', 'Growing'),
('Counselor', 'Consejero', 'Consilier', 'Provide guidance and support for personal issues', 'Brindar orientación y apoyo para problemas personales', 'Oferă îndrumări și sprijin pentru probleme personale', 'SIA', '$40,000-$70,000', 'Master''s Degree', 'Growing'),

-- Enterprising jobs
('Sales Manager', 'Gerente de Ventas', 'Manager de Vânzări', 'Lead sales teams and develop strategies', 'Liderar equipos de ventas y desarrollar estrategias', 'Conduce echipe de vânzări și dezvoltă strategii', 'ECS', '$60,000-$100,000', 'Bachelor''s Degree', 'Growing'),
('Marketing Director', 'Director de Marketing', 'Director de Marketing', 'Develop and execute marketing campaigns', 'Desarrollar y ejecutar campañas de marketing', 'Dezvoltă și execută campanii de marketing', 'EAS', '$80,000-$130,000', 'Bachelor''s Degree', 'Growing'),
('Business Analyst', 'Analista de Negocios', 'Analist de Afaceri', 'Analyze business processes and recommend improvements', 'Analizar procesos de negocio y recomendar mejoras', 'Analizează procesele de afaceri și recomandă îmbunătățiri', 'EIC', '$65,000-$95,000', 'Bachelor''s Degree', 'High Growth'),

-- Conventional jobs
('Accountant', 'Contador', 'Contabil', 'Manage financial records and prepare reports', 'Gestionar registros financieros y preparar informes', 'Gestionează înregistrările financiare și pregătește rapoarte', 'CES', '$50,000-$75,000', 'Bachelor''s Degree', 'Stable'),
('Administrative Assistant', 'Asistente Administrativo', 'Asistent Administrativ', 'Provide administrative support to organizations', 'Brindar apoyo administrativo a organizaciones', 'Oferă suport administrativ organizațiilor', 'CSE', '$30,000-$45,000', 'High School', 'Declining'),
('Financial Analyst', 'Analista Financiero', 'Analist Financiar', 'Evaluate financial data and investment opportunities', 'Evaluar datos financieros y oportunidades de inversión', 'Evaluează datele financiare și oportunitățile de investiție', 'CIE', '$60,000-$85,000', 'Bachelor''s Degree', 'Growing');
