@echo off
set /p filename="Nombre del archivo SQL a ejecutar: "
docker exec -i postgres_ecommerce psql -U postgres -d ecommercedb -f /tmp/%filename%
echo Listo!