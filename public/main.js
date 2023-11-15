import '../styles/main.scss'; // You have to import your styles for them to work. Comment in this line
import htmlStructure from './htmlStructure';
import studentAreas from '../components/studentAreas';
import form from '../components/form';
import { students, voldysArmy } from '../utils/sample_data/data';
import studentsOnDom from '../components/studentsOnDom';
import header from '../components/header';
import startSortingBtn from '../components/startSortingBtn';
import filterBtnRow from '../components/filterBtnRow';

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });

  // target expel buttons to move to voldys army
  document
    .querySelector('#student-container')
    .addEventListener('click', (e) => {
      if (e.target.id.includes('expel')) {
        const [, id] = e.target.id.split('--');
        const index = students.findIndex(
          (student) => student.id === Number(id)
        );

        // move from one array to another
        voldysArmy.push(...students.splice(index, 1));
        // get both sets of students on the DOM
        studentsOnDom('#students', students);
        studentsOnDom('#voldy', voldysArmy);
      }
    });

  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      const [, house] = e.target.id.split('--');

      if (house === 'all') {
        studentsOnDom('#students', students);
      } else if (house) {
        const filter = students.filter((student) => student.house === house);
        studentsOnDom('#students', filter, house);
      }
    }
  });
};
const startApp = () => {
  htmlStructure(); // always load first
  header();
  startSortingBtn();
  events(); // always load last
};

// ********** HTML Components  ********** //
// the basic HMTL structure of app

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array
// Create a new ID for the students
// add form to DOM on start-sorting click.
// Add events for form after the form is on the DOM
startApp();
