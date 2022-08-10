CREATE FUNCTION public.random_between(low integer, high integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
    
AS $BODY$
BEGIN
	RETURN floor(random() * (high-low +1 ) + low);
END;
$BODY$;

ALTER FUNCTION public.random_between(integer, integer)
    OWNER TO postgres;