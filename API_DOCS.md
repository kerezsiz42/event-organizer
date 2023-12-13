# OpenAPI definition

> Version v0

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| PUT | [/options](#putoptions) | Frissít vagy beilleszt egy option objektumot az adatbázisba |
| DELETE | [/options/{id}](#deleteoptionsid) | Kitöröl egy option objektumot id alapján idempotens módon |
| GET | [/options/{id}](#getoptionsid) | Lekérdez egy option objektumot id alapján |
| GET | [/polls](#getpolls) | Visszaküldi az összes poll objektumot |
| PUT | [/polls](#putpolls) | Frissít vagy beilleszt egy poll objektumot az adatbázisba |
| DELETE | [/polls/{id}](#deletepollsid) | Kitöröl egy poll objektumot id alapján idempotens módon |
| GET | [/polls/{id}](#getpollsid) | Lekérdez egy poll objektumot id alapján |
| PUT | [/votes](#putvotes) | Frissít vagy beilleszt egy vote objektumot az adatbázisba |
| DELETE | [/votes/{id}](#deletevotesid) | Kitöröl egy vote objektumot id alapján idempotens módon |
| GET | [/votes/{id}](#getvotesid) | Lekérdez egy poll objektumot id alapján |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| OptionInput | [#/components/schemas/OptionInput](#componentsschemasoptioninput) |  |
| OptionOutput | [#/components/schemas/OptionOutput](#componentsschemasoptionoutput) |  |
| PollInput | [#/components/schemas/PollInput](#componentsschemaspollinput) |  |
| PollOutput | [#/components/schemas/PollOutput](#componentsschemaspolloutput) |  |
| VoteInput | [#/components/schemas/VoteInput](#componentsschemasvoteinput) |  |
| VoteOutput | [#/components/schemas/VoteOutput](#componentsschemasvoteoutput) |  |

## Path Details

***

### [PUT]/options

- Summary  
Frissít vagy beilleszt egy option objektumot az adatbázisba

#### RequestBody

- application/json

```ts
{
  optionId: string
  title: string
  description: string
  price: integer
  poll: string
  votes?: string[]
}
```

#### Responses

- 200 Validálja a bejövő option objektum adatait, majd frissítit a option objektumot, ha ugyanolyan id-val már létezik az adatbázisban, különben beilleszt egy újat.

`application/json`

```ts
{
  optionId: string
  title: string
  description: string
  price: integer
  poll: string
  votes?: string[]
}
```

- 400 Működésbe lép, ha az option objektum bármely mezője a validációnak nem megfelelő formátumú. Visszaküldi a hibás mezőket és a hibákat egy JSON objektumban.

`application/json`

```ts
{
  "type": "string"
}
```

***

### [DELETE]/options/{id}

- Summary  
Kitöröl egy option objektumot id alapján idempotens módon

#### Responses

- 200 Kitöröl egy option objektumot id alapján, ha létezik, vagy visszatér sikeresen ha nem létezett. A hivatkozó objektumokból is kitörli a rá mutatő referenciát.

`application/json`

```ts
{
  "type": "string"
}
```

- 400 Bad Request

`*/*`

```ts
{
}
```

***

### [GET]/options/{id}

- Summary  
Lekérdez egy option objektumot id alapján

#### Responses

- 200 Visszaadja az option objektumot az adatbázisból, ha létezik.

`application/json`

```ts
{
  optionId: string
  title: string
  description: string
  price: integer
  poll: string
  votes?: string[]
}
```

- 400 Bad Request

`*/*`

```ts
{
}
```

- 404 Ha az option objektum nem található.

`application/json`

```ts
{
  "type": "string"
}
```

***

### [GET]/polls

- Summary  
Visszaküldi az összes poll objektumot

#### Responses

- 200 Visszaküldi az összes poll objektumot. Nem dob kivételt. Ha az adatbázis üres, akkor egy üres array-el tér vissza.

`application/json`

```ts
{
  pollId: string
  title: string
  description: string
  multipleResult: boolean
  options?: string[]
  votes?: string[]
}[]
```

- 400 Bad Request

`*/*`

```ts
{
}
```

***

### [PUT]/polls

- Summary  
Frissít vagy beilleszt egy poll objektumot az adatbázisba

#### RequestBody

- application/json

```ts
{
  pollId: string
  title: string
  description: string
  multipleResult: boolean
  options?: string[]
  votes?: string[]
}
```

#### Responses

- 200 Validálja a bejövő poll objektum adatait, majd frissítit a poll objektumot, ha ugyanolyan id-val már létezik az adatbázisban, különben beilleszt egy újat.

`application/json`

```ts
{
  pollId: string
  title: string
  description: string
  multipleResult: boolean
  options?: string[]
  votes?: string[]
}
```

- 400 Működésbe lép, ha a poll objektum bármely mezője a validációnak nem megfelelő formátumú. Visszaküldi a hibás mezőket és a hibákat egy JSON objektumban.

`application/json`

```ts
{
  "type": "string"
}
```

***

### [DELETE]/polls/{id}

- Summary  
Kitöröl egy poll objektumot id alapján idempotens módon

#### Responses

- 200 Kitöröl egy poll objektumot id alapján, ha létezik, vagy visszatér sikeresen ha nem létezett. A hivatkozó objektumokból is kitörli a rá mutatő referenciát.

`application/json`

```ts
{
  "type": "string"
}
```

- 400 Bad Request

`*/*`

```ts
{
}
```

***

### [GET]/polls/{id}

- Summary  
Lekérdez egy poll objektumot id alapján

#### Responses

- 200 Visszaadja a poll objektumot az adatbázisból, ha létezik.

`application/json`

```ts
{
  pollId: string
  title: string
  description: string
  multipleResult: boolean
  options?: string[]
  votes?: string[]
}
```

- 400 Bad Request

`*/*`

```ts
{
}
```

- 404 Ha az poll objektum nem található.

`application/json`

```ts
{
  "type": "string"
}
```

***

### [PUT]/votes

- Summary  
Frissít vagy beilleszt egy vote objektumot az adatbázisba

#### RequestBody

- application/json

```ts
{
  voteId: string
  poll: string
  option: string
}
```

#### Responses

- 200 Validálja a bejövő vote objektum adatait, majd frissítit a vote objektumot, ha ugyanolyan id-val már létezik az adatbázisban, különben beilleszt egy újat.

`application/json`

```ts
{
  voteId: string
  username: string
  poll: string
  option: string
}
```

- 400 Működésbe lép, ha a vote objektum bármely mezője a validációnak nem megfelelő formátumú. Visszaküldi a hibás mezőket és a hibákat egy JSON objektumban.

`application/json`

```ts
{
  "type": "string"
}
```

***

### [DELETE]/votes/{id}

- Summary  
Kitöröl egy vote objektumot id alapján idempotens módon

#### Responses

- 200 Kitöröl egy vote objektumot id alapján, ha létezik, vagy visszatér sikeresen ha nem létezett. A hivatkozó objektumokból is kitörli a rá mutatő referenciát.

`application/json`

```ts
{
  "type": "string"
}
```

- 400 Bad Request

`*/*`

```ts
{
}
```

***

### [GET]/votes/{id}

- Summary  
Lekérdez egy poll objektumot id alapján

#### Responses

- 200 Visszaadja a vote objektumot az adatbázisból, ha létezik.

`application/json`

```ts
{
  voteId: string
  username: string
  poll: string
  option: string
}
```

- 400 Bad Request

`*/*`

```ts
{
}
```

- 404 Ha a vote objektum nem található.

`application/json`

```ts
{
  "type": "string"
}
```

## References

### #/components/schemas/OptionInput

```ts
{
  optionId: string
  title: string
  description: string
  price: integer
  poll: string
  votes?: string[]
}
```

### #/components/schemas/OptionOutput

```ts
{
  optionId: string
  title: string
  description: string
  price: integer
  poll: string
  votes?: string[]
}
```

### #/components/schemas/PollInput

```ts
{
  pollId: string
  title: string
  description: string
  multipleResult: boolean
  options?: string[]
  votes?: string[]
}
```

### #/components/schemas/PollOutput

```ts
{
  pollId: string
  title: string
  description: string
  multipleResult: boolean
  options?: string[]
  votes?: string[]
}
```

### #/components/schemas/VoteInput

```ts
{
  voteId: string
  poll: string
  option: string
}
```

### #/components/schemas/VoteOutput

```ts
{
  voteId: string
  username: string
  poll: string
  option: string
}
```