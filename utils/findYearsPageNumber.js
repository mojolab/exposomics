import { BASE_YEAR, YEARS_PER_PAGE } from './getYearsPage';
import prepareMoment from './prepareMoment';

export default date =>
  Math.floor((prepareMoment(date).year() - BASE_YEAR) / YEARS_PER_PAGE) + 1;
