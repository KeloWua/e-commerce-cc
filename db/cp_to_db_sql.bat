@echo off
set /p filename="Nombre del archivo SQL: "
docker cp %filename% postgres_ecommerce:/tmp/%filename%
echo Archivo copiado a /tmp/%filename%