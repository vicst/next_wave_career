-- Insert sample traditional jobs
INSERT INTO jobs_traditional (job_title_en, job_title_es, description_en, description_es, riasec_code, salary_range, education_level, growth_outlook) VALUES
-- Realistic jobs
('Mechanical Engineer', 'Ingeniero Mecánico', 'Design and develop mechanical systems', 'Diseñar y desarrollar sistemas mecánicos', 'RIE', '$60,000-$90,000', 'Bachelor''s Degree', 'Stable'),
('Electrician', 'Electricista', 'Install and maintain electrical systems', 'Instalar y mantener sistemas eléctricos', 'REC', '$45,000-$70,000', 'Trade School', 'Growing'),
('Carpenter', 'Carpintero', 'Build and repair wooden structures', 'Construir y reparar estructuras de madera', 'RCI', '$35,000-$55,000', 'Apprenticeship', 'Stable'),

-- Investigative jobs
('Data Scientist', 'Científico de Datos', 'Analyze complex data to extract insights', 'Analizar datos complejos para extraer información', 'IRC', '$80,000-$120,000', 'Master''s Degree', 'High Growth'),
('Research Scientist', 'Científico Investigador', 'Conduct scientific research and experiments', 'Realizar investigación científica y experimentos', 'IRE', '$70,000-$100,000', 'PhD', 'Growing'),
('Software Developer', 'Desarrollador de Software', 'Create and maintain software applications', 'Crear y mantener aplicaciones de software', 'IRA', '$70,000-$110,000', 'Bachelor''s Degree', 'High Growth'),

-- Artistic jobs
('Graphic Designer', 'Diseñador Gráfico', 'Create visual content for various media', 'Crear contenido visual para varios medios', 'AES', '$40,000-$65,000', 'Bachelor''s Degree', 'Stable'),
('Writer', 'Escritor', 'Create written content for publications', 'Crear contenido escrito para publicaciones', 'AIS', '$35,000-$60,000', 'Bachelor''s Degree', 'Declining'),
('Interior Designer', 'Diseñador de Interiores', 'Design interior spaces for functionality and aesthetics', 'Diseñar espacios interiores para funcionalidad y estética', 'AER', '$45,000-$70,000', 'Bachelor''s Degree', 'Growing'),

-- Social jobs
('Teacher', 'Maestro', 'Educate and guide students in learning', 'Educar y guiar a los estudiantes en el aprendizaje', 'SAI', '$40,000-$60,000', 'Bachelor''s Degree', 'Stable'),
('Social Worker', 'Trabajador Social', 'Help individuals and families overcome challenges', 'Ayudar a individuos y familias a superar desafíos', 'SEC', '$45,000-$65,000', 'Master''s Degree', 'Growing'),
('Counselor', 'Consejero', 'Provide guidance and support for personal issues', 'Brindar orientación y apoyo para problemas personales', 'SIA', '$40,000-$70,000', 'Master''s Degree', 'Growing'),

-- Enterprising jobs
('Sales Manager', 'Gerente de Ventas', 'Lead sales teams and develop strategies', 'Liderar equipos de ventas y desarrollar estrategias', 'ECS', '$60,000-$100,000', 'Bachelor''s Degree', 'Growing'),
('Marketing Director', 'Director de Marketing', 'Develop and execute marketing campaigns', 'Desarrollar y ejecutar campañas de marketing', 'EAS', '$80,000-$130,000', 'Bachelor''s Degree', 'Growing'),
('Business Analyst', 'Analista de Negocios', 'Analyze business processes and recommend improvements', 'Analizar procesos de negocio y recomendar mejoras', 'EIC', '$65,000-$95,000', 'Bachelor''s Degree', 'High Growth'),

-- Conventional jobs
('Accountant', 'Contador', 'Manage financial records and prepare reports', 'Gestionar registros financieros y preparar informes', 'CES', '$50,000-$75,000', 'Bachelor''s Degree', 'Stable'),
('Administrative Assistant', 'Asistente Administrativo', 'Provide administrative support to organizations', 'Brindar apoyo administrativo a organizaciones', 'CSE', '$30,000-$45,000', 'High School', 'Declining'),
('Financial Analyst', 'Analista Financiero', 'Evaluate financial data and investment opportunities', 'Evaluar datos financieros y oportunidades de inversión', 'CIE', '$60,000-$85,000', 'Bachelor''s Degree', 'Growing');
