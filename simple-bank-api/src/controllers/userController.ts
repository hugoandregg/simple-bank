import { Request, Response } from "express";
import { getRepository, getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export const listAll = async (req: Request, res: Response) => {
  //Get users from database
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ["id", "username", "role"], //We dont want to send the passwords on response
  });

  //Send the users object
  res.send(users);
};

export const getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"], //We dont want to send the password on response
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

export const newUser = async (req: Request, res: Response) => {
  //Get parameters from the body
  let { username, password, role } = req.body;
  let user = new User();
  user.username = username;
  user.password = password;
  user.role = role.toUpperCase();

  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use
  const userRepository = getCustomRepository(UserRepository);
  try {
    await userRepository.saveUserWithAccount(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  res.location(`${process.env.BASE_URL}/account/balance`);
  res.status(201).json(user);
};

export const editUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = res.locals.jwtPayload.userId;

  //Get values from the body
  const { username, role } = req.body;

  //Try to find user on database
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  user.username = username;
  user.role = role;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means username already in use
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

export const myProfile = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"], //We dont want to send the password on response
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
