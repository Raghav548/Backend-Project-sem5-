import React,{useState} from 'react'
import './DutyLeave.css'


const DutyLeave = () => {
    const [formData, setFormData] = useState({
        name: "",
        rollNumber: "",
        department: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert("Duty Leave Applied !");
        console.log("Form Data Submitted:", formData);
        setFormData({
          name: "",
          rollNumber: "",
          department: "",
          startDate: "",
          endDate: "",
          reason: "",
        });
      };
    
  return (
    <>

    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Roll Number:</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Reason:</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Apply</button>
    </form>
    </>
  )
}

export default DutyLeave
