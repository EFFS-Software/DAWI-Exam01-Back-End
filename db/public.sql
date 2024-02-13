-- Active: 1706044690405@@localhost@5432@api_vehiculo
CREATE DATABASE api_vehiculo

create table tbl_marca (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_modelo (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), marca_id INT REFERENCES tbl_marca (id), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_vehiculo (
    id SERIAL PRIMARY KEY, modelo_id INT REFERENCES tbl_modelo (id), anio INT, tipo_combustible VARCHAR(255), kilometraje INT, num_puertas INT, num_asientos INT, date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_tipo_mantenimiento (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_especialidad_mecanico (
    id SERIAL PRIMARY KEY, descripcion VARCHAR(100), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_mecanico (
    id SERIAL PRIMARY KEY, nombre VARCHAR(100), especialidad_mecanico_id INT REFERENCES tbl_especialidad_mecanico (id), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_mantenimiento (
    id SERIAL PRIMARY KEY, vehiculo_id INT REFERENCES tbl_vehiculo (id), fecha TIMESTAMP, tipo_mantenimiento_id INT REFERENCES tbl_tipo_mantenimiento (id), diagnostico VARCHAR(255), servicio VARCHAR(255), kilometraje INT, costos FLOAT, notas_adicionales VARCHAR(255), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_historial_mecanico_mantenimiento (
    id SERIAL PRIMARY KEY, mecanico_id INT REFERENCES tbl_mecanico (id), tbl_mantenimiento_id INT REFERENCES tbl_mantenimiento (id), detalle_servicio VARCHAR(255), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);

create table tbl_vehiculo_historial (
    id SERIAL PRIMARY KEY, vehiculo_id INT REFERENCES tbl_vehiculo (id), fecha_compra TIMESTAMP, fecha_venta TIMESTAMP, kilometraje_compra INT, kilometraje_venta INT, reparaciones VARCHAR(255), modificaciones VARCHAR(255), cambio_titular VARCHAR(100), notas_adicionales VARCHAR(255), date_create TIMESTAMP DEFAULT current_timestamp, date_modify TIMESTAMP
);