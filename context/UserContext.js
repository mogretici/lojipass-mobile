import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    dateOfBirth: "",
    email: "",
    identificationNumber: "",
    name: "",
    sex: "",
  });
  const [token, setToken] = useState();
  const [ticketRoute, setTicketRoute] = useState();
  const [ticketDetail, setTicketDetail] = useState();
  const [ticket, setTicket] = useState();
  const [cacheUser, setCacheUser] = useState();

  const setUserInformation = (user) => {
    setToken(user.token);
    setUser(user.user);
  };

  const createCacheUser = (user) => {
    setCacheUser(user);
  };

  const createTicketRoute = ({ from, to, date }) => {
    setTicketRoute({ user, from, to, date });
  };
  const createTicketDetail = ({ time, company, price, fullSeats }) => {
    setTicketDetail({ time, company, price, fullSeats });
  };
  const createFullTicket = ({ price, seats }) => {
    setTicket({
      ticketRoute,
      ticketDetail,
      price,
      seats,
    });
  };

  const values = {
    user,
    cacheUser,
    token,
    ticket,
    ticketRoute,
    ticketDetail,
    setUserInformation,
    createCacheUser,
    createTicketRoute,
    createTicketDetail,
    createFullTicket,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
