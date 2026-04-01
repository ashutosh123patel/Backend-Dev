// normal callback function
/*const greet=()=>{
    console.log("Good morning");
}

function fun (cb){
console.log("This is the fun function");
cb()
}

fun(greet)

fun(()=>{
console.log("morning");
})*/


/*const mongoose =  require("mongoose");
 mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    age:{
        type:Number,
        required: true,
        min :[18,"age must be greater then or equal to 18"]
    },
    email:{
        type:String
    }
})

// creating the modal
const Student = mongoose.model("Student", studentSchema);
console.log("File is running");

// Function to create a student
async function createStudent(name, age, email) {
    try {
        const student = new Student({
            name,
            age,
            email
        });
        const savedStudent = await student.save();
        console.log("Student created successfully:", savedStudent);
        return savedStudent;
    } catch (error) {
        console.log("Error creating student:", error.message);
        throw error;
    }
}

// Export the function
module.exports = createStudent;*/

const mongoose = require("mongoose");

console.log("File is running");

mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true   // removed min restriction
  },
  email: {
    type: String
  }
});

const Student = mongoose.model("Student", studentSchema);

async function createStudent(name, age, email) {
  try {
    const student = new Student({
      name,
      age,
      email
    });
    const savedStudent = await student.save();
    console.log("Student created:", savedStudent.name, savedStudent.age);
    return savedStudent;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

async function getAdults() {
  const students = await Student.find({ age: { $gte: 18 } });
  console.log("\nStudents age 18+:");
  students.forEach(s => {
    console.log(`${s.name} (${s.age})`);
  });
}

async function run() {
  await createStudent("Ashutosh", 20, "ashu@gmail.com");
  await createStudent("Ravi", 15, "ravi@gmail.com");
  await createStudent("Aman", 22, "aman@gmail.com");
  await createStudent("Neha", 10, "neha@gmail.com");
  await createStudent("preeti", 26, "preeti@gmail.com");
  await getAdults();

  mongoose.connection.close();
}

run();
