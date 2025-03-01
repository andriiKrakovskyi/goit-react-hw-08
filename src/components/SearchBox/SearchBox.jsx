import s from './SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/Filters/sliceFilters.js';

export default function SearchBox() {
  const dispatch = useDispatch();

  const handleChangeFilter = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    dispatch(changeFilter(value));
    // evt.target.reset();
  };

  return (
    <section className={s.searchBox_section}>
      <label className={s.searchBox_label}>
        <span>Find contacts by name</span>

        <input
          className={s.searchBox_input}
          type="text"
          name="search"
          onChange={handleChangeFilter}
        />
      </label>
    </section>
  );
}
