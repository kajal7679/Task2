import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Define the Feedback interface
interface Feedback {
  studentName: string;
  batchNumber: number | null;
  feedbackText: string;
  rating: number;  // Added rating field
  gender: string; // Added gender field
  dateOfBirth: Date | null; // Added date of birth field
  age: number | null; // Added age field
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task2';

  // Feedback object initialized with empty values
 feedback: Feedback = {
  studentName: '',
  batchNumber: null,
  feedbackText: '',
  rating: 3 ,// Default rating
  gender: 'other', // Default gender
  dateOfBirth: null,
  age: null
};

// Array to store submitted feedback entries
submittedFeedback: Feedback[] = [];

// For handling edit operations
currentIndex: number | null = null;

// Search text for filtering
searchText: string = '';

// Form submission handler
onSubmit() {
  if (this.currentIndex !== null) {
    this.submittedFeedback[this.currentIndex] = { ...this.feedback };
    this.currentIndex = null;
  } else {
    this.submittedFeedback.push({ ...this.feedback });
  }

  // Reset the form after submission
  this.resetForm();
}

// Edit the feedback entry
editFeedback(index: number) {
  this.feedback = { ...this.submittedFeedback[index] };
  this.currentIndex = index;
}

// Delete the feedback entry
deleteFeedback(index: number) {
  this.submittedFeedback.splice(index, 1);
}

// Calculate age based on the selected date of birth
calculateAge() {
  if (this.feedback.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.feedback.dateOfBirth);
    this.feedback.age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      this.feedback.age--;
    }
  }
}

// Reset the form to its initial state
resetForm() {
  this.feedback = {
    studentName: '',
    batchNumber: null,
    feedbackText: '',
    rating: 3,
    gender: 'other',
    dateOfBirth: null,
    age: null
  };
  this.currentIndex = null;
}

}