# fo start

### you need to specify the server address in the client constants 
### and fill in the .env in the server folder
### using an .env.example as a sample

### in dicker
> docker compose up -d

### or localhost
in file server/.env 
change POSTGRES_HOST to POSTGRES_HOST=localhost

run database
> docker-compose up -d postgres

run frontend
> npm run dev:client

run server
> npm run dev:server

### List of websocket commands (requests/responses) and their syntax (<- - cmd from frontend, -> - answer):

type Comment = {
  id: string;
  text: string;
  parentId: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
  image?: {
    id: string;
    path: string;
    name: string;
  };
  file?: {
    id: string;
    path: string;
    name: string;
  };
  comments: Comment[];
};

- captcha:get:

  ```
  <-:
    {
      data: string
    }
  
  ->:
    {
      data: svg
    }
  ```

- comments:get:

  ```
  <-:
    {
      page: number,
      pageSize: number,
      sort: {
        name: SortDirection | null,
        email: SortDirection | null,
        createdAt: SortDirection | null,
      }
    }
  
  ->:
    { 
      comments: Comment [], 
      total: number 
    }
  ```

- comment:post

  ```
  <-:
    {
      data: {
        name: string;
        email: string;
        homePage?: string | undefined;
        text: string;
        image?: File | null | undefined;
        file?: string | ArrayBuffer | null | undefined;
        captcha: string;
        parentId: string | null;
      }
    }
  
  ->:
    {
      id: string;
      text: string;
      userId: string;
      parentId: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ```

- comment:id

  ```
  <-:
    {
      id: uuid
    }
  
  ->: Comment
  ```
  dckr_pat_No4TbSx9ztCHx18u5WVyZ1d5ceo

■ Docker
https://hub.docker.com/r/ledich/spa-dzencode-frontend
https://hub.docker.com/r/ledich/spa-dzencode-backend



