import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  
  links: [
    {
      type: { type: String },
      url: { type: String}
    }
  ],

  education: [
    {
      university: { type: String},
      degree: { type: String},
      gpa: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String }
    }
  ],

  experience: [
    {
      company: { type: String},
      role: { type: String},
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      description: { type: String }
    }
  ],

  projects: [
    {
      name: { type: String},
      liveLink: { type: String },
      repoLink: { type: String },
      techStack: { type: String },
      description: { type: String }
    }
  ],

  skills: {
    ProgrammingLanguages: { type: String },
    CoreCompetencies: { type: String },
    Frameworks: { type: String },
    TechStack: { type: String },
    DeveloperTools: { type: String },
    AdditionalSkills: { type: String }
  },

  honors: [{ type: String }],

  template: { type: String} // Template selection (1,2,3)
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
