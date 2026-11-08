INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO teachers (
    name,
    email,
    phone,
    specialty,
    experience,
    status
) VALUES
('Carlos Andres Vargas', 'carlos.vargas@gmail.com', '3201112233', 'Bases de Datos', 8, TRUE),

('Marcela Ospina Rios', 'marcela.ospina@gmail.com', '3202223344', 'Ingeniería de Software', 12, TRUE),

('Jorge Enrique Salazar', 'jorge.salazar@gmail.com', '3203334455', 'Redes de Computadores', 15, TRUE),

('Paola Andrea Cardona', 'paola.cardona@gmail.com', '3204445566', 'Programación Web', 6, TRUE),

('Luis Fernando Marin', 'luis.marin@gmail.com', '3205556677', 'Sistemas Operativos', 10, TRUE),

('Diana Carolina Restrepo', 'diana.restrepo@gmail.com', '3206667788', 'Inteligencia Artificial', 7, TRUE),

('Hernan Dario Mejia', 'hernan.mejia@gmail.com', '3207778899', 'Arquitectura de Software', 18, TRUE),

('Sandra Milena Ortiz', 'sandra.ortiz@gmail.com', '3208889900', 'Matemáticas', 14, TRUE),

('Felipe Alejandro Cruz', 'felipe.cruz@gmail.com', '3209990011', 'Desarrollo de Aplicaciones Móviles', 4, TRUE),

('Natalia Giraldo Duque', 'natalia.giraldo@gmail.com', '3210001122', 'Estadística y Simulación', 9, TRUE)
ON CONFLICT DO NOTHING;
