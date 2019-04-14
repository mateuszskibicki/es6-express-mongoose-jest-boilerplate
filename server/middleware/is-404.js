import { APIerror } from '../helpers/API-responses';

export default (req, res, next) => {
  return res.status(404).json(APIerror(404, { msg: "404, route doesn't exist." }));
};
