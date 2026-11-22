package org.example.studentmanagement.Service;

import org.example.studentmanagement.Entity.Student;
import org.example.studentmanagement.Repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Constructor
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));
    }

    // Add student
    public Student addStudent(Student student) {

        validateStudent(student);

        return studentRepository.save(student);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent =
                getStudentById(id);

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setAge(student.getAge());
        existingStudent.setMarks(student.getMarks());

        validateStudent(existingStudent);

        return studentRepository.save(existingStudent);
    }

    // Delete student
    public void deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {

            throw new RuntimeException("Student not found");
        }

        studentRepository.deleteById(id);
    }

    // Search student
    public List<Student> searchStudents(String name) {

        return studentRepository
                .findByNameContainingIgnoreCase(name);
    }

    // Filter by department
    public List<Student> getStudentsByDepartment(
            String department) {

        return studentRepository
                .findByDepartmentIgnoreCase(department);
    }

    // Validate student
    private void validateStudent(Student student) {

        if (student.getName() == null ||
                student.getName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Student name is required");
        }

        if (student.getAge() < 16 ||
                student.getAge() > 100) {

            throw new IllegalArgumentException(
                    "Age must be between 16 and 100");
        }

        if (student.getMarks() < 0 ||
                student.getMarks() > 100) {

            throw new IllegalArgumentException(
                    "Marks must be between 0 and 100");
        }
    }
}