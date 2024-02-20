import "./App.scss";
import { Container, Paper } from "@mui/material";
import CommentsTable from "./components/CommentsTable";
import CommentForm from "./components/CommentForm";
import { useState } from "react";
import { useSockets } from "./hooks/useSockets";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { comments, log, actions } = useSockets();
  const mockData = [
    {
      id: '1',
      text: "Отличный пост!",
      user: {
        name: "Иван Иванов",
        email: "ivan@example.com",
      },
      createdAt: new Date("2024-02-17T08:30:00"),
      comments: [
        {
          id: '2',
          text: "Спасибо за информацию!",
          user: {
            name: "Анна Петрова",
            email: "anna@example.com",
          },
          createdAt: new Date("2024-02-16T15:45:00"),
          comments: [
            {
              id: '5',
              text: "Очень интересно!",
              user: {
                name: "Дмитрий Васильев",
                email: "dmitry@example.com",
              },
              createdAt: new Date("2024-02-13T12:00:00"),
              comments: [
                {
                  id: '7',
                  text: "Спасибо за разъяснение!",
                  user: {
                    name: "Алексей Морозов",
                    email: "alex@example.com",
                  },
                  createdAt: new Date("2024-02-11T17:45:00"),
                  comments: [
                    {
                      id: '14',
                      text: "Это то, что я искал!",
                      user: {
                        name: "Евгения Ковалева",
                        email: "evgeniya@example.com",
                      },
                      createdAt: new Date("2024-02-04T07:30:00"),
                      comments: [],
                    },
                    {
                      id: '15',
                      text: "Отличная работа!",
                      user: {
                        name: "Владимир Федоров",
                        email: "vladimir@example.com",
                      },
                      createdAt: new Date("2024-02-03T14:15:00"),
                      comments: [],
                    },
                    {
                      id: '16',
                      text: "Спасибо за информацию!",
                      user: {
                        name: "Андрей Павлов",
                        email: "andrey@example.com",
                      },
                      createdAt: new Date("2024-02-02T11:20:00"),
                      comments: [],
                    },
                  ],
                },
                {
                  id: '8',
                  text: "Жду продолжения!",
                  user: {
                    name: "Наталья Крылова",
                    email: "natalya@example.com",
                  },
                  createdAt: new Date("2024-02-10T14:20:00"),
                  comments: [],
                },
                {
                  id: '9',
                  text: "Спасибо, полезно!",
                  user: {
                    name: "Артем Беляков",
                    email: "artem@example.com",
                  },
                  createdAt: new Date("2024-02-09T11:00:00"),
                  comments: [],
                },
              ],
            },
            {
              id: '6',
              text: "Мне не понравилось...",
              user: {
                name: "Светлана Николаева",
                email: "svetlana@example.com",
              },
              createdAt: new Date("2024-02-12T09:30:00"),
              comments: [],
            },
          ],
        },
        {
          id: '3',
          text: "Полностью согласен!",
          user: {
            name: "Петр Сидоров",
            email: "peter@example.com",
          },
          createdAt: new Date("2024-02-15T10:15:00"),
          comments: [
            {
              id: '17',
              text: "Мне не понравилось...",
              user: {
                name: "Елена Макарова",
                email: "elena2@example.com",
              },
              createdAt: new Date("2024-02-01T09:45:00"),
              comments: [],
            },
            {
              id: '18',
              text: "Очень интересно, спасибо!",
              user: {
                name: "Денис Козырев",
                email: "denis@example.com",
              },
              createdAt: new Date("2024-01-31T16:10:00"),
              comments: [
                {
                  id: '24',
                  text: "Спасибо за разъяснение!",
                  user: {
                    name: "Ангелина Сидорова",
                    email: "angelina@example.com",
                  },
                  createdAt: new Date("2024-01-25T08:45:00"),
                  comments: [],
                },
                {
                  id: '25',
                  text: "Это то, что мне нужно!",
                  user: {
                    name: "Роман Крылов",
                    email: "roman@example.com",
                  },
                  createdAt: new Date("2024-01-24T16:30:00"),
                  comments: [],
                },
                {
                  id: '26',
                  text: "Спасибо, интересно!",
                  user: {
                    name: "Екатерина Морозова",
                    email: "ekaterina@example.com",
                  },
                  createdAt: new Date("2024-01-23T13:20:00"),
                  comments: [],
                },
              ],
            },
            {
              id: '19',
              text: "Спасибо, поделились полезной информацией!",
              user: {
                name: "Олеся Новикова",
                email: "olesya@example.com",
              },
              createdAt: new Date("2024-01-30T13:25:00"),
              comments: [],
            },
          ],
        },
        {
          id: '4',
          text: "Отличный контент!",
          user: {
            name: "Елена Козлова",
            email: "elena@example.com",
          },
          createdAt: new Date("2024-02-14T18:20:00"),
          comments: [
            {
              id: '10',
              text: "Вау, отличная статья!",
              user: {
                name: "Ольга Лебедева",
                email: "olga@example.com",
              },
              createdAt: new Date("2024-02-08T08:45:00"),
              comments: [
                {
                  id: '12',
                  text: "Полностью согласен с автором!",
                  user: {
                    name: "Татьяна Иванова",
                    email: "tatiana@example.com",
                  },
                  createdAt: new Date("2024-02-06T13:20:00"),
                  comments: [
                    {
                      id: '20',
                      text: "С нетерпением жду новых статей!",
                      user: {
                        name: "Ирина Ларина",
                        email: "irina@example.com",
                      },
                      createdAt: new Date("2024-01-29T10:30:00"),
                      comments: [],
                    },
                    {
                      id: '21',
                      text: "Отличный контент!",
                      user: {
                        name: "Сергей Семенов",
                        email: "sergey@example.com",
                      },
                      createdAt: new Date("2024-01-28T17:15:00"),
                      comments: [],
                    },
                    {
                      id: '22',
                      text: "Спасибо за информацию!",
                      user: {
                        name: "Александра Попова",
                        email: "alexandra@example.com",
                      },
                      createdAt: new Date("2024-01-27T14:20:00"),
                      comments: [],
                    },
                    {
                      id: '23',
                      text: "Все понятно, спасибо!",
                      user: {
                        name: "Павел Васильев",
                        email: "pavel@example.com",
                      },
                      createdAt: new Date("2024-01-26T11:30:00"),
                      comments: [],
                    },
                  ],
                },
                {
                  id: '13',
                  text: "Жду новых публикаций!",
                  user: {
                    name: "Игорь Смирнов",
                    email: "igor@example.com",
                  },
                  createdAt: new Date("2024-02-05T10:10:00"),
                  comments: [],
                },
              ],
            },
            {
              id: '11',
              text: "Спасибо, почерпнул новое!",
              user: {
                name: "Михаил Громов",
                email: "mikhail@example.com",
              },
              createdAt: new Date("2024-02-07T16:30:00"),
              comments: [],
            },
          ],
        },
      ],
    },
    {
      id: '27',
      text: "С нетерпением жду продолжения!",
      user: {
        name: "Глеб Федотов",
        email: "gleb@example.com",
      },
      createdAt: new Date("2024-01-22T10:10:00"),
      comments: [],
    },
    {
      id: '28',
      text: "Мне понравилось, спасибо!",
      user: {
        name: "София Андреева",
        email: "sofia@example.com",
      },
      createdAt: new Date("2024-01-21T07:45:00"),
      comments: [
        {
          id: '30',
          text: "Спасибо за публикацию!",
          user: {
            name: "Виктория Степанова",
            email: "viktoria@example.com",
          },
          createdAt: new Date("2024-01-19T12:10:00"),
          comments: [],
        },
      ],
    },
    {
      id: '29',
      text: "Отлично написано!",
      user: {
        name: "Даниил Воронов",
        email: "daniil@example.com",
      },
      createdAt: new Date("2024-01-20T15:20:00"),
      comments: [],
    },
  ];

  const handleModal = () => {
    setOpenModal((value) => !value);
  };

  return (
    <Container>
      <Paper>
        <CommentForm isOpen={openModal} handleModal={handleModal} />
        <CommentsTable comments={mockData} handleModal={handleModal} />
      </Paper>
    </Container>
  );
}

export default App;
