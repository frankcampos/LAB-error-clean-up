import renderToDOM from '../utils/sample_data/renderToDom';
import { houses, students } from '../utils/sample_data/data';
import studentsOnDom from './studentsOnDom';

const form = () => {
  const domString = `<form id="sorting" class="d-flex flex-column form-floating ">
    <input
    type="text"
    class="form-control mb-1"
    id="student-name"
    placeholder="Enter a name"
    required
  />
  <label for="floatingInputValue">Name to be sorted</label>
<button type="submit" class="btn btn-success">Get Sorted!</button>
</form>`;

  renderToDOM('#form-container', domString);
  const createId = (array) => {
    if (array.length) {
      const idArray = array.map((el) => el.id);
      return Math.max(...idArray) + 1;
    }
    return 0;
  };
  const sortStudent = (e) => {
    e.preventDefault();
    const sortingHat = houses[Math.floor(Math.random() * houses.length)];
    if (e.target.id === 'sorting') {
      const student = document.querySelector('#student-name');
      // create the new student object
      students.push({
        id: createId(students),
        name: student.value,
        house: sortingHat.house,
        crest: sortingHat.crest,
      });
      student.value = ''; // reset value of input
      studentsOnDom('#students', students);
    }
  };
  // has to be put on the DOM after form is on DOM, not before
  // on form submit, sort student
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

export default form;
