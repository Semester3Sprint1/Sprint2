CREATE PROCEDURE public."addwriter2"()
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
		i integer;
	BEGIN
		for i IN 1..1000
        LOOP
    INSERT INTO public.film_writer(film_id, writer_id)
	VALUES (i, random_between(1,30));
     END LOOP;
	END
$BODY$;
ALTER PROCEDURE public."addwriter2"()
    OWNER TO postgres;