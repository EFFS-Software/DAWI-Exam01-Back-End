-- Active: 1706044690405@@localhost@5432@api_vehiculo
CREATE DATABASE api_vehiculo

create table tbl_marca (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_modelo (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), marca_id INT REFERENCES tbl_marca (id), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

SELECT * FROM tbl_marca;

create table tbl_vehiculo (
    id SERIAL PRIMARY KEY, modelo_id INT REFERENCES tbl_modelo (id), anio INT, tipo_combustible VARCHAR(255), kilometraje INT, num_puertas INT, num_asientos INT, date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);