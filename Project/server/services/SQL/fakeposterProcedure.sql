CREATE PROCEDURE public.addposter()
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
		i integer;
	BEGIN
		for i IN 1..1000
        LOOP
    UPDATE public.film
	SET poster= CONCAT('https://source.unsplash.com/collection/190727/800x600?',i)
	WHERE film_id = i;
     END LOOP;
	END
$BODY$;
ALTER PROCEDURE public.addposter()
    OWNER TO postgres;