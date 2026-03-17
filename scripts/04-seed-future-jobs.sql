-- Insert future-oriented jobs with AI impact analysis
-- Added Romanian translations (job_title_ro, description_ro columns)
-- RIASEC codes corrected based on O*NET methodology (2024/2025 data)
-- Each code follows the same 3-letter Holland convention as jobs_traditional:
--   Position 1 = dominant interest, Position 2 = secondary, Position 3 = tertiary
INSERT INTO jobs_future (job_title_en, job_title_es, job_title_ro, description_en, description_es, description_ro, riasec_code, ai_impact_level, automation_risk, future_demand, required_skills) VALUES
-- High-growth future jobs
-- AI/ML Engineer: Based on O*NET Software Developers (15-1252.00) - I=84%, C=77%, R=44%
('AI/ML Engineer', 'Ingeniero de IA/ML', 'Inginer AI/ML', 'Develop and implement artificial intelligence solutions', 'Desarrollar e implementar soluciones de inteligencia artificial', 'Dezvoltă și implementează soluții de inteligență artificială', 'ICR', 'High', 'Low', 'High Growth', ARRAY['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis']),
-- Cybersecurity Specialist: Based on O*NET Information Security Analysts (15-1212.00) - CI primary
('Cybersecurity Specialist', 'Especialista en Ciberseguridad', 'Specialist în Securitate Cibernetică', 'Protect digital systems from cyber threats', 'Proteger sistemas digitales de amenazas cibernéticas', 'Protejează sistemele digitale de amenințările cibernetice', 'CIR', 'Medium', 'Low', 'High Growth', ARRAY['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Incident Response']),
-- UX/UI Designer: Based on O*NET Web and Digital Interface Designers (15-1255.00) - I=65%, A=58%, C=57%
('UX/UI Designer', 'Diseñador UX/UI', 'Designer UX/UI', 'Design user-centered digital experiences', 'Diseñar experiencias digitales centradas en el usuario', 'Proiectează experiențe digitale centrate pe utilizator', 'IAC', 'Medium', 'Medium', 'High Growth', ARRAY['Design Thinking', 'Prototyping', 'User Research', 'Figma']),
-- Data Analyst: Based on O*NET Data Scientists (15-2051.00) - IC primary, R for technical work
('Data Analyst', 'Analista de Datos', 'Analist de Date', 'Extract insights from large datasets', 'Extraer información de grandes conjuntos de datos', 'Extrage informații din seturi mari de date', 'ICR', 'High', 'Medium', 'High Growth', ARRAY['SQL', 'Python', 'Statistics', 'Data Visualization']),
-- Digital Marketing Specialist: Based on O*NET Marketing roles - EC primary, C for structured campaigns
('Digital Marketing Specialist', 'Especialista en Marketing Digital', 'Specialist în Marketing Digital', 'Develop online marketing strategies', 'Desarrollar estrategias de marketing en línea', 'Dezvoltă strategii de marketing online', 'ECS', 'Medium', 'Medium', 'Growing', ARRAY['SEO', 'Social Media', 'Analytics', 'Content Marketing']),

-- Jobs with medium automation risk
-- Project Manager: Based on O*NET Project Management Specialists (13-1082.00) - EC primary
('Project Manager', 'Gerente de Proyectos', 'Manager de Proiect', 'Coordinate and manage project execution', 'Coordinar y gestionar la ejecución de proyectos', 'Coordonează și gestionează execuția proiectelor', 'ECI', 'Medium', 'Medium', 'Growing', ARRAY['Agile', 'Leadership', 'Communication', 'Risk Management']),
-- Content Creator: AES is correct - Artistic primary for creative multimedia work
('Content Creator', 'Creador de Contenido', 'Creator de Conținut', 'Produce engaging digital content', 'Producir contenido digital atractivo', 'Produce conținut digital captivant', 'AES', 'High', 'Medium', 'Growing', ARRAY['Video Editing', 'Social Media', 'Storytelling', 'SEO']),
-- Healthcare Data Analyst: Based on Data Scientists (IC) pattern + S for healthcare context
('Healthcare Data Analyst', 'Analista de Datos de Salud', 'Analist de Date Medicale', 'Analyze healthcare data for insights', 'Analizar datos de salud para obtener información', 'Analizează datele medicale pentru informații', 'ICS', 'Medium', 'Medium', 'High Growth', ARRAY['Healthcare Systems', 'Statistics', 'HIPAA Compliance', 'SQL']),

-- Jobs with high automation risk
-- Customer Service Representative: SEC is correct per O*NET
('Customer Service Representative', 'Representante de Servicio al Cliente', 'Reprezentant Servicii Clienți', 'Assist customers with inquiries and issues', 'Ayudar a clientes con consultas y problemas', 'Asistă clienții cu întrebări și probleme', 'SEC', 'High', 'High', 'Declining', ARRAY['Communication', 'Problem Solving', 'CRM Software', 'Empathy']),
-- Data Entry Clerk: Based on O*NET Data Entry Keyers (43-9021.00) - C=100%, R=34%
('Data Entry Clerk', 'Empleado de Entrada de Datos', 'Operator Introducere Date', 'Input and maintain database information', 'Ingresar y mantener información de bases de datos', 'Introduce și menține informațiile din baze de date', 'CRE', 'High', 'High', 'Declining', ARRAY['Typing', 'Attention to Detail', 'Database Software', 'Accuracy']),
-- Bookkeeper: Based on O*NET Bookkeeping Clerks (43-3031.00) - CE primary
('Bookkeeper', 'Tenedor de Libros', 'Contabil', 'Maintain financial records for businesses', 'Mantener registros financieros para empresas', 'Menține înregistrările financiare pentru afaceri', 'CES', 'High', 'High', 'Declining', ARRAY['Accounting Software', 'Mathematics', 'Organization', 'Attention to Detail']),

-- Emerging roles
-- Sustainability Consultant: Based on Environmental Scientists/Sustainability Specialists - IE + C for compliance
('Sustainability Consultant', 'Consultor de Sostenibilidad', 'Consultant în Sustenabilitate', 'Help organizations implement sustainable practices', 'Ayudar a organizaciones a implementar prácticas sostenibles', 'Ajută organizațiile să implementeze practici sustenabile', 'IEC', 'Low', 'Low', 'High Growth', ARRAY['Environmental Science', 'Policy Analysis', 'Project Management', 'Communication']),
-- Robotics Engineer: RIE is correct - Realistic primary for engineering
('Robotics Engineer', 'Ingeniero en Robótica', 'Inginer în Robotică', 'Design and develop robotic systems', 'Diseñar y desarrollar sistemas robóticos', 'Proiectează și dezvoltă sisteme robotice', 'RIE', 'Medium', 'Low', 'High Growth', ARRAY['Programming', 'Mechanical Engineering', 'Electronics', 'AI']),
-- Virtual Reality Developer: Based on Web/Digital Designers (IAC) + Software Devs (ICR) blend
('Virtual Reality Developer', 'Desarrollador de Realidad Virtual', 'Dezvoltator Realitate Virtuală', 'Create immersive VR experiences', 'Crear experiencias inmersivas de RV', 'Creează experiențe VR imersive', 'IAR', 'Medium', 'Medium', 'Growing', ARRAY['Unity', 'C#', '3D Modeling', 'User Experience']);
