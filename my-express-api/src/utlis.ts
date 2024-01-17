import {NextFunction, Request, Response} from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`)
  next()
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: err.message,
  })
}

export {loggerMiddleware, errorHandler}