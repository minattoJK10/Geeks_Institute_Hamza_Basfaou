class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of "${this.title}"!`);
  }
}

// Two instances
const video1 = new Video("Learn JavaScript Basics", "Hamza", 300);
video1.watch();

const video2 = new Video("Mastering CSS Grid", "Ali", 600);
video2.watch();

// Bonus: Array of 5 videos
const videoData = [
  { title: "React Tutorial", uploader: "John", time: 1200 },
  { title: "Node.js Crash Course", uploader: "Sarah", time: 1500 },
  { title: "CSS Flexbox Deep Dive", uploader: "Lily", time: 800 },
  { title: "Python for Beginners", uploader: "Ahmed", time: 2000 },
  { title: "Git & GitHub Basics", uploader: "Sami", time: 900 },
];

const videoInstances = videoData.map(data => new Video(data.title, data.uploader, data.time));
videoInstances.forEach(video => video.watch());
