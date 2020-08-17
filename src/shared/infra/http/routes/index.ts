import { Router } from 'express';

import users from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/appointments', appointmentsRouter);

export default routes;