CREATE TABLE public.bootcamps (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	duracion int4 NOT NULL,
	turno int4 NOT NULL,
	CONSTRAINT bootcamps_pk PRIMARY KEY (id)
);