export class User {
  constructor(public id: string,
              /**
               * Идентификатор пользователя в VK
               */
              public vkId: number
  ) {
  }
}
