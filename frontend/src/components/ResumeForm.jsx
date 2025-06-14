import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { PiBagSimpleLight } from "react-icons/pi";
import { PiHandCoinsLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const ResumeForm = ({formData, setFormData}) => {

  const [openSections, setOpenSections] = useState({
    personal: false,
    education: false,
    experience: false,
    projects: false,
    skills: false,
    honors: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section) {
      if (section === "honors") {
        const updatedHonors = [...formData.honors];
        updatedHonors[index] = value;
        setFormData({ ...formData, honors: updatedHonors });
      } else {
        const updatedSection = [...formData[section]];
        updatedSection[index][name] = value;
        setFormData({ ...formData, [section]: updatedSection });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddLink = () => {
    if (formData.links.length < 5) {
      setFormData({
        ...formData,
        links: [...formData.links, { type: "", url: "" }]
      });
    }
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { university: "", degree: "", gpa: "", location: "", startDate: "", endDate: "" }]
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", role: "", location: "", startDate: "", endDate: "", description: "" }]
    });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: "", liveLink: "", repoLink: "", techStack: "", description: "" }]
    });
  };

  const handleAddHonors = () => {
    setFormData({
      ...formData,
      honors: [...formData.honors, ""]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/resume', 
        formData, {withCredentials: true},
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setFormData({
      name: "",
    email: "",
    phone: "",
    address: "",
    links: [{ type: "", url: "" }],
    education: [
      {
        university: "",
        degree: "",
        gpa: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ],
    experience: [
      {
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    projects: [
      { name: "", liveLink: "", repoLink: "", techStack: "", description: "" },
    ],
    skills: [
      {
        ProgrammingLanguages: "",
        CoreCompetencies: "",
        Frameworks: "",
        TechStack: "",
        DeveloperTools: "",
        AdditionalSkills: "",
      },
    ],
    honors: [""],
    });
    
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 min-h-screen p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Resume Details</h2>
      <div className="border flex flex-col gap-8 p-4 rounded-lg">
        {/* Section 1 - Personal Information */}
        <div className="text-sm">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("personal")}>
            <div className="flex items-center justify-center gap-2">
              <GoPerson className="inline-block rounded-full text-2xl mr-2" />
              <span className="font-serif text-xl">Personal Info</span>
            </div>
            {openSections.personal ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.personal && (
            <div>
              <div>
                <label className="block mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e)} className="w-full p-2 border rounded-lg mb-4" required />
                <div className="flex justify-between items-center gap-4">
                  <div className="w-full">
                    <label className="block mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e)} className="w-full p-2 border rounded-lg mb-4" required />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} className="w-full p-2 border rounded-lg mb-4" required />
                  </div>
                </div>
                <label className="block mb-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={(e) => handleChange(e)} className="w-full p-2 border rounded-lg mb-4" required />
              </div>

              <div>
  <div className="mb-2">
    <span className="text-sm mb-2 font-bold">Links</span>
    <span>({formData.links.length}/5)</span>
  </div>
  {formData.links.map((link, index) => (
    <div key={index} className="flex justify-between items-start gap-4">
      <div className="w-full">
        <input
          type="url"
          name="url"
          value={link.url}
          onChange={(e) => handleChange(e, "links", index)}
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Enter URL"
        />
      </div>
      <div className="w-full">
        <select
          name="type"
          value={link.type}
          onChange={(e) => handleChange(e, "links", index)}
          className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="GitHub">GitHub</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="HackerRank">HackerRank</option>
          <option value="CodeChef">CodeChef</option>
          <option value="LeetCode">LeetCode</option>
          <option value="CodeForces">CodeForces</option>
          <option value="Portfolio">Portfolio</option>
        </select>
      </div>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddLink}
    disabled={formData.links.length >= 5}
    className={`p-2 flex justify-center items-center text-md border border-black rounded-lg w-full ${
      formData.links.length >= 5 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-300"
    } transition-all duration-300`}
  >
    + Add link
  </button>
</div>
            </div>
          )}
        </div>

        {/* Section 2 - Education */}
        <div className="text-sm">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("education")}>
            <div className="flex items-center justify-center gap-2">
              <LiaBookSolid className="inline-block rounded-full text-2xl mr-2" />
              <span className="font-serif text-xl">Education</span>
            </div>
            {openSections.education ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.education && (
            <div>
              {formData.education.map((edu, index) => (
                <div key={index}>
                  <label className="block mb-2">University</label>
                  <input type="text" name="university" value={edu.university} onChange={(e) => handleChange(e, "education", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label className="block mb-2">Degree</label>
                      <input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(e, "education", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">Location</label>
                      <input type="text" name="location" value={edu.location} onChange={(e) => handleChange(e, "education", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                  </div>
                  <div className="flex justify-end items-end gap-4">
                    <div className="w-full">
                      <label className="block mb-2">Scores</label>
                      <select
                        className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Cgpa">CGPA</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <input type="text" name="gpa" value={edu.gpa} onChange={(e) => handleChange(e, "education", index)} className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 gap-4">
                    <div className="w-full">
                      <label className="block mb-2">Start Date</label>
                      <input type="text" name="startDate" value={edu.startDate} onChange={(e) => handleChange(e, "education", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">End Date</label>
                      <input type="text" name="endDate" value={edu.endDate} onChange={(e) => handleChange(e, "education", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddEducation} className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add education</button>
            </div>
          )}
        </div>

        {/* Section 3 - Experience */}
        <div className="text-sm">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("experience")}>
            <div className="flex items-center justify-center gap-2">
              <PiBagSimpleLight className="inline-block rounded-full text-2xl mr-2" />
              <span className="font-serif text-xl">Experience</span>
            </div>
            {openSections.experience ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.experience && (
            <div>
              {formData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label className="block mb-2">Company</label>
                      <input type="text" name="company" value={exp.company} onChange={(e) => handleChange(e, "experience", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">Role</label>
                      <input type="text" name="role" value={exp.role} onChange={(e) => handleChange(e, "experience", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label className="block mb-2">Start Date</label>
                      <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleChange(e, "experience", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">End Date</label>
                      <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleChange(e, "experience", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                  </div>
                  <label className="block mb-2">Location</label>
                  <input type="text" name="location" value={exp.location} onChange={(e) => handleChange(e, "experience", index)} className="w-full p-2 border rounded-lg" />
                  <label className="block mt-2 mb-2">Description</label>
                  <textarea name="description" value={exp.description} onChange={(e) => handleChange(e, "experience", index)} className="w-full p-2 h-24 border rounded-lg mb-4" />
                </div>
              ))}
              <button type="button" onClick={handleAddExperience} className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add Experience</button>
            </div>
          )}
        </div>

        {/* Section 4 - Projects */}
        <div className="text-sm">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("projects")}>
            <div className="flex items-center justify-center gap-2">
              <LuProjector className="inline-block rounded-full text-2xl mr-2" />
              <span className="font-serif text-xl">Projects</span>
            </div>
            {openSections.projects ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.projects && (
            <div>
              {formData.projects.map((project, index) => (
                <div key={index}>
                  <label className="block mb-2">Project Name</label>
                  <input type="text" name="name" value={project.name} onChange={(e) => handleChange(e, "projects", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <label className="block mb-2">Technology Used</label>
                  <input type="text" name="techStack" value={project.techStack} onChange={(e) => handleChange(e, "projects", index)} className="w-full p-2 border rounded mb-4" />
                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label className="block mb-2">Live Link</label>
                      <input type="url" name="liveLink" value={project.liveLink} onChange={(e) => handleChange(e, "projects", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">Repo Link</label>
                      <input type="url" name="repoLink" value={project.repoLink} onChange={(e) => handleChange(e, "projects", index)} className="w-full p-2 border rounded-lg mb-4" />
                    </div>
                  </div>
                  <label className="block mt-2 mb-2">Description</label>
                  <textarea name="description" value={project.description} onChange={(e) => handleChange(e, "projects", index)} className="w-full p-2 h-24 border rounded-lg mb-4" />
                </div>
              ))}
              <button type="button" onClick={handleAddProject} className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add Project</button>
            </div>
          )}
        </div>

        {/* Section 5 - Skills */}
        <div className="text-sm">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("skills")}>
            <div className="flex items-center justify-center gap-2">
              <PiHandCoinsLight className="inline-block rounded-full text-2xl mr-2" />
              <span className="font-serif text-xl">Skills</span>
            </div>
            {openSections.skills ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.skills && (
            <div>
              {formData.skills.map((skill, index) => (
                <div key={index}>
                  <label className="block mb-2">Programming Languages</label>
                  <input type="text" name="ProgrammingLanguages" value={skill.ProgrammingLanguages} onChange={(e) => handleChange(e, "skills", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <label className="block mb-2">Core competencies</label>
                  <input type="text" name="CoreCompetencies" value={skill.CoreCompetencies} onChange={(e) => handleChange(e, "skills", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <label className="block mb-2">Framework/Libraries</label>
                  <input type="text" name="Frameworks" value={skill.Frameworks} onChange={(e) => handleChange(e, "skills", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <label className="block mb-2">Tech Stack</label>
                  <input type="text" name="TechStack" value={skill.TechStack} onChange={(e) => handleChange(e, "skills", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <label className="block mb-2">Developer's Tool</label>
                  <input type="text" name="DeveloperTools" value={skill.DeveloperTools} onChange={(e) => handleChange(e, "skills", index)} className="w-full p-2 border rounded-lg mb-4" />
                  <label className="block mb-2">Additional Skills</label>
                  <input type="text" name="AdditionalSkills" value={skill.AdditionalSkills} onChange={(e) => handleChange(e, "skills", index)} className="w-full p-2 border rounded-lg mb-4" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 6 - Honors & Awards */}
        <div className="text-sm">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("honors")}>
    <div className="flex items-center justify-center gap-2">
      <SlBadge className="inline-block rounded-full text-2xl mr-2" />
      <span className="font-serif text-xl">Additional</span>
    </div>
    {openSections.honors ? <ChevronUp /> : <ChevronDown />}
  </div>
  {openSections.honors && (
    <div>
      {formData.honors.map((honor, index) => (
        <div key={index}>
          <label className="block mb-2">Honor & Award {index + 1}</label>
          <input
            type="text"
            name="honors"
            value={honor}
            onChange={(e) => handleChange(e, "honors", index)}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddHonors}
        className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300"
      >
        + Add Honor
      </button>
    </div>
  )}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Build</button>
      </div>
    </form>
  );
};

export default ResumeForm;