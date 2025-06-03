# ROTAS

## USER

- ### /api/user/read/id

- ### /api/user/read/all

- ### /api/user/read/create

- ### /api/user/read/patch/id

- ### /api/user/read/put/id

- ### /api/user/read/delete/id

- ### /api/user/read/delete/many

## AUTH

- ### /api/auth/register

- ### /api/auth/login

- ### /api/auth/forget

- ### /api/auth/reset

- ### /api/auth/me

- ### /api/auth/delete

# HTTP RESPONSE

```typescript
{
  ok: boolean,
  statusMessage: string,
  message: string,
  data: object | null
}
```
