-- Active: 1706044690405@@localhost@5432@api_vehiculo
CREATE DATABASE api_vehiculo

create table tbl_usuarios (
    nombre_usuario varchar(20) primary key, correo_electronico varchar(50), contrasena varchar(20), nombre varchar(200), apellido varchar(200), foto_perfil bytea, mime_type varchar(500), nombre_archivo varchar(500), fecha_creacion TIMESTAMP DEFAULT current_timestamp, activo BOOLEAN DEFAULT true
);

SELECT * from tbl_usuarios;

DELETE from tbl_usuarios;

create table tbl_marca (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_modelo (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), marca_id INT REFERENCES tbl_marca (id), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_vehiculo (
    id SERIAL PRIMARY KEY, modelo_id INT REFERENCES tbl_modelo (id), anio INT, tipo_combustible VARCHAR(255), kilometraje INT, num_puertas INT, num_asientos INT, date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

ALTER TABLE tbl_vehiculo ADD COLUMN foto_vehiculo bytea;

ALTER TABLE tbl_vehiculo ADD COLUMN mime_type varchar(500);

ALTER TABLE tbl_vehiculo ADD COLUMN nombre_archivo varchar(500);

create table tbl_mantenimiento (
    id SERIAL PRIMARY KEY, vehiculo_id INT REFERENCES tbl_vehiculo (id), fecha TIMESTAMP, diagnostico VARCHAR(255), servicio VARCHAR(255), kilometraje INT, costos FLOAT, notas_adicionales VARCHAR(255), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_especialidad_mecanico (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_mecanico (
    id SERIAL PRIMARY KEY, nombre VARCHAR(100), especialidad_mecanico_id INT REFERENCES tbl_especialidad_mecanico (id), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_mantenimiento_mecanico (
    id SERIAL PRIMARY KEY, mecanico_id INT REFERENCES tbl_mecanico (id), mantenimiento_id INT REFERENCES tbl_mantenimiento (id), detalle_servicio VARCHAR(255), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_historial_vehiculo (
    id SERIAL PRIMARY KEY, vehiculo_id INT REFERENCES tbl_vehiculo (id), fecha TIMESTAMP, reparaciones VARCHAR(255), modificaciones VARCHAR(255), notas_adicionales VARCHAR(255), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);