import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/moviesSlices";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
const MoviesFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.movies.filter);
  return (
    <Form.Control
      type="text"
      placeholder="Search..."
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};

export default MoviesFilter;
