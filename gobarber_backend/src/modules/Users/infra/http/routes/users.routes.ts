import { Router } from 'express';
import multer from 'multer';

import ensureAuth from '@modules/Users/infra/middlewares/ensureAuth';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    ensureAuth,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
