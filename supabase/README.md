# Configuración de Supabase

1. Abre **SQL Editor** en el panel de Supabase.
2. Copia y ejecuta `migrations/001_initial_schema.sql` una sola vez.
3. En **Authentication > Users**, crea manualmente la cuenta compartida.
4. En la configuración del proveedor Email, desactiva el registro público de usuarios.
5. Configura en Netlify las mismas variables `VITE_SUPABASE_URL`,
   `VITE_SUPABASE_PUBLISHABLE_KEY` y `VITE_SUPABASE_LOGIN_EMAIL` usadas localmente.

La contraseña de la cuenta nunca debe guardarse en una variable `VITE_*`.
