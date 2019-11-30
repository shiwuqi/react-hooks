import * as React from 'react';
const { useState, useContext, createContext } = React;

interface UserType {
  name: string;
  age: number;
  email: string;
}
const UserContext = createContext({});

const LevelFive = () => {
  const { user, setUser } = useContext(UserContext) as {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<{
      name: string;
      age: number;
      email: string;
    }>>;
  };

  return (
    <div>
      <h5>姓名：{user.name}</h5>
      <h5>年龄：{user.age}</h5>
      <h5>email：{user.email}</h5>
      <button
        onClick={() => {
          setUser(Object.assign({}, user, { age: user.age + 1 }));
        }}
      >
        add age
      </button>
    </div>
  );
};

const LevelFour = () => (
  <div>
    <h4>fourth level</h4>
    <LevelFive />
  </div>
);

const LevelThree = () => (
  <div>
    <h3>third level</h3>
    <LevelFour />
  </div>
);

const LevelTwo = () => (
  <div>
    <h2>second level</h2>
    <LevelThree />
  </div>
);

const UseContext = () => {
  const [user, setUser] = useState({
    name: '张三',
    age: 17,
    email: '123456@qq.com'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <h1>first level</h1>
      <LevelTwo />
    </UserContext.Provider>
  );
};

export default UseContext;