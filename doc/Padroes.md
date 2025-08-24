# Análise de Princípios e Padrões de Projeto

Este documento detalha a aplicação de princípios de design (SOLID) e padrões de projeto encontrados no código do backend.

---

### Princípios de Design (SOLID)

Os princípios SOLID são um conjunto de diretrizes que ajudam a construir um código mais compreensível, flexível e de fácil manutenção. O código fornecido demonstra a aplicação de alguns desses princípios.

* **Princípio da Responsabilidade Única (Single Responsibility Principle - SRP):** Uma classe deve ter apenas uma razão para mudar. No código, cada **classe de serviço** possui uma única responsabilidade, lidando com uma operação de negócio específica. Por exemplo, a `CreateAnimalService` é responsável apenas pela lógica de criação de um animal, enquanto a `AnimalRepository` se responsabiliza exclusivamente pela persistência de dados.

    **Exemplo:**

    A classe `CreateAnimalService` exemplifica bem o SRP ao focar unicamente em sua tarefa.

    ```javascript
    // A classe se concentra apenas na criação de um animal
    export class CreateAnimalService {
      constructor(
        private readonly animalRepository: AnimalRepository,
        private readonly animalImageRepository: AnimalImageRepository,
      ) {}

      async execute(
        params: CreateAnimalDTO.Params,
      ): Promise<CreateAnimalDTO.Result> {
        // ...lógica de criação
      }
    }
    ```

* **Princípio da Inversão de Dependência (Dependency Inversion Principle - DIP):** Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
*  As classes de serviço (alto nível) não criam instâncias diretas dos repositórios (baixo nível). Em vez disso, elas dependem de **abstrações** (`AnimalRepository` e `AnimalImageRepository`) que são passadas via construtor, o que desacopla o código.

    **Exemplo:**

    O construtor da `CreateAnimalService` não depende de uma implementação concreta (como uma classe `PrismaAnimalRepository`), mas sim da abstração `AnimalRepository`.

    ```javascript
    // A classe de serviço depende da abstração (AnimalRepository), não da implementação
    export class CreateAnimalService {
      constructor(
        private readonly animalRepository: AnimalRepository, // Dependência injetada
        private readonly animalImageRepository: AnimalImageRepository, // Dependência injetada
      ) {}
      // ...
    }
    ```

---

### Padrões de Projeto

A arquitetura do projeto utiliza padrões que tornam o código mais coeso e de fácil manutenção.

* **Dependency Injection (Injeção de Dependência):** Este padrão é uma implementação do DIP. Ele consiste em fornecer as dependências de um objeto por meio de seu construtor, em vez de a própria classe criá-las internamente. Isso facilita a substituição de dependências para testes e flexibiliza o código.

* **Singleton:** Este padrão de criação garante que uma classe tenha apenas uma única instância em toda a aplicação. No código, isso é aplicado na criação das instâncias de serviço que são exportadas.

    **Exemplo:**

    As linhas de código abaixo criam uma única instância de `CreateAnimalService` e a exportam para ser utilizada em qualquer parte da aplicação, garantindo que não sejam criadas múltiplas instâncias da mesma classe.

    ```javascript
    // Criação e exportação de uma única instância do serviço
    export const createAnimalServiceInstance = new CreateAnimalService(
      animalRepositoryInstance,
      animalImageRepositoryInstance,
    )
    ```
