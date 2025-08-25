# Detecção de Code Smells e Refatorações

Este documento apresenta a análise manual de "code smells" (maus cheiros de código) encontrados nas classes de serviço do projeto backend, com propostas de refatoração para melhorar a qualidade, manutenibilidade e legibilidade do código.

---

## 1. Código Duplicado: Formatação de Imagens para Base64

**Smell Identificado:** Código Duplicado (Duplicated Code).  
A lógica para formatar os dados binários das imagens para o formato Base64 é repetida em múltiplos serviços (`GetAvailableAnimalsService` e `GetUserAnimalsService`).  
A duplicação de código dificulta a manutenção, pois qualquer alteração precisa ser replicada em vários locais, aumentando a chance de erros.

### Trecho do Código Original

Observe a repetição da lógica de `map` e `toString('base64')` nos arquivos **get-available.ts** e **get-user.ts**:

```typescript
// backend/src/services/animal/get-available.ts
const formattedAnimals = animals.map((animal) => {
  return {
    ...animal,
    images: animal.images.map((image) => {
      return image.imageData.toString('base64'); // Lógica duplicada
    }),
  };
});
return Success.create({ animals: formattedAnimals });
```

```typescript
// backend/src/services/animal/get-user.ts
const formattedAnimals = animals.map((animal) => {
  return {
    ...animal,
    images: animal.images.map((image) => {
      return image.imageData.toString('base64'); // Lógica duplicada
    }),
  };
});
return Success.create({ animals: formattedAnimals });
```

### Refatoração Sugerida

Crie uma função utilitária dedicada para essa tarefa de formatação de imagens, centralizando a lógica em um único local (princípio **DRY**).

**Arquivo sugerido:** `backend/src/utils/formatters.ts`

```typescript
// backend/src/utils/formatters.ts
import { Animal, AnimalImage } from '@prisma/client';

export const formatAnimalImagesToBase64 = (
  animal: Animal & { images: AnimalImage[] },
): Animal & { images: string[] } => {
  return {
    ...animal,
    images: animal.images.map((image) => image.imageData.toString('base64')),
  };
};
```

**Aplicação em `get-available.ts`:**

```typescript
// backend/src/services/animal/get-available.ts
import { Animal } from '@prisma/client';
import { Either, Success } from '../../utils/either.js';
import { AnimalRepository, animalRepositoryInstance } from '../../repositories/animal.js';
import { formatAnimalImagesToBase64 } from '../../utils/formatters.js';

export class GetAvailableAnimalsService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(params: GetAvailableAnimalsDTO.Params): Promise<GetAvailableAnimalsDTO.Result> {
    const animals = await this.animalRepository.findAllAvailableNotFromUser(params);

    const formattedAnimals = animals.map(formatAnimalImagesToBase64);

    return Success.create({ animals: formattedAnimals });
  }
}
```

---

## 2. Strings Mágicas: Mensagens de Erro

**Smell Identificado:** Strings Mágicas (Magic Strings).  
As mensagens de erro estão hardcoded diretamente nas classes de serviço, o que dificulta manutenção e pode gerar inconsistências.

### Trecho do Código Original

```typescript
// backend/src/services/animal/create-animal.ts
if (!animal) {
  return Failure.create({ message: 'Erro ao criar o animal.' }); // String mágica
}
```

```typescript
// backend/src/services/chat/create-user-chat-message.ts
if (senderId === receiverId) {
  return Failure.create({ message: 'Sender id is equal to receiver id' }); // String mágica
}
```

### Refatoração Sugerida

Crie um arquivo de constantes para centralizar todas as mensagens de erro.

**Arquivo sugerido:** `backend/src/constants/error-messages.ts`

```typescript
// backend/src/constants/error-messages.ts
export const ERROR_MESSAGES = {
  CREATE_ANIMAL_ERROR: 'Erro ao criar o animal.',
  UPDATE_ANIMAL_STATUS_ERROR: 'Erro ao atualizar o status do animal.',
  SENDER_RECEIVER_EQUALS_ERROR: 'O ID do remetente é igual ao ID do destinatário.',
  USER_CANNOT_CHAT_WITH_SELF: 'O usuário não pode criar um chat consigo mesmo.',
};
```

**Aplicação em `create-animal.ts`:**

```typescript
import { ERROR_MESSAGES } from '../../constants/error-messages.js';

if (!animal) {
  return Failure.create({ message: ERROR_MESSAGES.CREATE_ANIMAL_ERROR });
}
```

---

## 3. Lógica Condicional Duplicada: Prevenção de Chat Consigo Mesmo

**Smell Identificado:** Lógica Condicional Duplicada.  
A verificação `id1 === id2` para impedir que um usuário crie chat ou mensagem consigo mesmo aparece em vários serviços.

### Trecho do Código Original

```typescript
// backend/src/services/chat/create-user-chat-message.ts
if (senderId === receiverId) { // Lógica duplicada
  return Failure.create({ message: 'Sender id is equal to receiver id' });
}
```

```typescript
// backend/src/services/chat/create-user-chat.ts
if (user1Id === user2Id) { // Lógica duplicada
  return Failure.create({
    message: 'User cannot create a chat with himself',
  });
}
```

### Refatoração Sugerida

Crie um validador genérico para encapsular essa regra de negócio.

**Arquivo sugerido:** `backend/src/utils/validators.ts`

```typescript
// backend/src/utils/validators.ts
import { Failure } from './either.js';

export const validateDifferentUsers = (
  id1: string,
  id2: string,
  errorMessage: string,
): Failure<{ message: string }> | undefined => {
  if (id1 === id2) {
    return Failure.create({ message: errorMessage });
  }
  return undefined;
};
```

**Aplicação em `create-user-chat-message.ts`:**

```typescript
import { validateDifferentUsers } from '../../utils/validators.js';
import { ERROR_MESSAGES } from '../../constants/error-messages.js';

const validationError = validateDifferentUsers(
  senderId,
  receiverId,
  ERROR_MESSAGES.SENDER_RECEIVER_EQUALS_ERROR,
);

if (validationError) {
  return validationError;
}
```

---

✅ Documento pronto para ser salvo como:  
`documentacao/smells-refatoracoes.md`
