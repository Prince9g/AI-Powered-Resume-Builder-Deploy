import Resume from '../models/resume.model.js'

// Create Resume
export const createResume = async (req, res) => {
  try {
    const resume = new Resume({ ...req.body, user: req.user });
    await resume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get User Resume
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user }); // Fetch all resumes
    if (resumes.length === 0) {
      return res.status(404).json({ success: false, message: "No resumes found" });
    }
    res.json({ success: true, resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Update Resume
export const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findOne({ user: req.user });
    if (!resume) return res.status(404).json({ sucess: false, message: "Resume not found" });

    resume = await Resume.findOneAndUpdate({ user: req.user }, req.body, { new: true });
    res.json(resume);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    await Resume.findOneAndDelete({ user: req.user });
    res.json({ success:true, message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
