// Workout plans data
const workoutPlans = {
  beginner: [
    '1. Walk 10,000 steps a day',
    '2. 30 minutes of bodyweight exercises (e.g., squats, push-ups) 3 times a week',
    '3. Stretching for 10 minutes daily',
    '4. Rest days: 2 days a week',
  ],
  intermediate: [
    '1. 5 days of mixed cardio and strength training',
    '2. At least 45 minutes of activity per session',
    '3. Include 2 days of focused strength training (e.g., lifting weights)',
    '4. Active recovery: Yoga or light cardio on rest days',
  ],
  advanced: [
    '1. 6 days of intense training',
    '2. Include HIIT (High-Intensity Interval Training) 3 times a week',
    '3. Strength training: 4 days a week with varied routines',
    '4. Flexibility exercises for 15 minutes post-workout',
    '5. Target 1-2 hours of training daily',
  ],
};

// Function to display workout plans dynamically
function displayWorkoutPlans(level) {
  const workoutList = document.getElementById('workout-plan-list');
  workoutList.innerHTML = ''; // Clear previous workout plans

  const plans = workoutPlans[level];
  plans.forEach(plan => {
    const listItem = document.createElement('li');
    listItem.textContent = plan;
    workoutList.appendChild(listItem);
  });
}

// Event listener for fitness level radio button changes
document.querySelectorAll('input[name="fitness-level"]').forEach(radio => {
  radio.addEventListener('change', function () {
    const selectedLevel = this.value;
    displayWorkoutPlans(selectedLevel); // Display the selected workout plan
  });
});

// Display default workout plan on page load (Beginner)
window.onload = function () {
  displayWorkoutPlans('beginner');
};

// Button to generate workout plan
const generateButton = document.getElementById('generate-workout-plan');
generateButton.addEventListener('click', function () {
  const selectedLevel = document.querySelector('input[name="fitness-level"]:checked').value;

  // Get the workout plan for the selected fitness level
  const selectedWorkoutPlan = workoutPlans[selectedLevel].join('\n'); // Join array elements with a newline for display

  // Show an alert with the selected workout plan
  alert(`Workout Plan for ${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}:\n\n${selectedWorkoutPlan}`);
});


// Add event listener for form submission
document.getElementById('activity-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const steps = parseInt(document.getElementById('steps').value);
  const calories = parseInt(document.getElementById('calories').value);
  const distance = parseFloat(document.getElementById('distance').value);

  // Update the statistics and the chart
  updateStatsAndChart(steps, calories, distance);

  // Clear form inputs
  document.getElementById('steps').value = '';
  document.getElementById('calories').value = '';
  document.getElementById('distance').value = '';
});

// Initialize statistics
let totalSteps = 0;
let totalCalories = 0;
let totalDistance = 0;

// Function to update the stats and the chart
function updateStatsAndChart(steps, calories, distance) {
  totalSteps += steps;
  totalCalories += calories;
  totalDistance += distance;

  // Update the chart with new data
  addDataToChart(steps, calories, distance);
}

// Sample data for the chart (initially set to zeros for steps, calories, and distance)
const weeklyStatsData = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Steps',
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(60, 145, 230, 0.2)',
      borderColor: 'rgba(60, 145, 230, 1)',
      borderWidth: 2,
      fill: true
    },
    {
      label: 'Calories Burned',
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(250, 99, 132, 0.2)',
      borderColor: 'rgba(250, 99, 132, 1)',
      borderWidth: 2,
      fill: true
    },
    {
      label: 'Distance (km)',
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: true
    }
  ]
};

// Chart configuration
const config = {
  type: 'line',
  data: weeklyStatsData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// Global chart variable
let weeklyStatsChart;

// Render the chart when the page loads
window.onload = function () {
  const ctx = document.getElementById('weeklyStatsChart').getContext('2d');
  weeklyStatsChart = new Chart(ctx, config);
};

// Function to update chart with new data based on the current day of the week
function addDataToChart(steps, calories, distance) {
  // Get current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayIndex = new Date().getDay(); 

  // Accumulate (add) the new values to the existing data for the current day
  weeklyStatsData.datasets[0].data[dayIndex] += steps; // Steps
  weeklyStatsData.datasets[1].data[dayIndex] += calories; // Calories
  weeklyStatsData.datasets[2].data[dayIndex] += distance; // Distance

  // Refresh the chart to reflect the new data
  weeklyStatsChart.update();
}




