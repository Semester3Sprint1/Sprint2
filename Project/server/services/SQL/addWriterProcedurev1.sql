CREATE PROCEDURE public."addwriter"()
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
		i integer;
	BEGIN
		for i IN 1..1000
        LOOP
    INSERT INTO public.film_writer(film_id, writer_id)
	VALUES (random_between(1,1000), random_between(1,30));
     END LOOP;
	END
$BODY$;
ALTER PROCEDURE public."addwriter"()
    OWNER TO postgres;