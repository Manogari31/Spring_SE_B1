package org.example.studentmanagement.Controller;

import org.example.studentmanagement.Entity.Student;
import org.example.studentmanagement.Service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get student by ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Add student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    // Update student
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully";
    }

    // Search student by name
    @GetMapping("/search")
    public List<Student> searchStudents(
            @RequestParam String name) {

        return studentService.searchStudents(name);
    }

    // Filter by department
    @GetMapping("/department/{department}")
    public List<Student> getStudentsByDepartment(
            @PathVariable String department) {

        return studentService.getStudentsByDepartment(department);
    }
}