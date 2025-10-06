import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'

const About = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/about`)
      .then(response => {
        setAboutData(response.data.about)
        console.log(response.data.about.imageUrl)
      })
      .catch(err => {
        setError('Failed to load about information')
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="About">
      <h1>About Us</h1>
      
      {loading && (
        <div className="loading">
          <p>Loading about information...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {aboutData && (
        <div className="about-content">
          <div className="about-header">
            <img 
              src={aboutData.imageUrl} 
              alt={aboutData.name}
              className="profile-image"
            />
            <div className="about-intro">
              <h2>{aboutData.name}</h2>
              <p className="bio">{aboutData.bio}</p>
            </div>
          </div>

          <div className="about-sections">
            <section className="education-section">
              <h3>Education</h3>
              <p>{aboutData.education}</p>
            </section>

            <section className="interests-section">
              <h3>Interests</h3>
              <p>{aboutData.interests}</p>
            </section>

            <section className="skills-section">
              <h3>Technical Skills</h3>
              <div className="skills-list">
                {aboutData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="contact-section">
              <h3>Contact Information</h3>
              <div className="contact-links">
                <p>
                  <strong>Email:</strong> 
                  <a href={`mailto:${aboutData.contact.email}`}>
                    {aboutData.contact.email}
                  </a>
                </p>
                <p>
                  <strong>GitHub:</strong> 
                  <a href={aboutData.contact.github} target="_blank" rel="noopener noreferrer">
                    {aboutData.contact.github}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
