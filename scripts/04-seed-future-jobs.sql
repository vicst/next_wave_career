-- Insert future-oriented jobs with AI impact analysis
INSERT INTO jobs_future (job_title_en, job_title_es, description_en, description_es, riasec_code, ai_impact_level, automation_risk, future_demand, required_skills) VALUES
-- High-growth future jobs
('AI/ML Engineer', 'Ingeniero de IA/ML', 'Develop and implement artificial intelligence solutions', 'Desarrollar e implementar soluciones de inteligencia artificial', 'IRC', 'High', 'Low', 'High Growth', ARRAY['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis']),
('Cybersecurity Specialist', 'Especialista en Ciberseguridad', 'Protect digital systems from cyber threats', 'Proteger sistemas digitales de amenazas cibernéticas', 'IEC', 'Medium', 'Low', 'High Growth', ARRAY['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Incident Response']),
('UX/UI Designer', 'Diseñador UX/UI', 'Design user-centered digital experiences', 'Diseñar experiencias digitales centradas en el usuario', 'AIS', 'Medium', 'Medium', 'High Growth', ARRAY['Design Thinking', 'Prototyping', 'User Research', 'Figma']),
('Data Analyst', 'Analista de Datos', 'Extract insights from large datasets', 'Extraer información de grandes conjuntos de datos', 'ICE', 'High', 'Medium', 'High Growth', ARRAY['SQL', 'Python', 'Statistics', 'Data Visualization']),
('Digital Marketing Specialist', 'Especialista en Marketing Digital', 'Develop online marketing strategies', 'Desarrollar estrategias de marketing en línea', 'EAS', 'Medium', 'Medium', 'Growing', ARRAY['SEO', 'Social Media', 'Analytics', 'Content Marketing']),

-- Jobs with medium automation risk
('Project Manager', 'Gerente de Proyectos', 'Coordinate and manage project execution', 'Coordinar y gestionar la ejecución de proyectos', 'ESC', 'Medium', 'Medium', 'Growing', ARRAY['Agile', 'Leadership', 'Communication', 'Risk Management']),
('Content Creator', 'Creador de Contenido', 'Produce engaging digital content', 'Producir contenido digital atractivo', 'AES', 'High', 'Medium', 'Growing', ARRAY['Video Editing', 'Social Media', 'Storytelling', 'SEO']),
('Healthcare Data Analyst', 'Analista de Datos de Salud', 'Analyze healthcare data for insights', 'Analizar datos de salud para obtener información', 'ISC', 'Medium', 'Medium', 'High Growth', ARRAY['Healthcare Systems', 'Statistics', 'HIPAA Compliance', 'SQL']),

-- Jobs with high automation risk
('Customer Service Representative', 'Representante de Servicio al Cliente', 'Assist customers with inquiries and issues', 'Ayudar a clientes con consultas y problemas', 'SEC', 'High', 'High', 'Declining', ARRAY['Communication', 'Problem Solving', 'CRM Software', 'Empathy']),
('Data Entry Clerk', 'Empleado de Entrada de Datos', 'Input and maintain database information', 'Ingresar y mantener información de bases de datos', 'CSI', 'High', 'High', 'Declining', ARRAY['Typing', 'Attention to Detail', 'Database Software', 'Accuracy']),
('Bookkeeper', 'Tenedor de Libros', 'Maintain financial records for businesses', 'Mantener registros financieros para empresas', 'CIS', 'High', 'High', 'Declining', ARRAY['Accounting Software', 'Mathematics', 'Organization', 'Attention to Detail']),

-- Emerging roles
('Sustainability Consultant', 'Consultor de Sostenibilidad', 'Help organizations implement sustainable practices', 'Ayudar a organizaciones a implementar prácticas sostenibles', 'IES', 'Low', 'Low', 'High Growth', ARRAY['Environmental Science', 'Policy Analysis', 'Project Management', 'Communication']),
('Robotics Engineer', 'Ingeniero en Robótica', 'Design and develop robotic systems', 'Diseñar y desarrollar sistemas robóticos', 'RIE', 'Medium', 'Low', 'High Growth', ARRAY['Programming', 'Mechanical Engineering', 'Electronics', 'AI']),
('Virtual Reality Developer', 'Desarrollador de Realidad Virtual', 'Create immersive VR experiences', 'Crear experiencias inmersivas de RV', 'ARI', 'Medium', 'Medium', 'Growing', ARRAY['Unity', 'C#', '3D Modeling', 'User Experience']);
