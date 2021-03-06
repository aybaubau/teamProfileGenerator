const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const addNew = [{
    type: 'list',
    name: 'addNew',
    message: 'Would you like to add a new employee?',
    choices: ['Yes', 'No']
}];

const employeeType = [{
    type: 'list',
    name: 'employeeType',
    message: 'Please select the type of employee you would like to add.',
    choices: ['Manager', 'Engineer', 'Intern']
}];

const managerQuestions = [{
    type: 'input',
    name: 'name',
    message: "What is the employee's name?"
},
{
    type: 'input',
    name: 'email',
    message: "What is the employee's email address?"
},
{
    type: 'input',
    name: 'officeNumber',
    message: "What is the manager's office number?"
}];

const engineerQuestions = [{
    type: 'input',
    name: 'name',
    message: "What is the employee's name?"
},
{
    type: 'input',
    name: 'email',
    message: "What is the employee's email address?"
},
{
    type: 'input',
    name: 'github',
    message: "What is the engineer's github username?"
}];

const internQuestions = [{
    type: 'input',
    name: 'name',
    message: "What is the employee's name?"
},
{
    type: 'input',
    name: 'email',
    message: "What is the employee's email address?"
},
{
    type: 'input',
    name: 'school',
    message: "What is the intern's school?"
}];

function init() {
    inquirer
        .prompt(addNew)
        .then(answer => {
            if (answer.addNew === 'Yes') {
                inquirer
                    .prompt(employeeType)
                    .then(answer => {
                        if (answer.employeeType === 'Manager') {
                            inquirer
                                .prompt(managerQuestions)
                                .then(answers => {
                                    const manager = new Manager(answers.name, employees.length + 1, answers.email, answers.officeNumber);
                                    employees.push(manager);
                                    init();
                                })
                        } else if (answer.employeeType === 'Engineer') {
                            inquirer
                                .prompt(engineerQuestions)
                                .then(answers => {
                                    const engineer = new Engineer(answers.name, employees.length + 1, answers.email, answers.github);
                                    employees.push(engineer);
                                    init();
                                })
                        } else if (answer.employeeType === 'Intern') {
                            inquirer
                                .prompt(internQuestions)
                                .then(answers => {
                                    const intern = new Intern(answers.name, employees.length + 1, answers.email, answers.school);
                                    employees.push(intern);
                                    init();
                                })

                        }
                    })
            } else {
                renderHTML(employees);
            }
        })
};

function renderHTML(employees) {
    const output = render(employees);
    fs.writeFile(outputPath, output, (err) => {
        if (err) throw err;
        console.log('Your employee page has been generated!');
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


init();